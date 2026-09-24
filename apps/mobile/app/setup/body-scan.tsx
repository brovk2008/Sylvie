import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { Button } from '../../components/ui/Button';

export default function BodyScanScreen() {
  const router = useRouter();
  const [captured, setCaptured] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Step 2 of 5 · Proportions</Text>
        <Text style={styles.heading}>Full-Body Proportions</Text>
        <Text style={styles.subheading}>
          Stand ~1.5 meters away with arms slightly relaxed. Sylvie measures shoulder-to-waist ratios to suggest optimal jacket lengths and pant cuts.
        </Text>
      </View>

      {/* Silhouette Frame */}
      <View style={styles.frame}>
        <View style={styles.ghostWrapper}>
          <Text style={styles.ghostIcon}>🧍</Text>
          <Text style={styles.guideText}>
            {captured
              ? 'Proportions Analyzed ✓ · Athletic / V-Taper Identified'
              : 'Align your silhouette inside the guide box'}
          </Text>
        </View>

        {!captured ? (
          <TouchableOpacity
            onPress={() => setCaptured(true)}
            activeOpacity={0.8}
            style={styles.captureButton}
          >
            <View style={styles.innerCaptureCircle} />
          </TouchableOpacity>
        ) : (
          <View style={styles.retakeRow}>
            <TouchableOpacity
              onPress={() => setCaptured(false)}
              style={styles.retakeButton}
            >
              <Text style={styles.retakeText}>↺ Retake</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue to Skin Tone (40 Swatches) →"
          onPress={() => router.push('/setup/skin-tone')}
          size="lg"
          style={{ width: '100%' }}
        />
        <TouchableOpacity
          onPress={() => router.push('/setup/skin-tone')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip proportion scan &rarr;</Text>
        </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
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
  frame: {
    marginHorizontal: 24,
    height: 380,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.chili[700],
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    position: 'relative',
  },
  ghostWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  ghostIcon: {
    fontSize: 120,
    opacity: 0.4,
  },
  guideText: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },
  captureButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  innerCaptureCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.chili[500],
  },
  retakeRow: {
    flexDirection: 'row',
  },
  retakeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  retakeText: {
    color: COLORS.spice.parchment,
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    paddingTop: 12,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 12,
    padding: 6,
  },
  skipText: {
    color: COLORS.dark.muted,
    fontSize: 13,
  },
});
