import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  count?: number;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  count,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={[
            styles.count,
            selected ? styles.selectedCount : styles.unselectedCount,
          ]}
        >
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  unselectedChip: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  selectedChip: {
    backgroundColor: COLORS.chili[500],
    borderColor: COLORS.chili[500],
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  unselectedText: {
    color: COLORS.spice.parchment,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  count: {
    fontSize: 11,
    marginLeft: 6,
    fontWeight: '700',
  },
  unselectedCount: {
    color: COLORS.dark.muted,
  },
  selectedCount: {
    color: 'rgba(255,255,255,0.85)',
  },
});
