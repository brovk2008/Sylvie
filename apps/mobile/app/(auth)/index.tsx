import React from 'react';
import { useRouter } from 'expo-router';
import { RibbonReveal } from '../../components/animations/RibbonReveal';

export default function SplashScreen() {
  const router = useRouter();

  const handleFinish = () => {
    router.replace('/(tabs)/home');
  };

  return <RibbonReveal onAnimationComplete={handleFinish} />;
}
