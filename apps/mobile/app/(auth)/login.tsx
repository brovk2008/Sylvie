import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleGoogleSignIn = () => {
    login('Vaibhav', 'vaibhav@example.com');
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Brand Banner */}
      <View style={styles.topSection}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.brandTitle}>SYLVIE</Text>
        <Text style={styles.brandTagline}>Your wardrobe. Your rules.</Text>
      </View>

      {/* Bottom Auth Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.cardHeading}>Welcome to Sylvie</Text>
        <Text style={styles.cardSub}>
          Sign in to access your digital almirah, weather-aware outfit solver, and personalized fashion vector.
        </Text>

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
          style={styles.googleButton}
        >
          <Text style={styles.googleIcon}>🌐</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <Button
          title="Guest Demo Experience →"
          variant="secondary"
          onPress={handleGoogleSignIn}
          style={{ width: '100%', marginTop: 12 }}
        />

        <Text style={styles.termsNote}>
          By continuing, you agree to Sylvie&apos;s Terms of Service and Privacy Policy. All wardrobe photos remain strictly private.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 48,
  },
  logoWrapper: {
    width: 180,
    height: 70,
    marginBottom: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  brandTagline: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    fontStyle: 'italic',
    marginTop: 4,
  },
  bottomCard: {
    backgroundColor: COLORS.dark.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
  cardHeading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardSub: {
    fontSize: 14,
    color: COLORS.spice.parchment,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C0A08',
  },
  termsNote: {
    fontSize: 11,
    color: COLORS.dark.muted,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});
