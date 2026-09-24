import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.chili[500],
        tabBarInactiveTintColor: COLORS.dark.muted,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, focused && styles.activeIcon]}>🏠</Text>
              {focused && <View style={styles.activePill} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="almirah/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, focused && styles.activeIcon]}>👔</Text>
              {focused && <View style={styles.activePill} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="outfit"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, focused && styles.activeIcon]}>✨</Text>
              {focused && <View style={styles.activePill} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, focused && styles.activeIcon]}>👤</Text>
              {focused && <View style={styles.activePill} />}
            </View>
          ),
        }}
      />
      {/* Hidden sub-routes inside tabs */}
      <Tabs.Screen
        name="almirah/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="almirah/add"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.dark.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    opacity: 0.65,
  },
  activeIcon: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  activePill: {
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.chili[500],
    marginTop: 4,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
