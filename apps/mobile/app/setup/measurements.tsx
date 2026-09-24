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
import { BODY_TYPES } from '@sylvie/fashion-ontology';
import { useUserStore } from '../../stores/userStore';

export default function MeasurementsScreen() {
  const router = useRouter();
  const { heightCm, weightKg, bodyType, updateMeasurements } = useUserStore();

  const [height, setHeight] = useState(heightCm || 178);
  const [weight, setWeight] = useState(weightKg || 72);
  const [selectedBodyType, setSelectedBodyType] = useState(bodyType || 'mesomorph');

  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1));

  const handleSave = () => {
    updateMeasurements(height, weight, selectedBodyType);
    router.push('/setup/preferences');
  };

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: COLORS.spice.gold };
    if (val < 25) return { label: 'Normal Weight · Ideal', color: '#4CAF50' };
    if (val < 30) return { label: 'Athletic / Overweight', color: COLORS.spice.paprika };
    return { label: 'Full Frame', color: COLORS.chili[400] };
  };

  const bmiCat = getBmiCategory(bmi);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Step 4 of 5 · Body Dimensions</Text>
        <Text style={styles.heading}>Measurements & Silhouette</Text>
        <Text style={styles.subheading}>
          Sylvie calculates your BMI and silhouette ratio to suggest correct drape lines and hemlines.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Height and Weight Steppers */}
        <View style={styles.stepperRow}>
          {/* Height card */}
          <View style={styles.stepperCard}>
            <Text style={styles.stepperLabel}>HEIGHT</Text>
            <Text style={styles.stepperValue}>
              {height} <Text style={styles.unit}>cm</Text>
            </Text>
            <View style={styles.buttonsGroup}>
              <TouchableOpacity
                onPress={() => setHeight((h) => Math.max(140, h - 1))}
                style={styles.circleBtn}
              >
                <Text style={styles.btnSymbol}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHeight((h) => Math.min(220, h + 1))}
                style={styles.circleBtn}
              >
                <Text style={styles.btnSymbol}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Weight card */}
          <View style={styles.stepperCard}>
            <Text style={styles.stepperLabel}>WEIGHT</Text>
            <Text style={styles.stepperValue}>
              {weight} <Text style={styles.unit}>kg</Text>
            </Text>
            <View style={styles.buttonsGroup}>
              <TouchableOpacity
                onPress={() => setWeight((w) => Math.max(40, w - 1))}
                style={styles.circleBtn}
              >
                <Text style={styles.btnSymbol}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setWeight((w) => Math.min(180, w + 1))}
                style={styles.circleBtn}
              >
                <Text style={styles.btnSymbol}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Live BMI Dial Card */}
        <View style={styles.bmiCard}>
          <View style={styles.bmiTop}>
            <View>
              <Text style={styles.bmiTitle}>BODY MASS INDEX</Text>
              <Text style={styles.bmiValue}>{bmi}</Text>
            </View>
            <View style={[styles.bmiBadge, { borderColor: bmiCat.color }]}>
              <Text style={[styles.bmiBadgeText, { color: bmiCat.color }]}>
                {bmiCat.label}
              </Text>
            </View>
          </View>
          <Text style={styles.bmiNote}>
            Used strictly for fabric weight matching (e.g. 240gsm heavyweight vs flowy drape).
          </Text>
        </View>

        {/* Body Type Silhouette Selector */}
        <Text style={styles.sectionTitle}>Body Type Archetype</Text>
        <View style={styles.bodyTypesGrid}>
          {BODY_TYPES.map((bt) => {
            const isSelected = bt.id === selectedBodyType;
            return (
              <TouchableOpacity
                key={bt.id}
                onPress={() => setSelectedBodyType(bt.id)}
                activeOpacity={0.8}
                style={[
                  styles.bodyTypeCard,
                  isSelected ? styles.selectedBodyTypeCard : styles.unselectedBodyTypeCard,
                ]}
              >
                <View style={styles.bodyTypeTop}>
                  <Text style={styles.bodyTypeName}>{bt.name}</Text>
                  {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                </View>
                <Text style={styles.bodyTypeDesc}>{bt.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue to Preferences & Vibe →"
          onPress={handleSave}
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
  stepperRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  stepperCard: {
    flex: 1,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    alignItems: 'center',
  },
  stepperLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  stepperValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.chili[400],
  },
  buttonsGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bmiCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.chili[900],
    marginBottom: 24,
  },
  bmiTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiTitle: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  bmiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1.5,
  },
  bmiBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  bmiNote: {
    fontSize: 11,
    color: COLORS.dark.muted,
    marginTop: 8,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  bodyTypesGrid: {
    gap: 10,
  },
  bodyTypeCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  unselectedBodyTypeCard: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  selectedBodyTypeCard: {
    backgroundColor: COLORS.dark.elevated,
    borderColor: COLORS.chili[500],
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  bodyTypeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bodyTypeName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkIcon: {
    color: COLORS.chili[400],
    fontWeight: '900',
    fontSize: 14,
  },
  bodyTypeDesc: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    opacity: 0.75,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
});
