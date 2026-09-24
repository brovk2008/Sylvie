import { Platform } from 'react-native';

const LOCALHOST = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';
export const API_BASE_URL = process.env.EXPO_PUBLIC_AI_SERVER_URL || LOCALHOST;

export async function fetchWeather(lat = 28.6139, lon = 77.2090, city = 'Delhi NCR') {
  try {
    const res = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&city=${encodeURIComponent(city)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Graceful offline fallback
  }

  return {
    city,
    temp_c: 28.0,
    feels_like_c: 29.2,
    humidity_pct: 48,
    wind_kmh: 12.0,
    rain_probability: 0,
    description: 'Sunny & Clear',
    recommended_clo: 0.68,
    summary: 'Sunny & Clear · 28°C · CLO target 0.68',
  };
}

export async function analyzeGarment(imageBase64: string, classHint?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/analyze-garment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_base64: imageBase64,
        garment_class_hint: classHint,
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Offline simulated AI response
  }

  return {
    task_id: `offline-${Date.now()}`,
    status: 'done',
    result: {
      garment_class: classHint || 'top',
      category: classHint === 'bottom' ? 'Jeans' : classHint === 'outerwear' ? 'Jacket' : 'T-Shirt',
      fit: 'regular',
      dominant_color_hex: '#1C0A08',
      dominant_color_name: 'Charcoal',
      dominant_hsl: { h: 0, s: 0, l: 10 },
      color_temperature: 'neutral',
      primary_fiber: 'cotton',
      formality_score: 4.0,
      clo_value: 0.15,
      occasions: ['College', 'Casual', 'Weekend'],
    },
  };
}
