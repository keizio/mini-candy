import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { fonts } from '../utils/typography';

interface BadgeProps {
  text: string;
  variant?: 'premium' | 'sale' | 'new' | 'free';
  style?: ViewStyle;
}

const VARIANTS: Record<string, { bg: string; text: string }> = {
  premium: { bg: '#9B59B6', text: '#FFFFFF' },
  sale: { bg: '#FF4444', text: '#FFFFFF' },
  new: { bg: '#44CC44', text: '#FFFFFF' },
  free: { bg: '#FFD700', text: '#2D2D2D' },
};

export default function Badge({ text, variant = 'new', style }: BadgeProps) {
  const v = VARIANTS[variant];

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]}>
      <Text style={[styles.text, { color: v.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: fonts.body,
  },
});
