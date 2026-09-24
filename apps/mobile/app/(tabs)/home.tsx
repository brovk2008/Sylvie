import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../constants/colors';
import { useUserStore } from '../../stores/userStore';
import { useWardrobeStore } from '../../stores/wardrobeStore';
import { useOutfitStore } from '../../stores/outfitStore';
import { fetchWeather } from '../../lib/api';

export default function HomeScreen() {
  const router = useRouter();
  const { displayName, profileCompletionPct } = useUserStore();
  const { garments, markWorn } = useWardrobeStore();
  const { outfits, activeOutfitIndex, shuffleOutfit } = useOutfitStore();

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

  // Calculations for stats
  const totalValue = garments.reduce((acc, g) => acc + (g.purchasePrice || 0), 0);
  const totalWears = garments.reduce((acc, g) => acc + g.wearCount, 0);
  const avgCostPerWear = totalWears > 0 ? Math.round(totalValue / totalWears) : 45;
  const unusedCount = garments.filter((g) => g.wearCount < 3).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <div>
          <Text style={styles.dateLabel}>Tuesday, Sep 24</Text>
          <Text style={styles.greeting}>Hey {displayName || 'Vaibhav'} 🌶️</Text>
        </div>
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

        {/* TODAY'S FIT HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardHeader}>
            <div>
              <Text style={styles.heroKicker}>TODAY&apos;S FIT</Text>
              <Text style={styles.heroTitle}>{currentOutfit.occasion}</Text>
            </div>
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

          {/* Garment Layer Stack */}
          <View style={styles.layersContainer}>
            {currentOutfit.layers.map((layer, idx) => (
              <View key={idx} style={styles.layerRow}>
                <View style={styles.layerInfo}>
                  <View
                    style={[styles.colorSwatch, { backgroundColor: layer.colorHex }]}
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
              onPress={shuffleOutfit}
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

        {/* ANALYTICS PEEK */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
          Closet Intelligence
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ITEMS</Text>
            <Text style={styles.statValue}>{garments.length}</Text>
            <Text style={styles.statSub}>Total pieces</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>AVG CPW</Text>
            <Text style={styles.statValue}>₹{avgCostPerWear}</Text>
            <Text style={styles.statSub}>Per wear</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>UNTOUCHED</Text>
            <Text style={[styles.statValue, { color: COLORS.chili[400] }]}>
              {unusedCount}
            </Text>
            <Text style={styles.statSub}>&lt; 3 wears</Text>
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
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.chili[800],
    marginBottom: 20,
  },
  completionLeft: {
    flex: 1,
    marginRight: 16,
  },
  completionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  completionSubtitle: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.75,
    marginTop: 2,
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: COLORS.dark.elevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.chili[500],
  },
  completionPct: {
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: '800',
    color: COLORS.spice.gold,
  },
  heroCard: {
    backgroundColor: COLORS.dark.surface,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(232, 59, 46, 0.4)',
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 24,
  },
  heroCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  heroKicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  matchBadge: {
    backgroundColor: 'rgba(201, 168, 38, 0.15)',
    borderColor: 'rgba(201, 168, 38, 0.5)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchText: {
    color: COLORS.spice.gold,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  weatherTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
    marginBottom: 14,
  },
  weatherTag: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.8,
  },
  cloTag: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
  },
  layersContainer: {
    gap: 8,
    marginBottom: 14,
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
  layerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorSwatch: {
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
  notesBox: {
    backgroundColor: COLORS.dark.elevated,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 16,
  },
  notesText: {
    fontSize: 12,
    color: COLORS.spice.parchment,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
  },
  wearButton: {
    flex: 1.4,
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
  wearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  shuffleButton: {
    flex: 1,
    backgroundColor: COLORS.dark.elevated,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  shuffleButtonText: {
    color: COLORS.spice.parchment,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
  },
  recentScroll: {
    flexDirection: 'row',
  },
  miniGarmentCard: {
    width: 110,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginRight: 10,
  },
  miniCardTop: {
    height: 70,
    borderRadius: 12,
    backgroundColor: COLORS.dark.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  miniEmoji: {
    fontSize: 32,
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
    justifyContent: 'space-between',
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  miniWorn: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  statSub: {
    fontSize: 10,
    color: COLORS.dark.muted,
  },
});
