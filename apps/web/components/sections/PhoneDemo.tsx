'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shirt, Wand2, BarChart3, CheckCircle2, Smartphone, ShieldCheck, Thermometer } from 'lucide-react';

const DEMO_STEPS = [
  {
    id: 'ribbon',
    title: 'Ribbon Reveal Intro',
    icon: Sparkles,
    subtitle: 'Signature cinematic onboarding',
    desc: 'The app greets you with a silky crimson ribbon animation that unfurls in two stages to reveal the Sylvie emblem.',
    screenRender: () => (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg">
        <div className="relative w-44 h-16 mb-4 animate-pulse-slow">
          <Image src="/logo.png" alt="Sylvie" fill className="object-contain" />
        </div>
        <p className="font-display text-xl font-bold text-white mb-1">SYLVIE</p>
        <p className="text-xs text-chili-400 font-mono tracking-widest uppercase">
          Your Wardrobe. Your Rules.
        </p>
        <div className="mt-8 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-chili-500 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-chili-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-chili-500" />
        </div>
      </div>
    ),
  },
  {
    id: 'almirah',
    title: 'My Almirah Grid',
    icon: Shirt,
    subtitle: '2-column dynamic masonry wardrobe',
    desc: 'Browse every piece you own categorized into Tops, Bottoms, Outerwear, and Shoes with dominant color swatches, wear counters, and laundry state.',
    screenRender: () => (
      <div className="h-full flex flex-col p-4 bg-dark-bg text-spice-cream overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-dark-border mb-3">
          <div>
            <span className="text-[10px] font-mono text-spice-parchment/60">DIGITAL CLOSET</span>
            <p className="font-display text-base font-bold text-white">My Almirah (42 items)</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-chili-950 border border-chili-800 text-chili-400">
            Clean 38 · Dirty 4
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 text-[10px] font-mono no-scrollbar">
          <span className="px-2.5 py-1 rounded-full bg-chili-500 text-white font-semibold">All</span>
          <span className="px-2.5 py-1 rounded-full bg-dark-surface border border-dark-border text-spice-parchment/70">Tops (18)</span>
          <span className="px-2.5 py-1 rounded-full bg-dark-surface border border-dark-border text-spice-parchment/70">Bottoms (12)</span>
          <span className="px-2.5 py-1 rounded-full bg-dark-surface border border-dark-border text-spice-parchment/70">Shoes (8)</span>
        </div>

        {/* Masonry mini grid */}
        <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-1">
          <div className="rounded-xl p-2.5 bg-dark-surface border border-dark-border flex flex-col justify-between">
            <div className="w-full h-20 rounded-lg bg-chili-950/60 border border-dark-border flex items-center justify-center text-chili-500 text-xl font-display">
              👕
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-white truncate">Boxy Graphic Tee</p>
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-spice-parchment/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1C0A08]" /> Charcoal
                </span>
                <span>Worn 9x</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-2.5 bg-dark-surface border border-dark-border flex flex-col justify-between">
            <div className="w-full h-20 rounded-lg bg-chili-950/60 border border-dark-border flex items-center justify-center text-chili-500 text-xl font-display">
              👖
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-white truncate">Straight Raw Denim</p>
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-spice-parchment/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1A365D]" /> Navy
                </span>
                <span>Worn 14x</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-2.5 bg-dark-surface border border-dark-border flex flex-col justify-between">
            <div className="w-full h-20 rounded-lg bg-chili-950/60 border border-dark-border flex items-center justify-center text-chili-500 text-xl font-display">
              🧥
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-white truncate">Canvas Work Jacket</p>
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-spice-parchment/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#E83B2E]" /> Chili
                </span>
                <span>Worn 5x</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-2.5 bg-dark-surface border border-dark-border flex flex-col justify-between">
            <div className="w-full h-20 rounded-lg bg-chili-950/60 border border-dark-border flex items-center justify-center text-chili-500 text-xl font-display">
              👟
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-white truncate">Leather Low Tops</p>
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-spice-parchment/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FDF5E6]" /> Cream
                </span>
                <span>Worn 22x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'outfit',
    title: 'Outfit Generator',
    icon: Wand2,
    subtitle: 'Weather & context calibrated styling',
    desc: 'Enter an occasion such as "College presentation" or "First date" and Sylvie queries local weather, calculates target CLO insulation, and pairs items using color theory.',
    screenRender: () => (
      <div className="h-full flex flex-col justify-between p-4 bg-dark-bg text-spice-cream">
        <div>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-dark-border">
            <span className="text-xs font-bold text-white">✨ Outfit Generator</span>
            <span className="text-[10px] font-mono text-chili-400">Live AI Solver</span>
          </div>

          <div className="p-3 rounded-xl bg-dark-surface border border-dark-border mb-3">
            <p className="text-[11px] font-mono text-spice-parchment/70">Context query:</p>
            <p className="text-sm font-semibold text-white">&ldquo;College presentation tomorrow&rdquo;</p>
            <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-spice-gold">
              <span>☀️ 27°C Sunny</span>
              <span>·</span>
              <span>Target: 0.70 CLO</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-b from-dark-surface to-dark-elevated border border-chili-700/60">
            <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
              <span>Smart Casual Fit #1</span>
              <span className="text-spice-gold">96% Match</span>
            </div>
            <div className="space-y-1.5 text-xs text-spice-parchment/90">
              <div className="p-1.5 rounded-lg bg-dark-bg flex items-center justify-between">
                <span>Tailored Oxford Collar Shirt</span>
                <span className="text-[10px] font-mono text-spice-parchment/60">0.25 CLO</span>
              </div>
              <div className="p-1.5 rounded-lg bg-dark-bg flex items-center justify-between">
                <span>Pleated Dark Olive Chinos</span>
                <span className="text-[10px] font-mono text-spice-parchment/60">0.25 CLO</span>
              </div>
              <div className="p-1.5 rounded-lg bg-dark-bg flex items-center justify-between">
                <span>Suede Penny Loafers</span>
                <span className="text-[10px] font-mono text-spice-parchment/60">0.05 CLO</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-dark-border flex items-center justify-between text-[10px] font-mono text-chili-400">
              <span>Total: 0.68 CLO</span>
              <span>Analogous Harmony ✓</span>
            </div>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-chili-500 font-semibold text-xs text-white shadow-chili mt-2">
          Wear This Outfit
        </button>
      </div>
    ),
  },
  {
    id: 'analytics',
    title: 'Wardrobe Analytics',
    icon: BarChart3,
    subtitle: 'Cost-per-wear & closet efficiency',
    desc: 'Gain mathematical clarity over your fashion investments. Identify high-ROI favorites, discover untouched garments, and calculate average wear efficiency.',
    screenRender: () => (
      <div className="h-full flex flex-col p-4 bg-dark-bg text-spice-cream">
        <div className="pb-3 border-b border-dark-border mb-3">
          <span className="text-[10px] font-mono text-spice-parchment/60">INTELLIGENCE</span>
          <p className="font-display text-base font-bold text-white">Wardrobe Analytics</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-3 rounded-xl bg-dark-surface border border-dark-border">
            <span className="text-[10px] font-mono text-spice-parchment/60">TOTAL VALUE</span>
            <p className="font-display text-lg font-bold text-white mt-1">₹76,400</p>
            <span className="text-[10px] font-mono text-chili-400">42 garments</span>
          </div>

          <div className="p-3 rounded-xl bg-dark-surface border border-dark-border">
            <span className="text-[10px] font-mono text-spice-parchment/60">AVG COST/WEAR</span>
            <p className="font-display text-lg font-bold text-spice-gold mt-1">₹42</p>
            <span className="text-[10px] font-mono text-spice-parchment/60">Per day</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-dark-surface border border-dark-border mb-3">
          <span className="text-[10px] font-mono text-spice-parchment/60">COLOR PROFILE</span>
          <div className="h-3 w-full rounded-full bg-dark-bg mt-2 flex overflow-hidden">
            <div className="bg-[#1C0A08] w-[35%]" title="Charcoal" />
            <div className="bg-[#1A365D] w-[25%]" title="Navy" />
            <div className="bg-[#E83B2E] w-[20%]" title="Chili" />
            <div className="bg-[#FDF5E6] w-[20%]" title="Cream" />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-spice-parchment/60 mt-1">
            <span>Charcoal 35%</span>
            <span>Navy 25%</span>
            <span>Chili 20%</span>
            <span>Cream 20%</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-dark-elevated border border-chili-900/60">
          <span className="text-[10px] font-mono text-chili-400 font-semibold">CLOSET ROTATION ALERT</span>
          <p className="text-xs text-white mt-1">
            4 garments haven&apos;t been styled in 21+ days. Sylvie will prioritize them in your next rotation.
          </p>
        </div>
      </div>
    ),
  },
];

export const PhoneDemo = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="demo" className="py-28 bg-dark-surface/50 border-y border-dark-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400"
          >
            Interactive Product Preview
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4"
          >
            Experience the Sylvie interface
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-spice-parchment/70 text-base sm:text-lg"
          >
            Tap through the key views to see how Sylvie transforms physical clothes into a responsive stylist.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Step selectors with staggered entrance */}
          <div className="lg:col-span-6 space-y-4">
            {DEMO_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border flex items-start gap-4 ${
                    isActive
                      ? 'bg-dark-elevated border-chili-500/70 shadow-chili'
                      : 'bg-dark-surface border-dark-border hover:border-chili-900'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                      isActive
                        ? 'bg-chili-500 text-white shadow-chili scale-105'
                        : 'bg-dark-bg border border-dark-border text-spice-parchment/60'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-display text-lg font-bold ${
                          isActive ? 'text-white' : 'text-spice-parchment'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-chili-400" />}
                    </div>
                    <p className="text-xs font-mono text-chili-400 mb-1">{step.subtitle}</p>
                    <p className="text-sm text-spice-parchment/70 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Mockup showing active screen with Floating Parallax Badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center relative"
          >
            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 sm:right-6 px-4 py-2 rounded-2xl bg-dark-card border border-chili-500/50 shadow-xl backdrop-blur-md z-30 flex items-center gap-2 text-xs font-mono text-chili-300"
            >
              <Smartphone className="w-4 h-4 text-chili-400" />
              <span>Native Expo SDK 52</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 sm:left-6 px-4 py-2 rounded-2xl bg-dark-card border border-dark-border shadow-xl backdrop-blur-md z-30 flex items-center gap-2 text-xs font-mono text-emerald-300"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline-First SQLite Cache</span>
            </motion.div>

            {/* Phone Frame */}
            <div className="w-[320px] sm:w-[360px] h-[640px] rounded-[48px] p-3 bg-gradient-to-b from-[#2E1410] via-[#1F0C0A] to-[#0E0504] border-[3px] border-chili-800/60 shadow-2xl shadow-chili-950/90 relative">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20" />
              <div className="w-full h-full rounded-[38px] overflow-hidden border border-dark-border bg-dark-bg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full"
                  >
                    {DEMO_STEPS[activeStep].screenRender()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
