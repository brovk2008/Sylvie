import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chili: {
          50: '#FFF5F4',
          100: '#FEE8E6',
          200: '#FDCAC6',
          300: '#FA9F97',
          400: '#FF4D3D',
          500: '#FF2819', // Primary Haute Couture Electric Chili
          600: '#E01E0E',
          700: '#B81407',
          800: '#8A0F05',
          900: '#4A0705',
          950: '#220302',
        },
        spice: {
          cream: '#FDFBF7',     // Silk Satin Ivory
          parchment: '#F5EBE1', // Warm Cashmere
          paprika: '#FF5E1E',   // Electric Paprika
          terracotta: '#E54536',
          gold: '#E5B842',      // Imperial Champagne Gold
          amber: '#FF8C38',     // Saffron Amber
          charcoal: '#120504',
          ember: '#FF7043',
        },
        dark: {
          bg: '#080404',        // Deep Obsidian Noir (prevents muddy brown)
          surface: '#120605',   // Espresso Obsidian
          elevated: '#1C0B09',  // Polished Lacquer Mahogany
          card: '#160807',      // Velvet Card Surface
          border: '#381613',    // Fine Hairline Jewelry Border
          muted: '#C49E99',     // Velvet Rose Taupe
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        ambient: '0 1px 3px rgba(28,10,8,0.12), 0 1px 2px rgba(28,10,8,0.08)',
        card: '0 4px 12px rgba(28,10,8,0.14), 0 2px 4px rgba(28,10,8,0.10)',
        raised: '0 8px 24px rgba(28,10,8,0.16), 0 4px 8px rgba(28,10,8,0.12)',
        modal: '0 20px 48px rgba(28,10,8,0.22), 0 8px 16px rgba(28,10,8,0.15)',
        chili: '0 8px 32px rgba(232,59,46,0.35)',
        'chili-lg': '0 0 50px rgba(232,59,46,0.45)',
        'gold-glow': '0 0 25px rgba(201,168,38,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ribbon-wave': 'ribbonWave 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ribbonWave: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
