import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/colors';

const { width } = Dimensions.get('window');

interface RibbonRevealProps {
  onAnimationComplete?: () => void;
}

export const RibbonReveal: React.FC<RibbonRevealProps> = ({ onAnimationComplete }) => {
  const leftRibbonX = useRef(new Animated.Value(-width)).current;
  const rightRibbonX = useRef(new Animated.Value(width)).current;
  const ribbonScaleY = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Ribbons enter and meet at center
      Animated.parallel([
        Animated.timing(leftRibbonX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rightRibbonX, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // 2. Ribbons unfurl vertically
      Animated.timing(ribbonScaleY, {
        toValue: 3.5,
        duration: 250,
        useNativeDriver: true,
      }),
      // 3. Logo pops in with spring bounce
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1.0,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1.0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // 4. Wordmark title fades in
      Animated.timing(titleOpacity, {
        toValue: 1.0,
        duration: 250,
        useNativeDriver: true,
      }),
      // 5. Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, 400);
      }
    });
  }, [
    leftRibbonX,
    rightRibbonX,
    ribbonScaleY,
    logoScale,
    logoOpacity,
    titleOpacity,
    taglineOpacity,
    onAnimationComplete,
  ]);

  return (
    <View style={styles.container}>
      {/* Background radial ambient glow */}
      <View style={styles.glow} />

      {/* Animated Red Ribbons */}
      <Animated.View
        style={[
          styles.ribbon,
          styles.leftRibbon,
          {
            transform: [
              { translateX: leftRibbonX },
              { scaleY: ribbonScaleY },
              { rotate: '-12deg' },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ribbon,
          styles.rightRibbon,
          {
            transform: [
              { translateX: rightRibbonX },
              { scaleY: ribbonScaleY },
              { rotate: '12deg' },
            ],
          },
        ]}
      />

      {/* Sylvie Logo Wordmark with Spring Animation */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Editorial Title */}
      <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
        SYLVIE
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your wardrobe. Your rules.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark.bg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(232, 59, 46, 0.18)',
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 80,
  },
  ribbon: {
    position: 'absolute',
    height: 10,
    width: width * 1.2,
    backgroundColor: COLORS.chili[500],
    borderRadius: 5,
    shadowColor: COLORS.chili[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  leftRibbon: {
    top: '46%',
  },
  rightRibbon: {
    top: '52%',
  },
  logoContainer: {
    width: width * 0.72,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 6,
    marginTop: 18,
    zIndex: 10,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.spice.parchment,
    letterSpacing: 2,
    marginTop: 8,
    fontStyle: 'italic',
    zIndex: 10,
  },
});
