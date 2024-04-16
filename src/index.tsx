import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

const MAX_WIDTH = 250;
const AUTO_CLOSE_POINT_LEFT = -160;
const AUTO_CLOSE_POINT_RIGHT = 160;
const CLOSED_LEFT_VALUE = -MAX_WIDTH;
const ANIMATION_DURATION = 300;

export default function SlideDrawer(props: SlideDrawerProps) {
  const { isOpen, onClose, children, side = 'left' } = props;

  const isLeft = side === 'left';

  const { width, height } = useWindowDimensions();
  
  const drawerX = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      // conditions to prevent the user from detaching the component from the edge of the screen
      if (event.translationX > 0 && isLeft) return;
      if (event.translationX < 0 && !isLeft) return;
      drawerX.value = event.translationX;
    })
    .onFinalize((event) => {
      if (event.translationX <= AUTO_CLOSE_POINT_LEFT && isLeft) {
        runOnJS(onClose)();
      } else if (event.translationX >= AUTO_CLOSE_POINT_RIGHT && !isLeft) {
        runOnJS(onClose)();
      } else {
        drawerX.value = withTiming(0, { duration: ANIMATION_DURATION });
      }
    });

  useEffect(() => {
    if (isOpen) {
      drawerX.value = 0;
    }
  }, [isOpen]);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: drawerX.value,
      },
    ],
    right: isLeft
      ? undefined
      : isOpen
      ? withTiming(0, { duration: ANIMATION_DURATION })
      : withTiming(CLOSED_LEFT_VALUE, { duration: ANIMATION_DURATION }),
    left: isLeft
      ? isOpen
        ? withTiming(0, { duration: 300 })
        : withTiming(CLOSED_LEFT_VALUE, { duration: ANIMATION_DURATION })
      : undefined,
  }));

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        width: '100%',
        zIndex: 2,
        pointerEvents: isOpen ? undefined : 'none',
        height,
        position: 'absolute',
      }}
    >
      {/* Backdrop */}
      {isOpen ? (
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            width,
            height,
            zIndex: 2,
          }}
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              flex: 1,
              width: '100%',
              zIndex: 2,
              pointerEvents: isOpen ? undefined : 'none',
              height,
              backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
              position: 'absolute',
            }}
          />
        </Pressable>
      ) : null}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, animatedDrawerStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: MAX_WIDTH,
    height,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    zIndex: 2,
    opacity: 1,
    paddingTop: 80,
    gap: 24,
    paddingLeft: 24,
    position: 'absolute',
  },
});
