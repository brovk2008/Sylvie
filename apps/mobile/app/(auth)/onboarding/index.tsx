import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../../constants/colors';
import { Button } from '../../../components/ui/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    emoji: '📸',
    title: 'Snap your wardrobe',
    subtitle: 'Your clothes, digitized.',
    desc: 'Photograph everything you own. Sylvie segments, tags fabrics, and catalogs colors automatically.',
  },
  {
    emoji: '✨',
    title: 'AI that actually dresses you',
    subtitle: 'Smart outfits. Every day.',
    desc: 'Calibrated to local weather, your skin tone, and your day’s occasions. Zero generic Pinterest looks.',
  },
  {
    emoji: '🌶️',
    title: 'Built around you',
    subtitle: 'Personalized to your soul.',
    desc: 'The more you wear and log, the more Sylvie refines your psychological style vector.',
  },
];

export default function OnboardingCarousel() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLast = currentSlide === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/(auth)/onboarding/survey');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Skip bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/onboarding/survey')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </View>

        <Text style={styles.kicker}>{slide.title}</Text>
        <Text style={styles.title}>{slide.subtitle}</Text>
        <Text style={styles.desc}>{slide.desc}</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        {/* Progress Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* CTA Button */}
        <Button
          title={isLast ? "Let's Go 🌶️" : 'Next →'}
          onPress={handleNext}
          size="lg"
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: COLORS.dark.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  emoji: {
    fontSize: 54,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.chili[400],
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  desc: {
    fontSize: 15,
    color: COLORS.spice.parchment,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.85,
  },
  footer: {
    width: '100%',
    paddingBottom: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 28,
    backgroundColor: COLORS.chili[500],
  },
  inactiveDot: {
    width: 8,
    backgroundColor: COLORS.dark.border,
  },
});
