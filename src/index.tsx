import React from 'react';
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

const maxWidth = 250;
const autoClosePointLeft = -160;
const autoClosePointRight = 160;
const closedLeftValue = -maxWidth;

export default function SlideDrawer(props: SlideDrawerProps) {
  const { isOpen, onClose, children, side = 'left' } = props;

  const isLeft = side === 'left';

  const { width } = useWindowDimensions();
  const drawerX = useSharedValue<number>(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      // conditions to prevent the user from detaching the component from the edge of the screen
      if (event.translationX > 0 && isLeft) return;
      if (event.translationX < 0 && !isLeft) return;
      drawerX.value = event.translationX;
    })
    .onFinalize((event) => {
      if (event.translationX <= autoClosePointLeft && isLeft) {
        runOnJS(onClose)();
        drawerX.value = withTiming(0, { duration: 400 });
      } else if (event.translationX >= autoClosePointRight && !isLeft) {
        runOnJS(onClose)();
        drawerX.value = withTiming(0, { duration: 400 });
      } else {
        drawerX.value = withTiming(0, { duration: 400 });
      }
    });

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: drawerX.value,
      },
    ],
    right: isLeft
      ? undefined
      : isOpen
      ? withTiming(0, { duration: 400 })
      : withTiming(closedLeftValue, { duration: 400 }),
    left: isLeft
      ? isOpen
        ? withTiming(0, { duration: 400 })
        : withTiming(closedLeftValue, { duration: 400 })
      : undefined,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
      <TouchableWithoutFeedback
        onPress={onClose}
        style={{ flex: 1, width, zIndex: 2 }}
      >
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            flex: 1,
            width,
            height,
            backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            position: 'absolute',
            zIndex: 2,
          }}
        >
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.container, animatedDrawerStyle]}>
              {children}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: maxWidth,
    height,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    zIndex: 2,
    opacity: 1,
    paddingTop: 80,
    gap: 24,
    paddingLeft: 24,
  },
});
