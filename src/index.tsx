import React from 'react';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SlideDrawer(props: SlideDrawerProps) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose} style={{ flex: 1, width }}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          flex: 1,
          width,
          height,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
          zIndex: 2,
        }}
      >
        <Animated.View
          entering={SlideInRight.duration(600)}
          exiting={SlideOutRight.duration(600)}
          style={styles.container}
          onStartShouldSetResponder={(_) => true}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 250,
    height,
    backgroundColor: 'black',
    alignItems: 'flex-start',
    position: 'absolute',
    right: 0,
    zIndex: 2,
    opacity: 1,
    paddingTop: 80,
    gap: 24,
    paddingLeft: 24,
  },
});
