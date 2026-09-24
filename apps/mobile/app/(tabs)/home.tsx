import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { useUserStore } from '../../stores/userStore';
import { useWardrobeStore } from '../../stores/wardrobeStore';
import { useOutfitStore } from '../../stores/outfitStore';
import { fetchWeather } from '../../lib/api';

const GOING_HERE_OPTIONS = [
  { id: 'college', label: 'College Presentation 🎓', occasion: 'College Presentation', notes: 'Structured & authoritative.' },
  { id: 'date', label: 'Date ❤️', occasion: 'First Date 💕', notes: 'Effortlessly polished & tactile.' },
  { id: 'hackathon', label: 'Hackathon ⚡', occasion: 'Hackathon Sprint', notes: 'Maximum mobility & breathability.' },
  { id: 'party', label: 'Party Tonight 🌙', occasion: 'Night Out', notes: 'Statement contrast & bold silhouette.' },
  { id: 'confident', label: 'Know What I\'m Doing 🕶️', occasion: 'High-Impact Focus', notes: 'Sharp monochrome with confident lines.' },
  { id: 'casual', label: 'Casual ☕', occasion: 'Weekend Hangout', notes: 'Relaxed cotton essentials.' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { displayName, profileCompletionPct, skinToneCode } = useUserStore();
  const { garments, markWorn } = useWardrobeStore();
  const { outfits, activeOutfitIndex, shuffleOutfit } = useOutfitStore();

  const [selectedGoingHere, setSelectedGoingHere] = useState('college');
  const [tryOnVisible, setTryOnVisible] = useState(false);
  const [whooshNotice, setWhooshNotice] = useState<string | null>(null);

  const [weather, setWeather] = useState({
    temp_c: 28,
    description: 'Sunny & Warm',
    city: 'Delhi NCR',
    recommended_clo: 0.68,
  });

  useEffect(() => {
    fetchWeather().then((data) => {
      if (data) setWeather(data);
    });
  }, []);

  const currentOutfit = outfits[activeOutfitIndex] || outfits[0];

  const handleWearThis = () => {
    Alert.alert('Logged Outfit 🌶️', 'Outfit marked as worn today! Your wardrobe wear count has been updated.');
  };

  const handleShuffle = () => {
    shuffleOutfit();
    setWhooshNotice('WHOOSH! ⚡ New outfit synthesized from wardrobe graph.');
    setTimeout(() => setWhooshNotice(null), 2500);
  };

  const handleSelectGoingHere = (opt: typeof GOING_HERE_OPTIONS[0]) => {
    setSelectedGoingHere(opt.id);
    shuffleOutfit();
    setWhooshNotice(`WHOOSH! ⚡ Recalibrated fit for ${opt.label}`);
    setTimeout(() => setWhooshNotice(null), 2500);
  };

  // Calculations for stats
  const totalValue = garments.reduce((acc, g) => acc + (g.purchasePrice || 0), 0);
  const totalWears = garments.reduce((acc, g) => acc + g.wearCount, 0);
  const avgCostPerWear = totalWears > 0 ? Math.round(totalValue / totalWears) : 45;
  const unusedCount = garments.filter((g) => g.wearCount < 3).length;

  const topsCount = garments.filter((g) => g.garmentClass === 'top').length || 4;
  const bottomsCount = garments.filter((g) => g.garmentClass === 'bottom').length || 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.dateLabel}>Tuesday, Sep 24</Text>
          <Text style={styles.greeting}>Hey {displayName || 'Vaibhav'} 🌶️</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/profile')}
          style={styles.avatarButton}
        >
          <Text style={styles.avatarEmoji}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Completion Incentive Banner (if < 100%) */}
        {profileCompletionPct < 100 && (
          <TouchableOpacity
            onPress={() => router.push('/setup/skin-tone')}
            activeOpacity={0.8}
            style={styles.completionBanner}
          >
            <View style={styles.completionLeft}>
              <Text style={styles.completionTitle}>Complete Your Profile</Text>
              <Text style={styles.completionSubtitle}>
                Add your 40-swatch skin tone to optimize color harmony
              </Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${profileCompletionPct}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.completionPct}>{profileCompletionPct}%</Text>
          </TouchableOpacity>
        )}

        {/* "I'M GOING HERE" QUICK INTENT ENGINE */}
        <View style={styles.goingHereSection}>
          <Text style={styles.goingHereKicker}>🎯 I&apos;M GOING HERE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
            {GOING_HERE_OPTIONS.map((opt) => {
              const active = selectedGoingHere === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => handleSelectGoingHere(opt)}
                  activeOpacity={0.8}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* WHOOSH SnackBar Notification */}
        {whooshNotice && (
          <View style={styles.whooshBanner}>
            <Text style={styles.whooshText}>{whooshNotice}</Text>
          </View>
        )}

        {/* TODAY'S FIT HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardHeader}>
            <View>
              <Text style={styles.heroKicker}>TODAY&apos;S FIT</Text>
              <Text style={styles.heroTitle}>{currentOutfit.occasion}</Text>
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{currentOutfit.matchScore}% Match</Text>
            </View>
          </View>

          {/* Weather & CLO meta */}
          <View style={styles.weatherTagRow}>
            <Text style={styles.weatherTag}>
              ☀️ {weather.temp_c}°C · {weather.city}
            </Text>
            <Text style={styles.cloTag}>
              🌡️ {currentOutfit.totalClo} CLO ({currentOutfit.harmonyType})
            </Text>
          </View>

          {/* Wardrobe Graph Synergy Badges */}
          <View style={styles.graphPillRow}>
            <View style={styles.graphPill}>
              <Text style={styles.graphPillLabel}>COLOR HARMONY</Text>
              <Text style={styles.graphPillVal}>94% (60-30-10)</Text>
            </View>
            <View style={styles.graphPill}>
              <Text style={styles.graphPillLabel}>ROTATION</Text>
              <Text style={styles.graphPillVal}>+18d Unworn</Text>
            </View>
            <View style={styles.graphPill}>
              <Text style={styles.graphPillLabel}>LAUNDRY</Text>
              <Text style={styles.graphPillVal}>100% Clean</Text>
            </View>
          </View>

          {/* Garment Layer Stack */}
          <View style={styles.layersContainer}>
            {currentOutfit.layers.map((layer, idx) => (
              <View key={idx} style={styles.layerRow}>
                <View style={styles.layerInfo}>
                  <View
                    style={[styles.colorSwatch, { backgroundColor: layer.colorHex }]}
                  />
                  <View>
                    <Text style={styles.layerName}>{layer.name}</Text>
                    <Text style={styles.layerRole}>{layer.role}</Text>
                  </View>
                </View>
                <Text style={styles.layerClo}>{layer.clo} CLO</Text>
              </View>
            ))}
          </View>

          {/* Stylist Notes */}
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>
              &ldquo;{currentOutfit.stylingNotes}&rdquo;
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.heroActions}>
            <TouchableOpacity
              onPress={handleWearThis}
              activeOpacity={0.8}
              style={styles.wearButton}
            >
              <Text style={styles.wearButtonText}>✦ Wear This</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTryOnVisible(true)}
              activeOpacity={0.8}
              style={styles.tryOnButton}
            >
              <Text style={styles.tryOnButtonText}>✨ Try It On</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShuffle}
              activeOpacity={0.8}
              style={styles.shuffleButton}
            >
              <Text style={styles.shuffleButtonText}>↺ Shuffle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* WARDROBE QUICK PEEK */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Wardrobe</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/almirah')}>
            <Text style={styles.viewAllText}>View All ({garments.length}) &rarr;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
          {garments.slice(0, 6).map((g) => (
            <TouchableOpacity
              key={g.id}
              onPress={() => router.push(`/(tabs)/almirah/${g.id}` as any)}
              activeOpacity={0.8}
              style={styles.miniGarmentCard}
            >
              <View style={styles.miniCardTop}>
                <Text style={styles.miniEmoji}>{g.photoEmoji}</Text>
              </View>
              <Text style={styles.miniName} numberOfLines={1}>
                {g.customName}
              </Text>
              <View style={styles.miniFooter}>
                <View style={[styles.miniDot, { backgroundColor: g.dominantColorHex }]} />
                <Text style={styles.miniWorn}>Worn {g.wearCount}x</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CLOSET INTELLIGENCE & STYLE ANALYTICS */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
          Closet Intelligence &amp; Style Analytics
        </Text>

        {/* Color Palette Spectrum Bar */}
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsHeading}>WARDROBE COLOR SPECTRUM</Text>
          <View style={styles.spectrumBar}>
            <View style={[styles.spectrumSegment, { flex: 32, backgroundColor: '#1C0A08' }]} />
            <View style={[styles.spectrumSegment, { flex: 24, backgroundColor: '#1A365D' }]} />
            <View style={[styles.spectrumSegment, { flex: 18, backgroundColor: '#FDF5E6' }]} />
            <View style={[styles.spectrumSegment, { flex: 14, backgroundColor: '#E83B2E' }]} />
            <View style={[styles.spectrumSegment, { flex: 12, backgroundColor: '#556B2F' }]} />
          </View>
          <View style={styles.spectrumLabels}>
            <Text style={styles.spectrumKey}>Black 32%</Text>
            <Text style={styles.spectrumKey}>Navy 24%</Text>
            <Text style={styles.spectrumKey}>Cream 18%</Text>
            <Text style={styles.spectrumKey}>Chili 14%</Text>
            <Text style={styles.spectrumKey}>Olive 12%</Text>
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>BALANCE</Text>
            <Text style={styles.statValue}>{topsCount}:{bottomsCount}</Text>
            <Text style={styles.statSub}>Tops : Bottoms</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AVG CPW</Text>
            <Text style={styles.statValue}>₹{avgCostPerWear}</Text>
            <Text style={styles.statSub}>Cost per wear</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>UNTOUCHED</Text>
            <Text style={[styles.statValue, { color: COLORS.chili[400] }]}>
              {unusedCount}
            </Text>
            <Text style={styles.statSub}>&gt;14d unworn</Text>
          </View>
        </View>
      </ScrollView>

      {/* VIRTUAL TRY-ON MODAL */}
      <Modal
        visible={tryOnVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTryOnVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.tryOnCard}>
            <View style={styles.tryOnHeader}>
              <View>
                <Text style={styles.tryOnKicker}>AI VIRTUAL TRY-ON</Text>
                <Text style={styles.tryOnTitle}>{currentOutfit.occasion}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setTryOnVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Virtual Simulation Silhouette Preview */}
            <View style={styles.simulationBox}>
              <View style={styles.simAvatar}>
                <Text style={styles.simAvatarEmoji}>🧍</Text>
              </View>
              <View style={styles.simBadge}>
                <Text style={styles.simBadgeText}>94% Color Harmony · {skinToneCode || 'ST19'}</Text>
              </View>
              <Text style={styles.simAdvice}>
                The oversized silhouette creates a relaxed drop-shoulder drape while the straight-fit denim maintains grounded vertical proportion.
              </Text>
            </View>

            {/* Layer Checklist */}
            <View style={styles.tryOnLayers}>
              {currentOutfit.layers.map((l, i) => (
                <View key={i} style={styles.tryOnLayerRow}>
                  <View style={[styles.layerDot, { backgroundColor: l.colorHex }]} />
                  <Text style={styles.tryOnLayerName}>{l.name} ({l.role})</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                setTryOnVisible(false);
                handleWearThis();
              }}
              activeOpacity={0.8}
              style={styles.confirmTryOnBtn}
            >
              <Text style={styles.confirmTryOnText}>Looks Great! Wear This Today 🌶️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
    letterSpacing: -0.3,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1.5,
    borderColor: COLORS.dark.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  completionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.chili[500],
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  completionLeft: {
    flex: 1,
    marginRight: 12,
  },
  completionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completionSubtitle: {
    fontSize: 12,
    color: COLORS.dark.muted,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.dark.elevated,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.chili[500],
  },
  completionPct: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.chili[400],
  },
  goingHereSection: {
    marginBottom: 16,
  },
  goingHereKicker: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: COLORS.chili[600],
    borderColor: COLORS.chili[400],
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.dark.muted,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  whooshBanner: {
    backgroundColor: COLORS.chili[900],
    borderWidth: 1,
    borderColor: COLORS.chili[500],
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  whooshText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heroCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    padding: 20,
    marginBottom: 24,
  },
  heroCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  heroKicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  matchBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(232, 59, 46, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.chili[500],
  },
  matchText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.chili[400],
  },
  weatherTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  weatherTag: {
    fontSize: 13,
    color: COLORS.dark.muted,
    fontWeight: '500',
  },
  cloTag: {
    fontSize: 13,
    color: COLORS.spice.gold,
    fontWeight: '600',
  },
  graphPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark.elevated,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  graphPill: {
    alignItems: 'center',
  },
  graphPillLabel: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.dark.muted,
    fontWeight: '700',
  },
  graphPillVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  layersContainer: {
    backgroundColor: COLORS.dark.elevated,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  layerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  layerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorSwatch: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  layerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  layerRole: {
    fontSize: 11,
    color: COLORS.dark.muted,
    textTransform: 'capitalize',
  },
  layerClo: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.dark.muted,
  },
  notesBox: {
    backgroundColor: 'rgba(232, 59, 46, 0.08)',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.chili[500],
    marginBottom: 18,
  },
  notesText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: COLORS.spice.parchment,
    lineHeight: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
  },
  wearButton: {
    flex: 2,
    backgroundColor: COLORS.chili[500],
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wearButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tryOnButton: {
    flex: 2,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.spice.gold,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryOnButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.spice.gold,
  },
  shuffleButton: {
    flex: 1.5,
    backgroundColor: COLORS.dark.elevated,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffleButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.chili[400],
  },
  recentScroll: {
    flexDirection: 'row',
  },
  miniGarmentCard: {
    width: 105,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  miniCardTop: {
    height: 55,
    backgroundColor: COLORS.dark.elevated,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  miniEmoji: {
    fontSize: 26,
  },
  miniName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  miniFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  miniWorn: {
    fontSize: 10,
    color: COLORS.dark.muted,
  },
  analyticsCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 12,
  },
  analyticsHeading: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.dark.muted,
    fontWeight: '700',
    marginBottom: 8,
  },
  spectrumBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 8,
  },
  spectrumSegment: {
    height: '100%',
  },
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spectrumKey: {
    fontSize: 10,
    color: COLORS.dark.muted,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.dark.muted,
    fontWeight: '700',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  statSub: {
    fontSize: 11,
    color: COLORS.dark.muted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  tryOnCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.spice.gold,
    padding: 20,
  },
  tryOnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tryOnKicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tryOnTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.dark.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  simulationBox: {
    backgroundColor: COLORS.dark.elevated,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  simAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  simAvatarEmoji: {
    fontSize: 48,
  },
  simBadge: {
    backgroundColor: 'rgba(201, 168, 38, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.spice.gold,
    marginBottom: 8,
  },
  simBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.spice.gold,
  },
  simAdvice: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    textAlign: 'center',
    lineHeight: 18,
  },
  tryOnLayers: {
    gap: 8,
    marginBottom: 20,
  },
  tryOnLayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  layerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tryOnLayerName: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  confirmTryOnBtn: {
    backgroundColor: COLORS.chili[500],
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmTryOnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
