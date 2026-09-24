'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  Eye,
  ScanEye,
  Compass,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
} from 'lucide-react';
import {
  OBSERVABILITY_CLASSIFICATION,
  CONFIDENCE_THRESHOLDS,
  CONTEXT_OCCASIONS_MAP,
} from '@/lib/fashion-ontology';

export const MasterOntologySection = () => {
  const [activeLevel, setActiveLevel] = useState<'level_a' | 'level_b' | 'level_c' | 'level_d'>('level_a');
  const [selectedContext, setSelectedContext] = useState<string>('College Presentation');

  const levelIcons = {
    level_a: { icon: Eye, color: 'text-blue-400', border: 'border-blue-500/40', bg: 'bg-blue-950/30', title: 'Level A · Directly Observable' },
    level_b: { icon: ScanEye, color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-950/30', title: 'Level B · Visually Inferable' },
    level_c: { icon: Compass, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/30', title: 'Level C · Context-Dependent' },
    level_d: { icon: UserCheck, color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/30', title: 'Level D · User-Dependent' },
  };

  const currentLevelData = OBSERVABILITY_CLASSIFICATION[activeLevel];
  const activePreset = CONTEXT_OCCASIONS_MAP[selectedContext] || CONTEXT_OCCASIONS_MAP['College Presentation'];

  return (
    <section id="ontology" className="py-24 relative overflow-hidden bg-dark-bg border-t border-dark-border">
      {/* Background accents */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-chili-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-spice-gold/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface border border-spice-gold/30 mb-4">
            <BrainCircuit className="w-3.5 h-3.5 text-spice-gold" />
            <span className="text-xs font-mono font-semibold tracking-wider text-spice-gold uppercase">
              Computational Fashion Architecture
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The 37-Category <span className="text-gradient-chili">Master Fashion Ontology</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-spice-parchment/70 font-sans leading-relaxed">
            Rather than treating fashion as a simple chatbot label, Sylvie separates observable garment properties
            from inferred semantic attributes and user-dependent preferences with calibrated confidence scores.
          </p>
        </div>

        {/* 4 Observability Levels Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(['level_a', 'level_b', 'level_c', 'level_d'] as const).map((lvl) => {
            const info = levelIcons[lvl];
            const Icon = info.icon;
            const isSelected = activeLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? `${info.bg} ${info.border} shadow-lg ring-1 ring-white/10`
                    : 'bg-dark-surface border-dark-border hover:border-dark-border/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${info.color}`} />
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${info.color}`}>
                    {lvl.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white truncate">{info.title.split('·')[1]}</p>
              </button>
            );
          })}
        </div>

        {/* Active Observability Level Attribute Grid */}
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-dark-surface border border-dark-border mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-dark-border mb-6 gap-4">
            <div>
              <span className="text-xs font-mono text-spice-gold uppercase tracking-wider">
                PROVENANCE &amp; UNCERTAINTY TIER
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {levelIcons[activeLevel].title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold">
                Confidence &gt; 0.90: Auto-Accept
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 font-semibold">
                0.60–0.90: User Confirmation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentLevelData.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-dark-elevated border border-white/5 hover:border-chili-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-chili-400 tracking-wide">
                      {item.key}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-surface border border-white/10 text-spice-parchment/60">
                      Tier {activeLevel.slice(-1).toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                  <p className="mt-1 text-xs text-spice-parchment/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WARDROBE GRAPH FORMULA + "I'M GOING HERE" SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formula Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-dark-surface to-dark-elevated border border-chili-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-chili-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-chili-400">
                Wardrobe Graph Synergy Formula
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Mathematical Fit Optimization
            </h3>

            <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border font-mono text-xs text-spice-cream space-y-2 mb-6">
              <p className="text-spice-gold font-bold">Total_Score =</p>
              <div className="pl-4 space-y-1 text-spice-parchment/80">
                <p>+ (Color_Harmony × 0.30) <span className="text-white/40">// HSL 60-30-10</span></p>
                <p>+ (Weather_Insulation × 0.25) <span className="text-white/40">// ISO 7730 CLO</span></p>
                <p>+ (Occasion_Formality × 0.20) <span className="text-white/40">// 0.0 - 10.0 scale</span></p>
                <p>+ (Personal_Preference × 0.15) <span className="text-white/40">// User affinity</span></p>
                <p>+ (Rotation_Boost × 0.10) <span className="text-white/40">// Days unworn fatigue</span></p>
              </div>
            </div>

            <p className="text-sm text-spice-parchment/70 leading-relaxed mb-4">
              By combining graph connectivity with physical laundry state filtering, Sylvie ensures you never get
              recommended clothes currently sitting in your laundry basket or garments that clash thermally with outdoor humidity.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-dark-bg border border-white/5">
                <span className="text-spice-parchment/50">INDIAN CLIMATE</span>
                <p className="text-white font-bold mt-1">6 Distinct Seasons</p>
                <span className="text-[10px] text-chili-400">Hot-Dry, Monsoon, Cool</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-bg border border-white/5">
                <span className="text-spice-parchment/50">CULTURAL ONTOLOGY</span>
                <p className="text-white font-bold mt-1">Ethnic Wear Native</p>
                <span className="text-[10px] text-spice-gold">Kurtas, Sarees, Bandhgalas</span>
              </div>
            </div>
          </div>

          {/* "I'M GOING HERE" Live Context Simulator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-dark-surface border border-dark-border">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-spice-gold" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-spice-gold">
                &ldquo;I&apos;M GOING HERE&rdquo; Context Engine
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Context-Driven Recalibration
            </h3>
            <p className="text-sm text-spice-parchment/70 mb-6">
              Select an occasion to watch the target formality, aesthetic weights, and layer requirements shift instantly:
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(CONTEXT_OCCASIONS_MAP).map((name) => {
                const isSelected = selectedContext === name;
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedContext(name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-chili-500 text-white shadow-chili'
                        : 'bg-dark-elevated text-spice-parchment/70 border border-dark-border hover:border-chili-500/50'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Result Card */}
            <div className="p-5 rounded-2xl bg-dark-elevated border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-dark-border">
                <span className="font-display text-lg font-bold text-white">{selectedContext}</span>
                <span className="px-2.5 py-1 rounded-md bg-chili-950 border border-chili-500/50 text-xs font-mono font-bold text-chili-400">
                  Target Formality {activePreset.targetFormality}/10
                </span>
              </div>

              <p className="text-xs text-spice-parchment/90 italic leading-relaxed">
                &ldquo;{activePreset.vibeText}&rdquo;
              </p>

              <div>
                <span className="text-[10px] font-mono text-spice-parchment/60 uppercase">
                  PREFERRED AESTHETICS
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {activePreset.preferredAesthetics.map((a, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-dark-bg border border-white/10 text-xs font-mono text-spice-gold"
                    >
                      #{a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs font-mono text-spice-parchment/60">
                <span>Formality Range: [{activePreset.formalityRange.join(' - ')}]</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Compatibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
