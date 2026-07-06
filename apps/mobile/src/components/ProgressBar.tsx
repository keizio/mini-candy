import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../utils/typography';

interface ProgressBarProps {
  progress: number;
  maxProgress: number;
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({
  progress, maxProgress, color = '#FF6B9D', backgroundColor = '#FFE8D0',
  height = 8, showLabel = false, label,
}: ProgressBarProps) {
  const pct = Math.min(progress / maxProgress, 1);

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={styles.label}>
          {label || `${Math.round(pct * 100)}%`}
        </Text>
      )}
      <View style={[styles.bar, { backgroundColor, height, borderRadius: height / 2 }]}>
        <View style={[
          styles.fill,
          {
            width: `${pct * 100}%`,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  label: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: fonts.body,
  },
  bar: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
