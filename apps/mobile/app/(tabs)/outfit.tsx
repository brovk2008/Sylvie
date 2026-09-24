import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import COLORS from '../../constants/colors';
import { useOutfitStore } from '../../stores/outfitStore';
import { fetchWeather } from '../../lib/api';

const OCCASION_CHIPS = [
  'College Tomorrow',
  'First Date 💕',
  'Office Work',
  'Night Out Party',
  'Airport Travel',
  'Weekend Brunch',
];

export default function OutfitGeneratorScreen() {
  const { outfits, activeOutfitIndex, shuffleOutfit } = useOutfitStore();
  const [contextQuery, setContextQuery] = useState('College presentation');
  const [generating, setGenerating] = useState(false);
  const [weather, setWeather] = useState({
    city: 'Delhi NCR',
    temp_c: 28,
    description: 'Sunny & Clear',
    recommended_clo: 0.68,
  });

  useEffect(() => {
    fetchWeather().then((data) => {
      if (data) setWeather(data);
    });
  }, []);

  const currentOutfit = outfits[activeOutfitIndex] || outfits[0];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      shuffleOutfit();
      setGenerating(false);
    }, 600);
  };

  const handleWear = () => {
    Alert.alert('Outfit Selected 🌶️', 'Saved to your wear history! Clothes status updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>MULTIMODAL STYLIST</Text>
        <Text style={styles.title}>What should I wear?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Context Prompt Card */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Where are you headed?</Text>
          <TextInput
            value={contextQuery}
            onChangeText={setContextQuery}
            placeholder="e.g. College lecture, Dinner date, Gym session..."
            placeholderTextColor={COLORS.dark.muted}
            style={styles.queryInput}
          />

          {/* Quick Occasion Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            {OCCASION_CHIPS.map((occ) => (
              <TouchableOpacity
                key={occ}
                onPress={() => setContextQuery(occ)}
                style={[
                  styles.occChip,
                  contextQuery === occ && styles.activeOccChip,
                ]}
              >
                <Text
                  style={[
                    styles.occChipText,
                    contextQuery === occ && styles.activeOccChipText,
                  ]}
                >
                  {occ}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Weather context pill */}
          <View style={styles.weatherStrip}>
            <Text style={styles.weatherIcon}>☀️</Text>
            <Text style={styles.weatherText}>
              {weather.city} · {weather.temp_c}°C ({weather.description}) · CLO Target {weather.recommended_clo}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleGenerate}
            activeOpacity={0.8}
            style={styles.generateButton}
          >
            <Text style={styles.generateButtonText}>
              {generating ? 'Styling with AI...' : '✦ Generate Today’s Outfit'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Outfit Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <div>
              <Text style={styles.resultKicker}>{currentOutfit.occasion}</Text>
              <Text style={styles.resultMatch}>{currentOutfit.matchScore}% Match Score</Text>
            </div>
            <View style={styles.harmonyPill}>
              <Text style={styles.harmonyText}>{currentOutfit.harmonyType}</Text>
            </View>
          </View>

          {/* Garment Stack */}
          <View style={styles.layersWrapper}>
            {currentOutfit.layers.map((layer, idx) => (
              <View key={idx} style={styles.layerRow}>
                <View style={styles.layerLeft}>
                  <View
                    style={[styles.colorDot, { backgroundColor: layer.colorHex }]}
                  />
                  <div>
                    <Text style={styles.layerName}>{layer.name}</Text>
                    <Text style={styles.layerRole}>{layer.role}</Text>
                  </div>
                </View>
                <Text style={styles.layerClo}>{layer.clo} CLO</Text>
              </View>
            ))}
          </View>

          {/* Thermal Insulation Check */}
          <View style={styles.thermalRow}>
            <Text style={styles.thermalLabel}>Total Insulation</Text>
            <Text style={styles.thermalValue}>
              {currentOutfit.totalClo} CLO · Formality {currentOutfit.formalityScore}/10
            </Text>
          </View>

          {/* AI Stylist Notes */}
          <View style={styles.stylistBox}>
            <Text style={styles.stylistKicker}>✦ STYLIST REASONING</Text>
            <Text style={styles.stylistText}>
              &ldquo;{currentOutfit.stylingNotes}&rdquo;
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              onPress={handleWear}
              activeOpacity={0.8}
              style={styles.wearBtn}
            >
              <Text style={styles.wearBtnText}>✦ Wear This</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={shuffleOutfit}
              activeOpacity={0.8}
              style={styles.shuffleBtn}
            >
              <Text style={styles.shuffleBtnText}>↺ Shuffle</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  inputCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  queryInput: {
    backgroundColor: COLORS.dark.bg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  chipsScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  occChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginRight: 8,
  },
  activeOccChip: {
    borderColor: COLORS.chili[500],
    backgroundColor: 'rgba(232, 59, 46, 0.2)',
  },
  occChipText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
  },
  activeOccChipText: {
    color: COLORS.chili[300],
    fontWeight: '700',
  },
  weatherStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.dark.bg,
    marginBottom: 14,
  },
  weatherIcon: {
    fontSize: 16,
  },
  weatherText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.8,
  },
  generateButton: {
    backgroundColor: COLORS.chili[500],
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  resultCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 26,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(232, 59, 46, 0.4)',
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  resultKicker: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  resultMatch: {
    fontSize: 12,
    color: COLORS.spice.gold,
    fontWeight: '800',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  harmonyPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  harmonyText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
  },
  layersWrapper: {
    gap: 8,
    marginBottom: 16,
  },
  layerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    backgroundColor: COLORS.dark.bg,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  layerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  layerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  layerRole: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.6,
  },
  layerClo: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  thermalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
    marginBottom: 14,
  },
  thermalLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  thermalValue: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
  },
  stylistBox: {
    backgroundColor: COLORS.dark.elevated,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 18,
  },
  stylistKicker: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  stylistText: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  wearBtn: {
    flex: 1.4,
    backgroundColor: COLORS.chili[500],
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wearBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  shuffleBtn: {
    flex: 1,
    backgroundColor: COLORS.dark.elevated,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  shuffleBtnText: {
    color: COLORS.spice.parchment,
    fontSize: 14,
    fontWeight: '700',
  },
});
