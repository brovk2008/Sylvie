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

type FaceAngle = 'front' | 'left' | 'right' | 'back';

export default function FaceScanScreen() {
  const router = useRouter();
  const [captured, setCaptured] = useState<Record<FaceAngle, boolean>>({
    front: true, // sample default
    left: false,
    right: false,
    back: false,
  });
  const [activeAngle, setActiveAngle] = useState<FaceAngle>('front');

  const toggleCapture = (angle: FaceAngle) => {
    setActiveAngle(angle);
    setCaptured((prev) => ({ ...prev, [angle]: true }));
  };

  const allDone = Object.values(captured).filter(Boolean).length >= 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Step 1 of 5 · Feature Scan</Text>
        <Text style={styles.heading}>Help Sylvie learn your features</Text>
        <Text style={styles.subheading}>
          Multi-angle photos help Sylvie verify color temperature and neckline harmonies.
        </Text>
      </View>

      {/* Simulated Camera Viewfinder */}
      <View style={styles.cameraFrame}>
        <View style={styles.silhouette}>
          <Text style={styles.ghostIcon}>👤</Text>
          <Text style={styles.cameraPrompt}>
            {activeAngle === 'front' && 'Look straight at camera with neutral expression'}
            {activeAngle === 'left' && 'Turn your head slightly to the left'}
            {activeAngle === 'right' && 'Turn your head slightly to the right'}
            {activeAngle === 'back' && 'Turn around to capture hair length & color'}
          </Text>
        </View>

        {/* Scan lines overlay */}
        <View style={styles.scanLine} />
      </View>

      {/* 4 Angle Compass Selection Buttons */}
      <View style={styles.compassRow}>
        {(['front', 'left', 'right', 'back'] as FaceAngle[]).map((angle) => {
          const isDone = captured[angle];
          const isActive = activeAngle === angle;

          return (
            <TouchableOpacity
              key={angle}
              onPress={() => toggleCapture(angle)}
              activeOpacity={0.8}
              style={[
                styles.compassButton,
                isActive ? styles.activeButton : styles.inactiveButton,
              ]}
            >
              <Text
                style={[
                  styles.compassLabel,
                  isActive ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {angle.toUpperCase()}
              </Text>
              <Text style={styles.compassBadge}>{isDone ? '✓' : '○'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <Button
          title="Continue to Body Proportions →"
          onPress={() => router.push('/setup/body-scan')}
          disabled={!allDone}
          size="lg"
          style={{ width: '100%' }}
        />
        <TouchableOpacity
          onPress={() => router.push('/setup/skin-tone')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>I&apos;ll do this later &rarr;</Text>
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
  cameraFrame: {
    marginHorizontal: 24,
    height: 320,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.chili[700],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  silhouette: {
    alignItems: 'center',
  },
  ghostIcon: {
    fontSize: 90,
    opacity: 0.35,
  },
  cameraPrompt: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 12,
    fontWeight: '500',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: COLORS.chili[500],
    opacity: 0.7,
  },
  compassRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  compassButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  activeButton: {
    backgroundColor: COLORS.dark.elevated,
    borderColor: COLORS.chili[500],
  },
  compassLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  inactiveLabel: {
    color: COLORS.spice.parchment,
  },
  activeLabel: {
    color: '#FFFFFF',
  },
  compassBadge: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.chili[400],
    fontWeight: '800',
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
