import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import COLORS from '../../../constants/colors';
import { Button } from '../../../components/ui/Button';
import { INITIAL_STYLE_CARDS } from '@sylvie/fashion-ontology';
import { useOnboardingStore } from '../../../stores/onboardingStore';

export default function StylePickerGame() {
  const router = useRouter();
  const { selectedStyles, toggleStyle, getExpandedStyles } = useOnboardingStore();
  const [search, setSearch] = useState('');

  const expandedStyles = getExpandedStyles();

  const filteredCards = INITIAL_STYLE_CARDS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const canContinue = selectedStyles.length >= 3;

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.kicker}>The Style Discovery Game 🎮</Text>
        <Text style={styles.heading}>Select styles you vibe with</Text>
        <Text style={styles.subheading}>Pick 3 or more to seed your AI stylist</Text>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search aesthetic (e.g. Streetwear, Old Money)..."
            placeholderTextColor={COLORS.dark.muted}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Style Grid */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {filteredCards.map((card) => {
            const isSelected = selectedStyles.includes(card.id);
            return (
              <TouchableOpacity
                key={card.id}
                onPress={() => toggleStyle(card.id)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  isSelected ? styles.selectedCard : styles.unselectedCard,
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardCategory}>{card.category}</Text>
                  <View
                    style={[
                      styles.checkCircle,
                      isSelected ? styles.checkedCircle : styles.uncheckedCircle,
                    ]}
                  >
                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>

                <Text style={styles.cardTitle}>{card.name}</Text>
                <Text style={styles.cardTagline} numberOfLines={2}>
                  {card.tagline}
                </Text>

                {/* Color swatches */}
                <View style={styles.paletteRow}>
                  {card.palette.map((color, i) => (
                    <View
                      key={i}
                      style={[styles.colorDot, { backgroundColor: color }]}
                    />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Expansion prompt */}
        {expandedStyles.length > 0 && (
          <View style={styles.expansionBanner}>
            <Text style={styles.expansionTitle}>✦ AI Similar Suggestions:</Text>
            <View style={styles.expansionChips}>
              {expandedStyles.map((item) => (
                <View key={item} style={styles.subChip}>
                  <Text style={styles.subChipText}>+ {item.replace('_', ' ')}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={styles.footer}>
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            {selectedStyles.length} styles selected {selectedStyles.length >= 3 ? '✓' : '(pick 3)'}
          </Text>
        </View>

        <Button
          title={canContinue ? 'Continue to Profile Setup →' : 'Pick at least 3 styles'}
          onPress={() => router.push('/setup/face-scan')}
          disabled={!canContinue}
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.border,
  },
  kicker: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 13,
    color: COLORS.spice.parchment,
    opacity: 0.8,
    marginTop: 2,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark.surface,
    borderRadius: 9999,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.dark.border,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    minHeight: 145,
    justifyContent: 'space-between',
  },
  unselectedCard: {
    backgroundColor: COLORS.dark.surface,
    borderColor: COLORS.dark.border,
  },
  selectedCard: {
    backgroundColor: COLORS.dark.elevated,
    borderColor: COLORS.chili[500],
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: COLORS.spice.parchment,
    opacity: 0.7,
    textTransform: 'uppercase',
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCircle: {
    borderWidth: 1,
    borderColor: COLORS.dark.border,
    backgroundColor: COLORS.dark.bg,
  },
  checkedCircle: {
    backgroundColor: COLORS.chili[500],
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardTagline: {
    fontSize: 11,
    color: COLORS.spice.parchment,
    opacity: 0.75,
    lineHeight: 16,
  },
  paletteRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  expansionBanner: {
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.dark.surface,
    borderWidth: 1,
    borderColor: COLORS.chili[900],
  },
  expansionTitle: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.spice.gold,
    fontWeight: '700',
    marginBottom: 8,
  },
  expansionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subChip: {
    backgroundColor: COLORS.dark.elevated,
    borderColor: COLORS.chili[800],
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  subChipText: {
    fontSize: 11,
    color: COLORS.chili[300],
    fontFamily: 'monospace',
    textTransform: 'capitalize',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    backgroundColor: COLORS.dark.bg,
  },
  counterRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 13,
    color: COLORS.spice.gold,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
