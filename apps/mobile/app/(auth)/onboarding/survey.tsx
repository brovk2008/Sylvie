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
import COLORS from '../../../constants/colors';
import { Button } from '../../../components/ui/Button';
import { useOnboardingStore } from '../../../stores/onboardingStore';

const QUESTIONS = [
  {
    id: 'q1',
    question: 'When you open your wardrobe in the morning, you...',
    options: [
      { id: 'A', text: "Grab whatever's there — it's fine" },
      { id: 'B', text: "Think about what you're doing today" },
      { id: 'C', text: 'Plan a whole visual concept for the day' },
    ],
  },
  {
    id: 'q2',
    question: "Do you know what 'color temperature' means in fashion?",
    options: [
      { id: 'A', text: 'Nope — sounds like a thermostat' },
      { id: 'B', text: 'Vaguely — warm vs cool tones?' },
      { id: 'C', text: 'Yes — cool undertones vs warm undertones' },
    ],
  },
  {
    id: 'q3',
    question: "You're going on a first date. You...",
    options: [
      { id: 'A', text: 'Wear your cleanest clothes' },
      { id: 'B', text: 'Think about the venue and outfit vibe' },
      { id: 'C', text: 'Build a full outfit concept around a statement piece' },
    ],
  },
  {
    id: 'q4',
    question: 'How would you describe your current style?',
    options: [
      { id: 'A', text: "I don't really have a style" },
      { id: 'B', text: 'I have a general vibe' },
      { id: 'C', text: 'I can name 3 specific aesthetic categories I dress in' },
    ],
  },
];

export default function FashionSurvey() {
  const router = useRouter();
  const { surveyAnswers, setSurveyAnswer, calculateKnowledgeLevel } = useOnboardingStore();
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const q = QUESTIONS[currentQIndex];
  const selectedOption = surveyAnswers[q.id];

  const handleSelectOption = (optId: string) => {
    setSurveyAnswer(q.id, optId);
  };

  const handleNext = () => {
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      calculateKnowledgeLevel();
      router.push('/(auth)/onboarding/style-picker');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Segmented Progress Bar */}
      <View style={styles.header}>
        <View style={styles.progressBarRow}>
          {QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressSegment,
                i <= currentQIndex ? styles.activeSegment : styles.inactiveSegment,
              ]}
            />
          ))}
        </View>
        <Text style={styles.stepText}>
          Question {currentQIndex + 1} of {QUESTIONS.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionText}>{q.question}</Text>

        <View style={styles.optionsList}>
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => handleSelectOption(opt.id)}
                activeOpacity={0.8}
                style={[
                  styles.optionCard,
                  isSelected ? styles.selectedCard : styles.unselectedCard,
                ]}
              >
                <View
                  style={[
                    styles.letterBadge,
                    isSelected ? styles.selectedBadge : styles.unselectedBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      isSelected ? styles.selectedLetterText : styles.unselectedLetterText,
                    ]}
                  >
                    {opt.id}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    isSelected ? styles.selectedOptionText : styles.unselectedOptionText,
                  ]}
                >
                  {opt.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <Button
          title={currentQIndex === QUESTIONS.length - 1 ? 'Start Style Game 🎮' : 'Next Question →'}
          onPress={handleNext}
          disabled={!selectedOption}
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBarRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  activeSegment: {
    backgroundColor: COLORS.chili[500],
  },
  inactiveSegment: {
    backgroundColor: COLORS.dark.border,
  },
  stepText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: COLORS.chili[400],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  questionText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 34,
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  optionsList: {
    gap: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
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
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  letterBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  unselectedBadge: {
    backgroundColor: COLORS.dark.bg,
    borderColor: COLORS.dark.border,
    borderWidth: 1,
  },
  selectedBadge: {
    backgroundColor: COLORS.chili[500],
  },
  letterText: {
    fontSize: 14,
    fontWeight: '800',
  },
  unselectedLetterText: {
    color: COLORS.spice.parchment,
  },
  selectedLetterText: {
    color: '#FFFFFF',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  unselectedOptionText: {
    color: COLORS.spice.parchment,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
  },
});
