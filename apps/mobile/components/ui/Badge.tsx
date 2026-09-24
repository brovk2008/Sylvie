import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface BadgeProps {
  label: string;
  variant?: 'gold' | 'chili' | 'neutral' | 'success';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', style }) => {
  const getBadgeStyle = (): ViewStyle => {
    switch (variant) {
      case 'gold':
        return {
          backgroundColor: 'rgba(201, 168, 38, 0.15)',
          borderColor: 'rgba(201, 168, 38, 0.4)',
        };
      case 'chili':
        return {
          backgroundColor: 'rgba(232, 59, 46, 0.15)',
          borderColor: 'rgba(232, 59, 46, 0.4)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(46, 125, 50, 0.15)',
          borderColor: 'rgba(46, 125, 50, 0.4)',
        };
      case 'neutral':
      default:
        return {
          backgroundColor: COLORS.dark.surface,
          borderColor: COLORS.dark.border,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'gold':
        return { color: COLORS.spice.gold };
      case 'chili':
        return { color: COLORS.chili[400] };
      case 'success':
        return { color: '#4CAF50' };
      case 'neutral':
      default:
        return { color: COLORS.spice.parchment };
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[styles.text, getTextStyle()]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
