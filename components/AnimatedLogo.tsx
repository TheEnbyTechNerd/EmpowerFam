import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function AnimatedLogo() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.Image
      source={require('../assets/images/icon.png')}
      style={[styles.logo, { opacity, transform: [{ scale }] }]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: 'contain',
  },
});
