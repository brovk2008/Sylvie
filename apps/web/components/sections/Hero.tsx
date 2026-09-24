'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, RefreshCw, Sun, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const SAMPLE_OUTFITS = [
  {
    occasion: 'College Pitch & Cafe',
    weather: 'Sunny · 28°C',
    clo: '0.68 CLO',
    match: '98%',
    harmony: 'Analogous Warmth',
    top: { name: 'Oversized Boxy Knit', color: '#C0392B', label: 'Terracotta Chili' },
    bottom: { name: 'Raw Denim Wide Trousers', color: '#1A365D', label: 'Deep Navy' },
    shoes: { name: 'Low-Top Leather Court Shoes', color: '#FDF5E6', label: 'Cream Bisque' },
    accent: { name: 'Canvas Chore Jacket', color: '#8B4513', label: 'Saddle Tan' },
    notes: 'Grounding oversized terracotta with structured raw denim creates an effortless collegiate silhouette with optimal 0.68 thermal breathability.',
  },
  {
    occasion: 'Bistro Date Night 💕',
    weather: 'Clear Evening · 22°C',
    clo: '0.74 CLO',
    match: '99%',
    harmony: 'Complementary Contrast',
    top: { name: 'Relaxed Silk Blend Shirt', color: '#F7E8D0', label: 'Warm Bisque' },
    bottom: { name: 'Pleated Tapered Trousers', color: '#4A0E0A', label: 'Dark Chili' },
    shoes: { name: 'Classic Derby Brogues', color: '#7B1810', label: 'Oxblood Leather' },
    accent: { name: 'Gold Dial Minimalist Watch', color: '#C9A826', label: 'Gold Shimmer' },
    notes: 'The high-contrast pairing of warm bisque and deep chili commands subtle luxury. Proportions emphasize shoulder drape while tapering cleanly at the ankle.',
  },
  {
    occasion: 'Art Gallery Weekend',
    weather: 'Breezy · 24°C',
    clo: '0.65 CLO',
    match: '96%',
    harmony: 'Earthy Triadic Tonal',
    top: { name: 'Sage Green Overshirt', color: '#587B58', label: 'Earthy Sage' },
    bottom: { name: 'Relaxed Linen Drawstring Pants', color: '#FDF5E6', label: 'Cream Linen' },
    shoes: { name: 'Suede Gum-Sole Runners', color: '#D35400', label: 'Paprika Amber' },
    accent: { name: 'Woven Calfskin Belt', color: '#2C1B18', label: 'Espresso' },
    notes: 'Textural interplay between airy sage linen and heavyweight cream creates tactile depth without overheating under gallery spotlighting.',
  },
];

export const Hero = () => {
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  const outfit = SAMPLE_OUTFITS[currentOutfitIndex];

  const handleShuffle = () => {
    setShuffling(true);
    setTimeout(() => {
      setCurrentOutfitIndex((prev) => (prev + 1) % SAMPLE_OUTFITS.length);
      setShuffling(false);
    }, 200);
  };

  return (
    <section className="relative min-h-[96vh] pt-36 pb-20 flex items-center bg-radial-hero overflow-hidden">
      {/* Decorative ambient lighting */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-chili-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-chili-900/35 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Editorial Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-chili-950/80 border border-chili-700/60 text-xs font-mono tracking-wider uppercase text-chili-300 mb-6 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-chili-500 animate-ping" />
              <span>Multi-Stage AI · Real Wardrobe Only · Zero Stock Photos</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6">
              Your wardrobe.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-chili-400 via-chili-500 to-spice-paprika">
                Your rules.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-spice-parchment/85 font-normal max-w-2xl leading-relaxed mb-8">
              Sylvie digitizes every single garment in your physical closet, synchronizes with your skin undertone and real-time weather, then engineers magazine-grade outfits you actually own.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#download"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-semibold text-base transition-all duration-300 shadow-chili hover:shadow-chili-lg hover:scale-105 active:scale-95 group"
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                <span>Download Android APK</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#demo"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-dark-card hover:bg-dark-surface border border-dark-border hover:border-chili-700 text-spice-parchment font-medium text-base transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-spice-gold" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-dark-border w-full max-w-lg">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">40</p>
                <p className="text-xs text-spice-parchment/60 font-mono mt-0.5">Skin Tone Swatches</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-chili-400">100%</p>
                <p className="text-xs text-spice-parchment/60 font-mono mt-0.5">Physical Wardrobe</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-spice-gold">CLO-Calibrated</p>
                <p className="text-xs text-spice-parchment/60 font-mono mt-0.5">Live Weather Logic</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Interactive 3D Outfit Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Card Shell */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-dark-card/90 border border-dark-border shadow-2xl backdrop-blur-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-dark-border mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-chili-400">
                      Live Outfit Computation
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-chili-500/20 text-chili-300 border border-chili-500/30">
                      Sylvie Engine v1
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {outfit.occasion}
                  </h3>
                </div>

                <button
                  onClick={handleShuffle}
                  disabled={shuffling}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-surface hover:bg-dark-border border border-dark-border text-xs text-spice-parchment transition-all hover:text-white group"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-chili-400 ${shuffling ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span>Shuffle</span>
                </button>
              </div>

              {/* Weather & Comfort Indicators */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-dark-surface/80 border border-dark-border/60">
                  <div className="flex items-center gap-1.5 text-spice-gold mb-1">
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase">Live Weather</span>
                  </div>
                  <p className="text-xs font-semibold text-white">{outfit.weather}</p>
                </div>

                <div className="p-3 rounded-2xl bg-dark-surface/80 border border-dark-border/60">
                  <span className="text-[10px] font-mono uppercase text-chili-400 block mb-1">
                    Thermal Score
                  </span>
                  <p className="text-xs font-semibold text-white">{outfit.clo}</p>
                </div>

                <div className="p-3 rounded-2xl bg-dark-surface/80 border border-dark-border/60">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                    Harmony Index
                  </span>
                  <p className="text-xs font-semibold text-emerald-300">{outfit.match} Match</p>
                </div>
              </div>

              {/* Garment Stack with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOutfitIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5 mb-6"
                >
                  {[
                    { slot: 'Top', item: outfit.top },
                    { slot: 'Bottom', item: outfit.bottom },
                    { slot: 'Shoes', item: outfit.shoes },
                    { slot: 'Accent', item: outfit.accent },
                  ].map(({ slot, item }) => (
                    <div
                      key={slot}
                      className="flex items-center justify-between p-3 rounded-2xl bg-dark-surface/50 border border-dark-border/50 hover:border-chili-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{item.name}</p>
                          <p className="text-[10px] text-spice-parchment/60 font-mono">
                            {slot} · {item.label}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        In Almirah
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Stylist Notes Box */}
              <div className="p-4 rounded-2xl bg-chili-950/40 border border-chili-900/60 text-xs text-spice-parchment/90 leading-relaxed">
                <div className="flex items-center gap-2 text-chili-400 font-mono text-[11px] mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Stylist Reasoning ({outfit.harmony})</span>
                </div>
                <p className="italic">{outfit.notes}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
