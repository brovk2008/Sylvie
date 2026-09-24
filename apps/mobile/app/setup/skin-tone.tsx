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
import { SKIN_TONES_40 } from '@sylvie/fashion-ontology';
import { useUserStore } from '../../stores/userStore';

const UNDERTONES = ['all', 'warm', 'cool', 'neutral', 'olive'] as const;

export default function SkinToneSelector() {
  const router = useRouter();
  const { skinToneCode, updateSkinTone } = useUserStore();
  const [selectedCode, setSelectedCode] = useState(skinToneCode || 'ST19');
  const [undertoneFilter, setUndertoneFilter] = useState<string>('all');

  const selectedTone = SKIN_TONES_40.find((t) => t.code === selectedCode) || SKIN_TONES_40[18];

  const filteredTones = undertoneFilter === 'all'
    ? SKIN_TONES_40
    : SKIN_TONES_40.filter((t) => t.undertone === undertoneFilter);

  const handleSelect = (code: string, undertone: string) => {
    setSelectedCode(code);
    updateSkinTone(code, undertone);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Step 3 of 5 · Color Matrix</Text>
        <Text style={styles.heading}>Select Your Skin Tone</Text>
        <Text style={styles.subheading}>
          40 curated shades across Fitzpatrick scales I–VI. Sylvie uses this to determine high-contrast versus harmonious garment color palettes.
        </Text>

        {/* Undertone Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {UNDERTONES.map((u) => (
            <TouchableOpacity
              key={u}
              onPress={() => setUndertoneFilter(u)}
              style={[
                styles.chip,
                undertoneFilter === u ? styles.activeChip : styles.inactiveChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  undertoneFilter === u ? styles.activeChipText : styles.inactiveChipText,
                ]}
              >
                {u.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Swatches Grid */}
        <View style={styles.swatchGrid}>
          {filteredTones.map((tone) => {
            const isSelected = tone.code === selectedCode;
            return (
              <TouchableOpacity
                key={tone.code}
                onPress={() => handleSelect(tone.code, tone.undertone)}
                activeOpacity={0.7}
                style={[
                  styles.swatchCard,
                  isSelected && styles.selectedSwatchCard,
                ]}
              >
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: tone.hex },
                    isSelected && styles.selectedCircle,
                  ]}
                />
                <Text style={styles.swatchName} numberOfLines={1}>
                  {tone.name}
                </Text>
                <Text style={styles.swatchScale}>
                  Scale {tone.fitzpatrick} · {tone.undertone}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Tone Preview Card */}
        {selectedTone && (
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <View
                style={[styles.previewSwatch, { backgroundColor: selectedTone.hex }]}
              />
              <View>
                <Text style={styles.previewTitle}>{selectedTone.name}</Text>
                <Text style={styles.previewSub}>
                  Undertone: {selectedTone.undertone.toUpperCase()} · Season: {selectedTone.season.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.paletteSection}>
              <Text style={styles.paletteTitle}>Recommended Garment Hues:</Text>
              <View style={styles.paletteRow}>
                {selectedTone.complementary_colors.map((c, i) => (
                  <View
                    key={i}
                    style={[styles.paletteDot, { backgroundColor: c }]}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue to Measurements & BMI →"
          onPress={() => router.push('/setup/measurements')}
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
    paddingBottom: 8,
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
  chipsRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    marginRight: 8,
    borderWidth: 1,
  },
  inactiveChip: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  activeChip: {
    backgroundColor: COLORS.chili[500],
    borderColor: COLORS.chili[500],
  },
  chipText: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  inactiveChipText: {
    color: COLORS.spice.parchment,
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatchCard: {
    width: '23%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  selectedSwatchCard: {
    borderColor: COLORS.chili[500],
    backgroundColor: COLORS.dark.elevated,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: COLORS.chili[500],
    transform: [{ scale: 1.15 }],
  },
  swatchName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  swatchScale: {
    fontSize: 8,
    fontFamily: 'monospace',
    color: COLORS.dark.muted,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  previewCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1.5,
    borderColor: COLORS.chili[800],
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewSwatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  previewSub: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    marginTop: 2,
  },
  paletteSection: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
  paletteTitle: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    marginBottom: 8,
    fontWeight: '600',
  },
  paletteRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paletteDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
});
