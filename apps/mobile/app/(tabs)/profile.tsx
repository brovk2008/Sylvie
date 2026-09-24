import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { useUserStore } from '../../stores/userStore';
import { useWardrobeStore } from '../../stores/wardrobeStore';
import { useAuthStore } from '../../stores/authStore';
import { useOnboardingStore } from '../../stores/onboardingStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { displayName, heightCm, weightKg, bmi, skinToneCode, formalityLevel } = useUserStore();
  const { garments } = useWardrobeStore();
  const { selectedStyles } = useOnboardingStore();
  const { logout } = useAuthStore();

  const totalValue = garments.reduce((acc, g) => acc + (g.purchasePrice || 0), 0);
  const totalWears = garments.reduce((acc, g) => acc + g.wearCount, 0);
  const avgCpw = totalWears > 0 ? Math.round(totalValue / totalWears) : 42;
  const unused = garments.filter((g) => g.wearCount < 3).length;

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>PROFILE & PREFERENCES</Text>
        <Text style={styles.title}>Account Overview</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName || 'Vaibhav'}</Text>
            <Text style={styles.userSub}>
              {heightCm}cm · {weightKg}kg · BMI {bmi}
            </Text>
            <View style={styles.stylePillsRow}>
              {selectedStyles.slice(0, 3).map((st) => (
                <View key={st} style={styles.stylePill}>
                  <Text style={styles.stylePillText}>{st.replace('_', ' ')}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Wardrobe Investment Analytics */}
        <Text style={styles.sectionHeading}>Almirah Investment</Text>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>TOTAL VALUE</Text>
              <Text style={styles.statVal}>₹{totalValue.toLocaleString()}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>AVG COST/WEAR</Text>
              <Text style={[styles.statVal, { color: COLORS.spice.gold }]}>
                ₹{avgCpw}
              </Text>
            </View>
          </View>
          <View style={styles.statFooter}>
            <Text style={styles.footerNote}>
              {unused} items worn under 3 times · Sylvie is rotating them into this week&apos;s looks.
            </Text>
          </View>
        </View>

        {/* Color Palette Distribution */}
        <Text style={styles.sectionHeading}>Wardrobe Color Spectrum</Text>
        <View style={styles.spectrumCard}>
          <View style={styles.spectrumBar}>
            <View style={[styles.barSegment, { backgroundColor: '#1C0A08', flex: 35 }]} />
            <View style={[styles.barSegment, { backgroundColor: '#1A365D', flex: 25 }]} />
            <View style={[styles.barSegment, { backgroundColor: '#E83B2E', flex: 20 }]} />
            <View style={[styles.barSegment, { backgroundColor: '#FDF5E6', flex: 20 }]} />
          </View>
          <View style={styles.spectrumLabels}>
            <Text style={styles.specLabel}>Charcoal 35%</Text>
            <Text style={styles.specLabel}>Navy 25%</Text>
            <Text style={styles.specLabel}>Chili 20%</Text>
            <Text style={styles.specLabel}>Cream 20%</Text>
          </View>
        </View>

        {/* Quick Settings & Navigation items */}
        <Text style={styles.sectionHeading}>Configuration & Styling</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => router.push('/setup/skin-tone')}
            activeOpacity={0.8}
            style={styles.menuItem}
          >
            <div>
              <Text style={styles.menuItemTitle}>Skin Tone Matrix</Text>
              <Text style={styles.menuItemSub}>Code: {skinToneCode || 'ST19'}</Text>
            </div>
            <Text style={styles.arrow}>&rarr;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/setup/measurements')}
            activeOpacity={0.8}
            style={styles.menuItem}
          >
            <div>
              <Text style={styles.menuItemTitle}>Body Silhouette</Text>
              <Text style={styles.menuItemSub}>Formality Level: {formalityLevel}/10</Text>
            </div>
            <Text style={styles.arrow}>&rarr;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/onboarding/style-picker')}
            activeOpacity={0.8}
            style={styles.menuItem}
          >
            <div>
              <Text style={styles.menuItemTitle}>Retake Style Game</Text>
              <Text style={styles.menuItemSub}>Reset preferences & discover new genres</Text>
            </div>
            <Text style={styles.arrow}>&rarr;</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  kicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.surface,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1.5,
    borderColor: COLORS.chili[700],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userSub: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    opacity: 0.7,
    marginTop: 2,
    marginBottom: 6,
  },
  stylePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  stylePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  stylePillText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.chili[300],
    textTransform: 'capitalize',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.dark.border,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  statFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    paddingTop: 10,
  },
  footerNote: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.75,
    lineHeight: 16,
  },
  spectrumCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 20,
  },
  spectrumBar: {
    height: 14,
    borderRadius: 7,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barSegment: {},
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specLabel: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  menuContainer: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    overflow: 'hidden',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  menuItemSub: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.6,
    marginTop: 2,
  },
  arrow: {
    fontSize: 16,
    color: COLORS.chili[400],
  },
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 9999,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.semantic.error,
  },
});
