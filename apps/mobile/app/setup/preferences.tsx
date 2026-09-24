import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { Button } from '../../components/ui/Button';
import { OCCASIONS_LIST } from '@sylvie/fashion-ontology';
import { useUserStore } from '../../stores/userStore';

const COLOR_PALETTE = [
  '#000000', '#1C0A08', '#FFFFFF', '#FAF0E6', '#1A365D',
  '#E83B2E', '#2E7D32', '#D35400', '#C9A826', '#8E44AD',
  '#7F8C8D', '#D5B288', '#8B4513', '#5D6D7E', '#FF6B47',
];

export default function PreferencesScreen() {
  const router = useRouter();
  const {
    preferredOccasions,
    favoriteColors,
    avoidedColors,
    formalityLevel,
    updatePreferences,
  } = useUserStore();

  const [occasions, setOccasions] = useState<string[]>(preferredOccasions || ['College', 'Weekend Casual']);
  const [favorites, setFavorites] = useState<string[]>(favoriteColors || ['#1C0A08', '#E83B2E', '#1A365D']);
  const [avoided, setAvoided] = useState<string[]>(avoidedColors || []);
  const [formality, setFormality] = useState<number>(formalityLevel || 4.5);

  const toggleOccasion = (occ: string) => {
    setOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const toggleColor = (c: string, type: 'fav' | 'avoid') => {
    if (type === 'fav') {
      setFavorites((prev) =>
        prev.includes(c) ? prev.filter((col) => col !== c) : [...prev, c]
      );
    } else {
      setAvoided((prev) =>
        prev.includes(c) ? prev.filter((col) => col !== c) : [...prev, c]
      );
    }
  };

  const handleFinish = () => {
    updatePreferences(occasions, favorites, avoided, formality);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Step 5 of 5 · Personal Calibration</Text>
        <Text style={styles.heading}>Style & Occasion Vibe</Text>
        <Text style={styles.subheading}>
          Fine-tune what events you dress for and which colors you love or avoid.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Occasions */}
        <Text style={styles.sectionTitle}>Occasions You Dress For</Text>
        <View style={styles.chipsWrap}>
          {OCCASIONS_LIST.map((occ) => {
            const isSelected = occasions.includes(occ);
            return (
              <TouchableOpacity
                key={occ}
                onPress={() => toggleOccasion(occ)}
                activeOpacity={0.8}
                style={[
                  styles.chip,
                  isSelected ? styles.selectedChip : styles.unselectedChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? styles.selectedChipText : styles.unselectedChipText,
                  ]}
                >
                  {occ}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Favorite Colors */}
        <Text style={styles.sectionTitle}>Favorite Colors (Accent Boosters)</Text>
        <View style={styles.colorsGrid}>
          {COLOR_PALETTE.map((c) => {
            const isFav = favorites.includes(c);
            return (
              <TouchableOpacity
                key={`fav-${c}`}
                onPress={() => toggleColor(c, 'fav')}
                activeOpacity={0.8}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: c },
                  isFav && styles.activeFavSwatch,
                ]}
              >
                {isFav && <Text style={styles.swatchCheck}>❤️</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Avoided Colors */}
        <Text style={styles.sectionTitle}>Colors You Avoid</Text>
        <View style={styles.colorsGrid}>
          {COLOR_PALETTE.map((c) => {
            const isAvoid = avoided.includes(c);
            return (
              <TouchableOpacity
                key={`avoid-${c}`}
                onPress={() => toggleColor(c, 'avoid')}
                activeOpacity={0.8}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: c },
                  isAvoid && styles.activeAvoidSwatch,
                ]}
              >
                {isAvoid && <Text style={styles.swatchCheck}>✕</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Formality Level Slider / Stepper */}
        <Text style={styles.sectionTitle}>Daily Dressiness Vibe</Text>
        <View style={styles.formalityCard}>
          <View style={styles.formalityLabels}>
            <Text style={styles.formalityLabel}>Sweatpants Gang</Text>
            <Text style={styles.formalityScoreBadge}>{formality}/10</Text>
            <Text style={styles.formalityLabel}>Runway Sharp</Text>
          </View>
          <View style={styles.stepperRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setFormality(num)}
                style={[
                  styles.stepPill,
                  num <= formality ? styles.activeStepPill : styles.inactiveStepPill,
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Take Me to My Almirah 🌶️"
          onPress={handleFinish}
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  kicker: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  subheading: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    opacity: 0.8,
    marginTop: 4,
    lineHeight: 18,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 18,
    marginBottom: 10,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  unselectedChip: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  selectedChip: {
    backgroundColor: COLORS.chili[500],
    borderColor: COLORS.chili[500],
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  unselectedChipText: {
    color: COLORS.spice.parchment,
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorSwatch: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFavSwatch: {
    borderColor: COLORS.chili[500],
    borderWidth: 3,
    transform: [{ scale: 1.12 }],
  },
  activeAvoidSwatch: {
    borderColor: COLORS.semantic.error,
    borderWidth: 3,
    transform: [{ scale: 1.12 }],
  },
  swatchCheck: {
    fontSize: 14,
  },
  formalityCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginTop: 4,
  },
  formalityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  formalityLabel: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  formalityScoreBadge: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.chili[400],
    fontFamily: 'monospace',
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
  },
  stepPill: {
    flex: 1,
    height: 10,
    borderRadius: 5,
  },
  activeStepPill: {
    backgroundColor: COLORS.chili[500],
  },
  inactiveStepPill: {
    backgroundColor: COLORS.dark.elevated,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
});
