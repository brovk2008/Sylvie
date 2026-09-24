import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../../constants/colors';
import { useWardrobeStore } from '../../../stores/wardrobeStore';

const FILTER_CLASSES = [
  { id: 'all', label: 'All' },
  { id: 'top', label: 'Tops' },
  { id: 'bottom', label: 'Bottoms' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'footwear', label: 'Shoes' },
  { id: 'accessory', label: 'Accessories' },
];

export default function AlmirahScreen() {
  const router = useRouter();
  const { garments, toggleFavorite } = useWardrobeStore();
  const [activeClass, setActiveClass] = useState('all');
  const [search, setSearch] = useState('');

  const filteredGarments = garments.filter((g) => {
    const matchesClass = activeClass === 'all' || g.garmentClass === activeClass;
    const matchesSearch =
      g.customName.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase()) ||
      g.dominantColorName.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const cleanCount = garments.filter((g) => g.cleanStatus === 'clean').length;
  const dirtyCount = garments.length - cleanCount;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.kicker}>DIGITAL WARDROBE</Text>
            <Text style={styles.title}>My Almirah ({garments.length})</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/almirah/add' as any)}
            activeOpacity={0.8}
            style={styles.addButton}
          >
            <Text style={styles.addText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>

        {/* Clean / Dirty Status Pill */}
        <View style={styles.statusRow}>
          <Text style={styles.statusPill}>
            🧺 Clean ({cleanCount}) · In Laundry ({dirtyCount})
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search clothes by name, color, or cut..."
            placeholderTextColor={COLORS.dark.muted}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Category Horizontal Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {FILTER_CLASSES.map((f) => {
            const count = f.id === 'all'
              ? garments.length
              : garments.filter((g) => g.garmentClass === f.id).length;
            const isSelected = activeClass === f.id;

            return (
              <TouchableOpacity
                key={f.id}
                onPress={() => setActiveClass(f.id)}
                style={[
                  styles.filterChip,
                  isSelected ? styles.activeChip : styles.inactiveChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? styles.activeChipText : styles.inactiveChipText,
                  ]}
                >
                  {f.label} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 2-Column Grid */}
      <ScrollView contentContainerStyle={styles.scrollGrid}>
        {filteredGarments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🧥</Text>
            <Text style={styles.emptyTitle}>No garments match your filter</Text>
            <Text style={styles.emptySubtitle}>
              Try searching for something else or add a new piece to your almirah.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredGarments.map((g) => (
              <TouchableOpacity
                key={g.id}
                onPress={() => router.push(`/(tabs)/almirah/${g.id}` as any)}
                activeOpacity={0.8}
                style={styles.garmentTile}
              >
                {/* Visual Top Preview */}
                <View style={styles.tileImageArea}>
                  <Text style={styles.tileEmoji}>{g.photoEmoji}</Text>

                  {/* Clean Status Pill */}
                  <View
                    style={[
                      styles.cleanTag,
                      g.cleanStatus === 'dirty' && styles.dirtyTag,
                    ]}
                  >
                    <Text style={styles.cleanTagText}>
                      {g.cleanStatus === 'clean' ? 'Clean' : 'Laundry'}
                    </Text>
                  </View>

                  {/* Favorite Heart */}
                  <TouchableOpacity
                    onPress={() => toggleFavorite(g.id)}
                    style={styles.heartButton}
                  >
                    <Text style={styles.heartIcon}>
                      {g.favorite ? '❤️' : '🤍'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Details */}
                <View style={styles.tileDetails}>
                  <Text style={styles.tileTitle} numberOfLines={1}>
                    {g.customName}
                  </Text>
                  <Text style={styles.tileCategory} numberOfLines={1}>
                    {g.category}
                  </Text>

                  {/* Color accent strip & wear count */}
                  <View style={styles.tileFooter}>
                    <View style={styles.colorPill}>
                      <View
                        style={[
                          styles.colorDot,
                          { backgroundColor: g.dominantColorHex },
                        ]}
                      />
                      <Text style={styles.colorName}>{g.dominantColorName}</Text>
                    </View>
                    <Text style={styles.wearBadge}>Worn {g.wearCount}x</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  kicker: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: COLORS.chili[500],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statusRow: {
    marginBottom: 10,
  },
  statusPill: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.surface,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 13,
    color: '#FFFFFF',
  },
  chipsRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
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
    fontSize: 12,
    fontWeight: '600',
  },
  inactiveChipText: {
    color: COLORS.spice.parchment,
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  scrollGrid: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  garmentTile: {
    width: '48%',
    borderRadius: 20,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    overflow: 'hidden',
  },
  tileImageArea: {
    height: 130,
    backgroundColor: COLORS.dark.bg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tileEmoji: {
    fontSize: 54,
  },
  cleanTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(46, 125, 50, 0.25)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  dirtyTag: {
    backgroundColor: 'rgba(230, 81, 0, 0.25)',
    borderColor: '#FF9800',
  },
  cleanTagText: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#FFFFFF',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  heartIcon: {
    fontSize: 16,
  },
  tileDetails: {
    padding: 12,
  },
  tileTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tileCategory: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.6,
    marginBottom: 8,
  },
  tileFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
  colorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  colorName: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.8,
  },
  wearBadge: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
