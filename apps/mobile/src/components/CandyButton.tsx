import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { lightImpact } from '../utils/haptics';
import { fonts } from '../utils/typography';

interface CandyButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  haptic?: boolean;
}

const VARIANT_STYLES: Record<string, { bg: string; text: string; border?: string }> = {
  primary: { bg: '#FF6B9D', text: '#FFFFFF' },
  secondary: { bg: '#FFD700', text: '#2D2D2D' },
  outline: { bg: 'transparent', text: '#FF6B9D', border: '#FF6B9D' },
  ghost: { bg: 'transparent', text: '#888888' },
};

const SIZE_STYLES: Record<string, { py: number; px: number; fontSize: number }> = {
  sm: { py: 8, px: 16, fontSize: 14 },
  md: { py: 12, px: 24, fontSize: 16 },
  lg: { py: 16, px: 32, fontSize: 20 },
};

export default function CandyButton({
  title, onPress, variant = 'primary', size = 'md',
  disabled = false, style, textStyle, haptic = true,
}: CandyButtonProps) {
  const vs = VARIANT_STYLES[variant];
  const ss = SIZE_STYLES[size];

  return (
    <TouchableOpacity
      onPress={() => { if (haptic) lightImpact(); onPress(); }}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: vs.bg,
          paddingVertical: ss.py,
          paddingHorizontal: ss.px,
          borderColor: vs.border || vs.bg,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[
        styles.text,
        { color: vs.text, fontSize: ss.fontSize },
        textStyle,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: fonts.body,
  },
});
