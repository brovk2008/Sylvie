'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, Thermometer, Palette, HeartHandshake, Eye } from 'lucide-react';

const ROW_1 = [
  { icon: Palette, text: 'HSL Color Harmony Algorithm' },
  { icon: Thermometer, text: 'Real-Time CLO Thermal Comfort' },
  { icon: Compass, text: '15+ Verified Aesthetic Archetypes' },
  { icon: Sparkles, text: 'Physics-Based Layering Logic' },
  { icon: ShieldCheck, text: 'Zero Generic Web Outfits' },
  { icon: HeartHandshake, text: '40 Inclusive Skin Tone Swatches' },
  { icon: Eye, text: 'On-Device Computer Vision Tagging' },
];

const ROW_2 = [
  { text: 'Old Money Casual' },
  { text: 'Chili Spice Signature' },
  { text: 'Streetwear Minimalist' },
  { text: 'Dark Academia' },
  { text: 'Tailored Sartorial' },
  { text: 'Linen Riviera' },
  { text: 'Quiet Luxury' },
  { text: 'Urban Gorpcore' },
  { text: 'Clean Aesthetic' },
  { text: 'French Girl Chic' },
];

export const MarqueeTicker = () => {
  return (
    <div className="relative w-full py-8 overflow-hidden bg-dark-card/60 border-y border-dark-border/80 backdrop-blur-md">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none" />

      {/* Row 1 — Moving Left */}
      <div className="flex select-none mb-4">
        <motion.div
          className="flex gap-6 shrink-0"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
        >
          {[...ROW_1, ...ROW_1, ...ROW_1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-dark-surface/90 border border-dark-border text-sm font-medium text-spice-parchment/90 hover:border-chili-500/50 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4 text-chili-400" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2 — Moving Right */}
      <div className="flex select-none">
        <motion.div
          className="flex gap-4 shrink-0"
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
        >
          {[...ROW_2, ...ROW_2, ...ROW_2].map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chili-950/40 border border-chili-800/40 text-xs font-mono tracking-wide text-chili-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-chili-500" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
