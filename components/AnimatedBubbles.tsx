import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const BUBBLE_COUNT = 8;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function AnimatedBubbles() {
  const animations = useRef(
    Array.from({ length: BUBBLE_COUNT }).map(() => new Animated.Value(0))
  ).current;

  // ✅ store fixed bubble properties so they don’t reset on render
  const bubbleProps = useRef(
    Array.from({ length: BUBBLE_COUNT }).map(() => {
      const size = getRandom(100, 250);
      const startX = getRandom(0, width - size);
      const startY = getRandom(-size, height);
      return { size, startX, startY };
    })
  ).current;

  useEffect(() => {
    animations.forEach((anim, index) => {
      const duration = getRandom(8000, 15000);

      const animate = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => animate());
      };

      animate();
    });
  }, [animations]);

  return (
    <>
      {animations.map((anim, index) => {
        const { size, startX, startY } = bubbleProps[index];

        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [startY + size * 2, startY - size * 2],
        });

        const translateX = anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [startX, startX + 20, startX],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                transform: [{ translateY }, { translateX }],
              },
            ]}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    backgroundColor: '#CA5310',
    opacity: 0.15,
  },
});
