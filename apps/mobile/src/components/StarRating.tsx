import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../utils/typography';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
  animate?: boolean;
}

export default function StarRating({
  stars, maxStars = 3, size = 24, showValue = false,
}: StarRatingProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Text key={i} style={[styles.star, { fontSize: size }]}>
          {i < stars ? '★' : '☆'}
        </Text>
      ))}
      {showValue && (
        <Text style={[styles.value, { fontSize: size * 0.6 }]}>
          {stars}/{maxStars}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    color: '#FFD700',
  },
  value: {
    color: '#888888',
    marginLeft: 6,
    fontWeight: '600',
    fontFamily: fonts.body,
  },
});
