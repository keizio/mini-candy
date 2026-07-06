import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { fonts } from '../utils/typography';

interface CandyCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: string;
  style?: ViewStyle;
  padding?: number;
}

export default function CandyCard({
  title, subtitle, children, color = '#FFFFFF', style, padding = 16,
}: CandyCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color, padding }, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 4,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 12,
    fontFamily: fonts.body,
  },
});
