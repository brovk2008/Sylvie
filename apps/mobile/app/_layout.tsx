import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.dark.bg} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.dark.bg },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(auth)/index" />
        <Stack.Screen name="(auth)/onboarding/index" />
        <Stack.Screen name="(auth)/onboarding/survey" />
        <Stack.Screen name="(auth)/onboarding/style-picker" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="setup/face-scan" />
        <Stack.Screen name="setup/body-scan" />
        <Stack.Screen name="setup/skin-tone" />
        <Stack.Screen name="setup/measurements" />
        <Stack.Screen name="setup/preferences" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
  },
});
