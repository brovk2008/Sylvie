import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'surface' | 'elevated';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'surface' }) => {
  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' ? styles.elevated : styles.surface,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  surface: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  elevated: {
    backgroundColor: COLORS.dark.elevated,
    borderColor: COLORS.dark.border,
    shadowColor: COLORS.spice.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
});
