import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { fonts } from '../utils/typography';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(1)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, damping: 12, stiffness: 100, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(subtitleOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(bgOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
        <Text style={styles.emoji}>🍬</Text>
        <Text style={styles.title}>Mini Candy</Text>
      </Animated.View>
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        Match-3 Puzzle
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  logoContainer: { alignItems: 'center' },
  emoji: { fontSize: 80, marginBottom: 12 },
  title: { fontSize: 42, fontWeight: '900', color: '#FF6B9D', letterSpacing: -1, fontFamily: fonts.heading },
  subtitle: { fontSize: 18, color: '#B0A090', marginTop: 8, fontWeight: '600', fontFamily: fonts.body },
});
