import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import COLORS from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor={COLORS.dark.muted}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          isFocused ? styles.focusedInput : styles.unfocusedInput,
          error ? styles.errorInput : null,
          style,
        ]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.spice.parchment,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
    borderWidth: 1,
  },
  unfocusedInput: {
    borderColor: COLORS.dark.border,
  },
  focusedInput: {
    borderColor: COLORS.chili[500],
    backgroundColor: COLORS.dark.elevated,
  },
  errorInput: {
    borderColor: COLORS.semantic.error,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.semantic.error,
    marginTop: 4,
  },
});
