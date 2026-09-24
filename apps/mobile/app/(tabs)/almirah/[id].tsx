import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import COLORS from '../../../constants/colors';
import { useWardrobeStore } from '../../../stores/wardrobeStore';

export default function GarmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { garments, toggleCleanStatus, markWorn, removeGarment, toggleFavorite } = useWardrobeStore();

  const garment = garments.find((g) => g.id === id) || garments[0];

  if (!garment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Garment not found.</Text>
      </SafeAreaView>
    );
  }

  const costPerWear =
    garment.wearCount > 0
      ? Math.round(garment.purchasePrice / garment.wearCount)
      : garment.purchasePrice;

  const handleMarkWorn = () => {
    markWorn(garment.id);
    Alert.alert('Logged Wear', `Marked ${garment.customName} as worn today!`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Remove from Almirah',
      `Are you sure you want to remove ${garment.customName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeGarment(garment.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>&larr; Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorite(garment.id)}
          style={styles.favButton}
        >
          <Text style={styles.favIcon}>{garment.favorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Big Garment Visual Hero */}
        <View style={styles.visualHero}>
          <Text style={styles.heroEmoji}>{garment.photoEmoji}</Text>
          <View
            style={[
              styles.cleanStatusPill,
              garment.cleanStatus === 'dirty' && styles.dirtyPill,
            ]}
          >
            <Text style={styles.cleanStatusText}>
              {garment.cleanStatus === 'clean' ? 'CLEAN & READY' : 'IN LAUNDRY'}
            </Text>
          </View>
        </View>

        {/* Title & Category */}
        <View style={styles.metaHeader}>
          <Text style={styles.kicker}>{garment.garmentClass.toUpperCase()}</Text>
          <Text style={styles.title}>{garment.customName}</Text>
          <Text style={styles.category}>{garment.category}</Text>
        </View>

        {/* Investment / Cost Per Wear Card */}
        <View style={styles.cpwCard}>
          <View style={styles.cpwCol}>
            <Text style={styles.cpwLabel}>TOTAL WEARS</Text>
            <Text style={styles.cpwVal}>{garment.wearCount}x</Text>
            <Text style={styles.cpwSub}>Last: {garment.lastWornAt}</Text>
          </View>
          <View style={styles.cpwDivider} />
          <View style={styles.cpwCol}>
            <Text style={styles.cpwLabel}>COST PER WEAR</Text>
            <Text style={[styles.cpwVal, { color: COLORS.spice.gold }]}>
              ₹{costPerWear}
            </Text>
            <Text style={styles.cpwSub}>Initial: ₹{garment.purchasePrice}</Text>
          </View>
        </View>

        {/* Visual Attributes */}
        <Text style={styles.sectionHeading}>Color & Aesthetics</Text>
        <View style={styles.attrRow}>
          <View style={styles.attrItem}>
            <Text style={styles.attrLabel}>Dominant Color</Text>
            <View style={styles.colorVal}>
              <View
                style={[styles.dot, { backgroundColor: garment.dominantColorHex }]}
              />
              <Text style={styles.attrVal}>
                {garment.dominantColorName} ({garment.dominantColorHex})
              </Text>
            </View>
          </View>

          <View style={styles.attrItem}>
            <Text style={styles.attrLabel}>Formality Score</Text>
            <Text style={styles.attrVal}>{garment.formalityScore} / 10</Text>
          </View>
        </View>

        {/* Physical Attributes */}
        <Text style={styles.sectionHeading}>Cut & Material</Text>
        <View style={styles.attrGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fit Silhouette</Text>
            <Text style={styles.gridVal}>{garment.fit.toUpperCase()}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Thermal Value</Text>
            <Text style={styles.gridVal}>{garment.cloValue} CLO</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fabric Composition</Text>
            <Text style={styles.gridVal}>{garment.material}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>AI Confidence</Text>
            <Text style={[styles.gridVal, { color: '#4CAF50' }]}>98% Verified</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={handleMarkWorn}
            activeOpacity={0.8}
            style={styles.wearBtn}
          >
            <Text style={styles.wearBtnText}>✦ Mark as Worn Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleCleanStatus(garment.id)}
            activeOpacity={0.8}
            style={styles.cleanBtn}
          >
            <Text style={styles.cleanBtnText}>
              {garment.cleanStatus === 'clean' ? 'Mark In Laundry' : 'Mark Clean'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteBtnText}>Remove Garment</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  backButton: {
    padding: 6,
  },
  backText: {
    color: COLORS.spice.parchment,
    fontSize: 14,
    fontWeight: '700',
  },
  favButton: {
    padding: 6,
  },
  favIcon: {
    fontSize: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  visualHero: {
    height: 200,
    borderRadius: 24,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1.5,
    borderColor: COLORS.chili[900],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  heroEmoji: {
    fontSize: 90,
  },
  cleanStatusPill: {
    position: 'absolute',
    bottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(46, 125, 50, 0.25)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  dirtyPill: {
    backgroundColor: 'rgba(230, 81, 0, 0.25)',
    borderColor: '#FF9800',
  },
  cleanStatusText: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  metaHeader: {
    marginBottom: 20,
  },
  kicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  category: {
    fontSize: 14,
    color: COLORS.spice.parchment,
    opacity: 0.7,
    marginTop: 2,
  },
  cpwCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 24,
  },
  cpwCol: {
    flex: 1,
    alignItems: 'center',
  },
  cpwDivider: {
    width: 1,
    backgroundColor: COLORS.dark.border,
  },
  cpwLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  cpwVal: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  cpwSub: {
    fontSize: 10,
    color: COLORS.dark.muted,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  attrRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  attrItem: {
    flex: 1,
    backgroundColor: COLORS.dark.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  attrLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
    marginBottom: 6,
  },
  colorVal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  attrVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  attrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  gridItem: {
    width: '48%',
    backgroundColor: COLORS.dark.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  gridLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
    marginBottom: 4,
  },
  gridVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionButtons: {
    gap: 10,
  },
  wearBtn: {
    backgroundColor: COLORS.chili[500],
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  wearBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  cleanBtn: {
    backgroundColor: COLORS.dark.elevated,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  cleanBtnText: {
    color: COLORS.spice.parchment,
    fontSize: 13,
    fontWeight: '700',
  },
  deleteBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: COLORS.semantic.error,
    fontSize: 12,
    fontWeight: '600',
  },
  notFoundText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
