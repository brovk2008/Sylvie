'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Sparkles, RefreshCw, Sun, CheckCircle, ArrowRight } from 'lucide-react';

const SAMPLE_OUTFITS = [
  {
    occasion: 'College Morning',
    weather: 'Sunny · 28°C',
    clo: '0.68 CLO',
    match: '96%',
    harmony: 'Analogous Flow',
    top: { name: 'Oversized Boxy Tee', color: '#1C0A08', label: 'Charcoal' },
    bottom: { name: 'Raw Denim Wide Jeans', color: '#1A365D', label: 'Deep Navy' },
    shoes: { name: 'Low-Top Leather Sneakers', color: '#FDF5E6', label: 'Cream Parchment' },
    accent: { name: 'Chili Canvas Work Jacket', color: '#E83B2E', label: 'Chili Accent' },
    notes: 'Grounding oversized charcoal with structured raw denim creates an effortless collegiate silhouette. Cream sneakers prevent low-end visual weight.',
  },
  {
    occasion: 'First Date 💕',
    weather: 'Clear Evening · 24°C',
    clo: '0.74 CLO',
    match: '98%',
    harmony: 'Complementary Contrast',
    top: { name: 'Relaxed Silk Blend Shirt', color: '#F7E8D0', label: 'Warm Bisque' },
    bottom: { name: 'Pleated Tapered Trousers', color: '#4A0E0A', label: 'Dark Chili' },
    shoes: { name: 'Classic Derby Brogues', color: '#7B1810', label: 'Deep Oxblood' },
    accent: { name: 'Minimalist Steel Chronograph', color: '#C9A826', label: 'Gold Shimmer' },
    notes: 'The high-contrast pairing of warm bisque and deep chili commands subtle luxury. Proportions emphasize shoulder drape while tapering cleanly at the ankle.',
  },
  {
    occasion: 'Weekend Brunch',
    weather: 'Breezy · 26°C',
    clo: '0.62 CLO',
    match: '94%',
    harmony: 'Monochromatic Tonal',
    top: { name: 'Waffle Knit Quarter-Zip', color: '#C0271B', label: 'Spice Red' },
    bottom: { name: 'Relaxed Linen Drawstring Pants', color: '#FDF5E6', label: 'Cream Linen' },
    shoes: { name: 'Suede Gum-Sole Runners', color: '#D35400', label: 'Paprika Amber' },
    accent: { name: 'Woven Leather Belt', color: '#8B4513', label: 'Saddle Tan' },
    notes: 'Textural interplay between waffle knit and breathable linen gives depth without overheating. Calibrated to 0.62 CLO for mid-day sunlight.',
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
    }, 250);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center bg-radial-hero overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-chili-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-chili-900/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Editorial Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-chili-950/80 border border-chili-700/60 text-xs font-mono tracking-wider uppercase text-chili-300 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-chili-500 animate-ping" />
              <span>Multi-Stage AI · Real Wardrobe Only</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Your wardrobe.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-chili-400 via-chili-500 to-spice-paprika">
                Your rules.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-spice-parchment/85 font-normal max-w-2xl leading-relaxed mb-8">
              Sylvie digitizes every piece of clothing you physically own, reads your skin tone and live weather, then assembles runway-grade daily outfits that actually exist in your almirah.
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
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full glass-panel hover:bg-dark-elevated text-spice-parchment font-medium text-base transition-all duration-300 hover:border-chili-500/50"
              >
                <span>Interactive Walkthrough</span>
              </a>
            </div>

            {/* Trust / Stats strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-dark-border/80 w-full max-w-lg">
              <div>
                <p className="font-display text-2xl font-bold text-white">0%</p>
                <p className="text-xs text-spice-parchment/60 font-medium">Generic Stock Looks</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-chili-400">100%</p>
                <p className="text-xs text-spice-parchment/60 font-medium">Clothes You Own</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-spice-gold">ISO 7730</p>
                <p className="text-xs text-spice-parchment/60 font-medium">CLO Weather Math</p>
              </div>
            </div>
          </div>

          {/* Right Column — 3D-Styled Animated Interactive Device Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Phone outer bezel */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[48px] p-3.5 bg-gradient-to-b from-[#2E1410] via-[#1F0C0A] to-[#0E0504] border-[3px] border-chili-800/60 shadow-2xl shadow-chili-950/80">
              {/* Camera Notch pill */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-chili-600/60" />
              </div>

              {/* Inner Screen */}
              <div className="relative rounded-[38px] bg-dark-bg overflow-hidden border border-dark-border/60 p-5 text-spice-cream min-h-[580px] flex flex-col justify-between">
                {/* App Screen Header */}
                <div>
                  <div className="flex items-center justify-between pt-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-chili-400 tracking-wider">
                        SYLVIE AI
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-spice-parchment/70 bg-dark-surface px-2.5 py-1 rounded-full border border-dark-border">
                      <Sun className="w-3.5 h-3.5 text-spice-gold" />
                      <span>{outfit.weather}</span>
                    </div>
                  </div>

                  {/* Today's Fit Card */}
                  <div
                    className={`rounded-2xl p-4 bg-gradient-to-b from-dark-surface to-dark-elevated border border-chili-700/50 shadow-card transition-all duration-300 ${
                      shuffling ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-spice-parchment/60 tracking-wider">
                          Recommended Fit
                        </span>
                        <h4 className="font-display text-lg font-bold text-white">
                          {outfit.occasion}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-spice-gold px-2 py-0.5 rounded-md bg-spice-gold/10 border border-spice-gold/30">
                        {outfit.match} Match
                      </span>
                    </div>

                    {/* Garment Stack preview */}
                    <div className="space-y-2 mb-3">
                      {/* Top */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-dark-bg/80 border border-dark-border/80">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: outfit.top.color }}
                          />
                          <span className="text-xs font-medium text-white">{outfit.top.name}</span>
                        </div>
                        <span className="text-[10px] text-spice-parchment/60 font-mono">
                          {outfit.top.label}
                        </span>
                      </div>

                      {/* Bottom */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-dark-bg/80 border border-dark-border/80">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: outfit.bottom.color }}
                          />
                          <span className="text-xs font-medium text-white">{outfit.bottom.name}</span>
                        </div>
                        <span className="text-[10px] text-spice-parchment/60 font-mono">
                          {outfit.bottom.label}
                        </span>
                      </div>

                      {/* Footwear */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-dark-bg/80 border border-dark-border/80">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: outfit.shoes.color }}
                          />
                          <span className="text-xs font-medium text-white">{outfit.shoes.name}</span>
                        </div>
                        <span className="text-[10px] text-spice-parchment/60 font-mono">
                          {outfit.shoes.label}
                        </span>
                      </div>

                      {/* Accent / Outer */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-dark-bg/80 border border-dark-border/80">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: outfit.accent.color }}
                          />
                          <span className="text-xs font-medium text-white">{outfit.accent.name}</span>
                        </div>
                        <span className="text-[10px] text-chili-400 font-mono">
                          {outfit.accent.label}
                        </span>
                      </div>
                    </div>

                    {/* Harmony & CLO tags */}
                    <div className="flex items-center justify-between pt-2 border-t border-dark-border text-[11px] font-mono text-spice-parchment/70">
                      <span>🎨 {outfit.harmony}</span>
                      <span>🌡️ {outfit.clo}</span>
                    </div>
                  </div>

                  {/* Stylist Notes Card */}
                  <div className="mt-3 p-3 rounded-xl bg-dark-surface/60 border border-dark-border text-xs text-spice-parchment/80 leading-relaxed italic">
                    &ldquo;{outfit.notes}&rdquo;
                  </div>
                </div>

                {/* Bottom Interactive Action Buttons */}
                <div className="pt-4 flex gap-2">
                  <button
                    onClick={handleShuffle}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-dark-elevated hover:bg-dark-border text-xs font-medium text-white border border-dark-border transition-colors active:scale-95"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-chili-400 ${shuffling ? 'animate-spin' : ''}`} />
                    <span>Shuffle Outfit</span>
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-chili-500 hover:bg-chili-600 text-xs font-semibold text-white shadow-chili transition-colors">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Wear This</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
