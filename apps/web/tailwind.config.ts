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
          50: '#FEF2F1',
          100: '#FDDFDC',
          200: '#FCC4BF',
          300: '#F99892',
          400: '#F56A60',
          500: '#E83B2E', // Primary Brand
          600: '#C0271B',
          700: '#9E1F15',
          800: '#7B1810',
          900: '#4A0E0A',
          950: '#280706',
        },
        spice: {
          cream: '#FDF5E6',
          parchment: '#F7E8D0',
          paprika: '#D35400',
          terracotta: '#CB4335',
          gold: '#C9A826',
          charcoal: '#1C0A08',
          ember: '#FF6B47',
        },
        dark: {
          bg: '#0E0504',
          surface: '#1F0C0A',
          elevated: '#2E1410',
          border: '#4A1C18',
          muted: '#B87E78',
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
