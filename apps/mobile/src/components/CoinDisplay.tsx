import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts } from '../utils/typography';

interface CoinDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const SIZE_MAP = {
  sm: { icon: 16, text: 14 },
  md: { icon: 20, text: 16 },
  lg: { icon: 28, text: 22 },
};

export default function CoinDisplay({ amount, size = 'md', showIcon = true }: CoinDisplayProps) {
  const dims = SIZE_MAP[size];

  return (
    <View style={styles.container}>
      {showIcon && (
        <Text style={[styles.icon, { fontSize: dims.icon }]}>🪙</Text>
      )}
      <Text style={[styles.amount, { fontSize: dims.text }]}>
        {amount.toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    textAlign: 'center',
  },
  amount: {
    fontWeight: '700',
    color: '#2D2D2D',
    fontFamily: fonts.body,
  },
});
