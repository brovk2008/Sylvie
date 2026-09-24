import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../../constants/colors';
import { Button } from '../../../components/ui/Button';
import { useWardrobeStore } from '../../../stores/wardrobeStore';

type GarmentClass = 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory';

const CLASS_OPTIONS: { id: GarmentClass; label: string; icon: string }[] = [
  { id: 'top', label: 'Tops & Shirts', icon: '👕' },
  { id: 'bottom', label: 'Jeans & Trousers', icon: '👖' },
  { id: 'outerwear', label: 'Jackets & Coats', icon: '🧥' },
  { id: 'footwear', label: 'Sneakers & Shoes', icon: '👟' },
  { id: 'accessory', label: 'Accessories & Watches', icon: '⌚' },
];

export default function AddGarmentScreen() {
  const router = useRouter();
  const { addGarment } = useWardrobeStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedClass, setSelectedClass] = useState<GarmentClass>('top');
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [backCaptured, setBackCaptured] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Editable attributes after AI extraction
  const [customName, setCustomName] = useState('');
  const [category, setCategory] = useState('');
  const [colorHex, setColorHex] = useState('#1C0A08');
  const [colorName, setColorName] = useState('Charcoal');
  const [fit, setFit] = useState('regular');
  const [material, setMaterial] = useState('100% Cotton');
  const [price, setPrice] = useState('2400');

  const handleClassSelect = (cls: GarmentClass) => {
    setSelectedClass(cls);
    setCategory(cls === 'bottom' ? 'Straight Denim Jeans' : cls === 'outerwear' ? 'Canvas Jacket' : cls === 'footwear' ? 'Leather Sneakers' : 'Heavyweight Tee');
    setCustomName(cls === 'bottom' ? 'My New Jeans' : cls === 'outerwear' ? 'My New Jacket' : cls === 'footwear' ? 'My New Sneakers' : 'My New Tee');
    setStep(2);
  };

  const handleRunAI = () => {
    setAnalyzing(true);
    setStep(3);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(4);
    }, 1800);
  };

  const handleFinishSave = () => {
    addGarment({
      category: category || 'Custom Garment',
      customName: customName || 'New Piece',
      garmentClass: selectedClass,
      dominantColorHex: colorHex,
      dominantColorName: colorName,
      cloValue: selectedClass === 'outerwear' ? 0.35 : selectedClass === 'bottom' ? 0.25 : selectedClass === 'footwear' ? 0.04 : 0.12,
      formalityScore: 4.5,
      fit,
      material,
      cleanStatus: 'clean',
      purchasePrice: Number(price) || 2000,
      favorite: false,
      photoEmoji: selectedClass === 'bottom' ? '👖' : selectedClass === 'outerwear' ? '🧥' : selectedClass === 'footwear' ? '👟' : selectedClass === 'accessory' ? '⌚' : '👕',
    });
    router.replace('/(tabs)/almirah');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>✕ Close</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Step {step} of 4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* STEP 1: Select Type */}
        {step === 1 && (
          <View>
            <Text style={styles.kicker}>STEP 1</Text>
            <Text style={styles.heading}>What are you adding?</Text>
            <Text style={styles.subheading}>
              Select the clothing category to optimize camera guides and segmentation rules.
            </Text>

            <View style={styles.typeGrid}>
              {CLASS_OPTIONS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleClassSelect(item.id)}
                  activeOpacity={0.8}
                  style={styles.typeCard}
                >
                  <Text style={styles.typeEmoji}>{item.icon}</Text>
                  <Text style={styles.typeTitle}>{item.label}</Text>
                  <Text style={styles.typeArrow}>&rarr;</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 2: Photo Capture */}
        {step === 2 && (
          <View>
            <Text style={styles.kicker}>STEP 2</Text>
            <Text style={styles.heading}>Photograph Your Item</Text>
            <Text style={styles.subheading}>
              Lay flat or hang on a neutral background. Sylvie reads seams, fabric textures, and labels.
            </Text>

            <View style={styles.photosRow}>
              {/* Photo 1 (Front or Left Side) */}
              <TouchableOpacity
                onPress={() => setFrontCaptured(true)}
                activeOpacity={0.8}
                style={[
                  styles.photoBox,
                  frontCaptured && styles.photoBoxCaptured,
                ]}
              >
                <Text style={styles.photoBoxEmoji}>{frontCaptured ? '✓' : '📸'}</Text>
                <Text style={styles.photoBoxLabel}>
                  {frontCaptured
                    ? selectedClass === 'footwear'
                      ? 'Left Side Captured'
                      : 'Front Captured'
                    : selectedClass === 'footwear'
                    ? 'Tap for Left Side'
                    : 'Tap for Front'}
                </Text>
              </TouchableOpacity>

              {/* Photo 2 (Back or Right Side) */}
              <TouchableOpacity
                onPress={() => setBackCaptured(true)}
                activeOpacity={0.8}
                style={[
                  styles.photoBox,
                  backCaptured && styles.photoBoxCaptured,
                ]}
              >
                <Text style={styles.photoBoxEmoji}>{backCaptured ? '✓' : '📸'}</Text>
                <Text style={styles.photoBoxLabel}>
                  {backCaptured
                    ? selectedClass === 'footwear'
                      ? 'Right Side Captured'
                      : 'Back Captured'
                    : selectedClass === 'footwear'
                    ? 'Tap for Right Side'
                    : 'Tap for Back'}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title={frontCaptured ? 'Analyze with Sylvie AI ✦' : 'Capture Front Photo First'}
              onPress={handleRunAI}
              disabled={!frontCaptured}
              size="lg"
              style={{ width: '100%', marginTop: 24 }}
            />
          </View>
        )}

        {/* STEP 3: AI Processing */}
        {step === 3 && (
          <View style={styles.analyzingWrapper}>
            <ActivityIndicator size="large" color={COLORS.chili[500]} />
            <Text style={styles.analyzingHeading}>Sylvie is reading your garment...</Text>
            <View style={styles.stepsList}>
              <Text style={styles.stepDone}>✓ YOLOv8 garment isolation</Text>
              <Text style={styles.stepDone}>✓ HSL color extraction (#1C0A08 Charcoal)</Text>
              <Text style={styles.stepDone}>✓ Fabric classification: Cotton Weave</Text>
              <Text style={styles.stepDone}>⟳ Calibrating ISO 7730 CLO value...</Text>
            </View>
          </View>
        )}

        {/* STEP 4: Review & Confirm */}
        {step === 4 && (
          <View>
            <Text style={styles.kicker}>STEP 4 · AI VERIFICATION &amp; CONFIDENCE</Text>
            <Text style={styles.heading}>Is this correct? 🧠</Text>
            <Text style={styles.subheading}>
              Sylvie extracted these attributes with 96% confidence. You can modify any field to train your personal stylist preferences.
            </Text>

            {/* Observability Hierarchy Card */}
            <View style={styles.observabilityCard}>
              <View style={styles.obsHeader}>
                <Text style={styles.obsKicker}>OBSERVABILITY BREAKDOWN</Text>
                <View style={styles.confidencePill}>
                  <Text style={styles.confidencePillText}>96% Confidence (Auto-Accept)</Text>
                </View>
              </View>

              <View style={styles.obsRow}>
                <Text style={styles.obsLevelBadge}>Level A · Direct</Text>
                <Text style={styles.obsText}>Class: {selectedClass} · Color: {colorHex} ({colorName})</Text>
              </View>

              <View style={styles.obsRow}>
                <Text style={styles.obsLevelBadgeB}>Level B · Inferable</Text>
                <Text style={styles.obsText}>Fit: {fit} · Fabric: {material} · CLO: 0.12</Text>
              </View>

              <View style={styles.obsRow}>
                <Text style={styles.obsLevelBadgeC}>Level C · Context</Text>
                <Text style={styles.obsText}>Aesthetic: Streetwear (0.85), Minimalist (0.60)</Text>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Custom Nickname</Text>
                <TextInput
                  value={customName}
                  onChangeText={setCustomName}
                  style={styles.textInput}
                />
              </View>

              {/* Interactive Fit Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fit (Level B Inferable)</Text>
                <View style={styles.pillRow}>
                  {['oversized', 'regular', 'relaxed', 'boxy'].map((f) => (
                    <TouchableOpacity
                      key={f}
                      onPress={() => setFit(f)}
                      style={[styles.pillBtn, fit === f && styles.pillBtnActive]}
                    >
                      <Text style={[styles.pillBtnText, fit === f && styles.pillBtnTextActive]}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Interactive Material Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Material (Level B Inferable)</Text>
                <View style={styles.pillRow}>
                  {['100% Cotton', 'Denim Twill', 'Linen Blend', 'Polyester'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      onPress={() => setMaterial(m)}
                      style={[styles.pillBtn, material === m && styles.pillBtnActive]}
                    >
                      <Text style={[styles.pillBtnText, material === m && styles.pillBtnTextActive]}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Purchase Price (₹) for Cost-Per-Wear</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  style={styles.textInput}
                />
              </View>
            </View>

            <Button
              title="Confirm &amp; Add to My Almirah 🌶️"
              onPress={handleFinishSave}
              size="lg"
              style={{ width: '100%', marginTop: 20 }}
            />
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  closeButton: {
    padding: 6,
  },
  closeText: {
    color: COLORS.spice.parchment,
    fontSize: 14,
    fontWeight: '700',
  },
  stepIndicator: {
    color: COLORS.chili[400],
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '800',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  kicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    letterSpacing: 1.5,
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
    marginBottom: 24,
  },
  typeGrid: {
    gap: 12,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  typeEmoji: {
    fontSize: 28,
    marginRight: 14,
  },
  typeTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  typeArrow: {
    fontSize: 18,
    color: COLORS.chili[400],
  },
  photosRow: {
    flexDirection: 'row',
    gap: 14,
  },
  photoBox: {
    flex: 1,
    height: 180,
    borderRadius: 20,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 2,
    borderColor: COLORS.dark.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBoxCaptured: {
    borderColor: COLORS.chili[500],
    backgroundColor: COLORS.dark.elevated,
    borderStyle: 'solid',
  },
  photoBoxEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  photoBoxLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.spice.parchment,
  },
  analyzingWrapper: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  analyzingHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
  },
  stepsList: {
    gap: 10,
    alignItems: 'flex-start',
  },
  stepDone: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
  },
  formContainer: {
    gap: 14,
  },
  inputGroup: {},
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.spice.parchment,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
  },
  observabilityCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  obsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  obsKicker: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
    letterSpacing: 1,
  },
  confidencePill: {
    backgroundColor: 'rgba(46, 125, 50, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.semantic.success,
  },
  confidencePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#81C784',
  },
  obsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  obsLevelBadge: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: '#64B5F6',
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  obsLevelBadgeB: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: '#BA68C8',
    backgroundColor: 'rgba(186, 104, 200, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  obsLevelBadgeC: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: '#FFB74D',
    backgroundColor: 'rgba(255, 183, 77, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  obsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  pillBtnActive: {
    backgroundColor: COLORS.chili[600],
    borderColor: COLORS.chili[400],
  },
  pillBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark.muted,
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
