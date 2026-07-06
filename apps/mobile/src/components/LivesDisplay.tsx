import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../utils/typography';

interface LivesDisplayProps {
  lives: number;
  maxLives: number;
  size?: 'sm' | 'md';
  showTimer?: boolean;
  nextRefillTime?: number;
}

export default function LivesDisplay({
  lives, maxLives, size = 'md', showTimer = false,
}: LivesDisplayProps) {
  const isFull = lives >= maxLives;
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <View style={styles.container}>
      <View style={styles.hearts}>
        {Array.from({ length: maxLives }, (_, i) => (
          <Text key={i} style={[styles.heart, { fontSize: iconSize }]}>
            {i < lives ? '❤️' : '🤍'}
          </Text>
        ))}
      </View>
      <Text style={[styles.count, { fontSize: size === 'sm' ? 12 : 14 }]}>
        {lives}/{maxLives}
      </Text>
      {showTimer && !isFull && (
        <Text style={[styles.timer, { fontSize: size === 'sm' ? 10 : 12 }]}>
          Refills in: --:--
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hearts: {
    flexDirection: 'row',
  },
  heart: {
    marginHorizontal: -1,
  },
  count: {
    color: '#888888',
    fontWeight: '600',
    fontFamily: fonts.body,
  },
  timer: {
    color: '#FF6B9D',
    fontWeight: '500',
    fontFamily: fonts.body,
  },
});
