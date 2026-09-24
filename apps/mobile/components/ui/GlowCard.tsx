import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface GlowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlowCard: React.FC<GlowCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.glow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  glow: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: COLORS.dark.surface,
    borderColor: 'rgba(232, 59, 46, 0.45)',
    borderWidth: 1.5,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
});
