'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, Check, RefreshCw } from 'lucide-react';

interface SwatchTone {
  id: string;
  name: string;
  hex: string;
  undertone: 'Warm' | 'Cool' | 'Olive' | 'Neutral';
  bestHarmonies: {
    name: string;
    description: string;
    colors: { name: string; hex: string; category: string }[];
  }[];
}

const SKIN_TONES: SwatchTone[] = [
  {
    id: 'fair-rose',
    name: 'Fair Rosy Porcelain',
    hex: '#FBE3D5',
    undertone: 'Cool',
    bestHarmonies: [
      {
        name: 'Monochromatic Jewel Tones',
        description: 'Deep navy and emerald ground fair complexions without washing out facial contrast.',
        colors: [
          { name: 'Emerald Velvet', hex: '#0B4F37', category: 'Top' },
          { name: 'Deep Midnight Navy', hex: '#152238', category: 'Trousers' },
          { name: 'Rose Bisque', hex: '#F7D6C8', category: 'Accent' },
        ],
      },
      {
        name: 'Soft Contrast Pastel Flow',
        description: 'Gentle muted tones harmonizing with light pink undertones.',
        colors: [
          { name: 'Dusty Slate Blue', hex: '#4A6572', category: 'Jacket' },
          { name: 'Oatmeal Knit', hex: '#EAE6DF', category: 'Inner' },
          { name: 'Dark Indigo', hex: '#1B263B', category: 'Denim' },
        ],
      },
    ],
  },
  {
    id: 'warm-olive',
    name: 'Mediterranean Olive',
    hex: '#D1A374',
    undertone: 'Olive',
    bestHarmonies: [
      {
        name: 'Earthy Triadic Harmony',
        description: 'Sage green, rich terracotta, and cream elevate natural green-yellow undertones.',
        colors: [
          { name: 'Sage Green Linen', hex: '#587B58', category: 'Overshirt' },
          { name: 'Chili Terracotta', hex: '#C0392B', category: 'Knitwear' },
          { name: 'Warm Cream Silk', hex: '#FDF5E6', category: 'Base' },
        ],
      },
      {
        name: 'Warm Ochre Elegance',
        description: 'Subtle golden browns creating a seamless sun-kissed transition.',
        colors: [
          { name: 'Ochre Camel Coat', hex: '#C68642', category: 'Outer' },
          { name: 'Dark Olive Chinos', hex: '#3E4E3A', category: 'Bottom' },
          { name: 'Ivory Poplin', hex: '#FFFFF0', category: 'Shirt' },
        ],
      },
    ],
  },
  {
    id: 'golden-caramel',
    name: 'Golden Caramel Amber',
    hex: '#A06D3F',
    undertone: 'Warm',
    bestHarmonies: [
      {
        name: 'Warm Sunset Spectrum',
        description: 'Burnt orange, rich chili, and golden mustard mirror warm undertone vibrancy.',
        colors: [
          { name: 'Chili Paprika', hex: '#E83B2E', category: 'Blazer' },
          { name: 'Warm Mustard Gold', hex: '#D4AC0D', category: 'Silk Scarf' },
          { name: 'Espresso Wool', hex: '#2C1B18', category: 'Trousers' },
        ],
      },
      {
        name: 'Contrast Cobalt Shock',
        description: 'Striking electric cobalt creating radiant pop against warm amber skin.',
        colors: [
          { name: 'Royal Cobalt Blue', hex: '#1B4F72', category: 'Knit' },
          { name: 'Parchment White', hex: '#F9F6EE', category: 'Tee' },
          { name: 'Charcoal Pleats', hex: '#2C3E50', category: 'Pants' },
        ],
      },
    ],
  },
  {
    id: 'rich-espresso',
    name: 'Deep Mahogany Espresso',
    hex: '#4A2A18',
    undertone: 'Neutral',
    bestHarmonies: [
      {
        name: 'High-Luminance Radiance',
        description: 'High-contrast brights and pure tones pop vividly against deep melanin-rich skin.',
        colors: [
          { name: 'Electric Chili Red', hex: '#E83B2E', category: 'Work Jacket' },
          { name: 'Crisp Optic White', hex: '#FFFFFF', category: 'Oxford Shirt' },
          { name: 'Deep Black Denim', hex: '#0B0B0B', category: 'Jeans' },
        ],
      },
      {
        name: 'Luxe Tonal Monolith',
        description: 'Chocolate, bronze, and camel creating opulent quiet luxury depth.',
        colors: [
          { name: 'Camel Cashmere', hex: '#C19A6B', category: 'Overcoat' },
          { name: 'Bitter Chocolate', hex: '#24140E', category: 'Turtleneck' },
          { name: 'Antique Gold', hex: '#D4AF37', category: 'Hardware' },
        ],
      },
    ],
  },
];

export const ChromaticSpectrum = () => {
  const [selectedTone, setSelectedTone] = useState<SwatchTone>(SKIN_TONES[1]);
  const [activeHarmonyIndex, setActiveHarmonyIndex] = useState(0);

  const currentHarmony = selectedTone.bestHarmonies[activeHarmonyIndex] || selectedTone.bestHarmonies[0];

  return (
    <section id="chroma" className="relative py-28 bg-dark-surface/40 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Header Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chili-950/70 border border-chili-700/50 text-xs font-mono tracking-wider uppercase text-chili-300 mb-4">
              <Palette className="w-3.5 h-3.5 text-chili-400" />
              <span>40-Swatch Fitzpatrick & Monk Engine</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Your Skin Tone Is Not{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-chili-400 via-chili-500 to-spice-paprika">
                A Guessing Game.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-spice-parchment/80 leading-relaxed">
              Standard styling apps suggest generic outfits that look great on mannequins but wash you out in daylight. Click a skin swatch below to see Sylvie compute complementary color harmonies tailored specifically to your complexion.
            </p>
          </div>

          {/* Interactive Skin Swatch Row */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-dark-card border border-dark-border shadow-xl">
            {SKIN_TONES.map((tone) => {
              const isSelected = selectedTone.id === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => {
                    setSelectedTone(tone);
                    setActiveHarmonyIndex(0);
                  }}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-chili-500/20 border border-chili-500 text-white shadow-chili'
                      : 'bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-spice-parchment/70'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 border-white/30 shadow-inner flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tone.hex }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-bold font-display">{tone.name}</p>
                    <p className="text-[10px] font-mono text-spice-parchment/50">
                      {tone.undertone} Undertone
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Harmony Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-dark-border bg-dark-card/90 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient tone glow */}
            <div
              className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[140px] opacity-25 pointer-events-none"
              style={{ backgroundColor: selectedTone.hex }}
            />

            {/* Left: Skin & Harmony Details */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-8 h-8 rounded-full border-2 border-white/40 shadow-md"
                  style={{ backgroundColor: selectedTone.hex }}
                />
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {selectedTone.name}
                  </h3>
                  <span className="text-xs font-mono text-chili-400">
                    Undertone: {selectedTone.undertone} · Monk Scale Calibration
                  </span>
                </div>
              </div>

              {/* Harmony Toggle Pills */}
              <div className="flex items-center gap-2 mb-6">
                {selectedTone.bestHarmonies.map((harm, idx) => (
                  <button
                    key={harm.name}
                    onClick={() => setActiveHarmonyIndex(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeHarmonyIndex === idx
                        ? 'bg-chili-500 text-white shadow-sm'
                        : 'bg-dark-surface border border-dark-border text-spice-parchment/70 hover:text-white'
                    }`}
                  >
                    {harm.name}
                  </button>
                ))}
              </div>

              <h4 className="font-display text-xl font-semibold text-white mb-2">
                {currentHarmony.name}
              </h4>
              <p className="text-sm text-spice-parchment/80 leading-relaxed mb-6">
                {currentHarmony.description}
              </p>

              <div className="flex items-center gap-3 text-xs font-mono text-spice-gold bg-spice-gold/10 px-4 py-2 rounded-xl border border-spice-gold/20">
                <Sparkles className="w-4 h-4" />
                <span>Computed: Contrast Ratio 4.8:1 (Optimal Eye Draw)</span>
              </div>
            </div>

            {/* Right: Dynamic Color Swatch Cards with spring animation */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentHarmony.colors.map((color, idx) => (
                <motion.div
                  key={`${color.name}-${idx}`}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl p-5 border border-dark-border bg-dark-surface/90 flex flex-col justify-between shadow-lg"
                >
                  <div
                    className="w-full h-32 rounded-xl mb-4 shadow-inner relative flex items-end p-3 border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                      {color.hex}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-chili-400">
                      {color.category}
                    </span>
                    <h5 className="font-display text-sm font-bold text-white mt-0.5">
                      {color.name}
                    </h5>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
