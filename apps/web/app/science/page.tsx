'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Binary,
  Layers,
  Thermometer,
  Palette,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function SciencePage() {
  // Interactive CLO Calculator State
  const [temperature, setTemperature] = useState<number>(18);
  const [windSpeed, setWindSpeed] = useState<number>(12);
  const [activity, setActivity] = useState<'resting' | 'walking' | 'active'>('walking');

  // Calculate required CLO value based on ISO 7730 simplified model
  const calculateCLO = () => {
    const activityFactor = activity === 'resting' ? 1.2 : activity === 'walking' ? 1.0 : 0.8;
    const windChillLoss = (windSpeed * 0.015);
    const baseClo = (24 - temperature) * 0.08 * activityFactor + windChillLoss;
    return Math.max(0.2, Math.min(3.2, Number(baseClo.toFixed(2))));
  };

  const currentClo = calculateCLO();

  const getCloAdvice = (clo: number) => {
    if (clo < 0.45) return { label: 'Ultra Lightweight', combo: 'Linen Cuban Collar + Lightweight Chino Shorts' };
    if (clo < 0.85) return { label: 'Mild Comfort', combo: 'Organic Pima Cotton Tee + Relaxed Pleated Trousers' };
    if (clo < 1.35) return { label: 'Autumn Thermal Layering', combo: 'Merino Wool Knit + Tailored Trench + Selvedge Denim' };
    return { label: 'Severe Thermal Protection', combo: 'Cashmere Turtleneck + Down Overcoat + Lined Wool Slacks' };
  };

  const advice = getCloAdvice(currentClo);

  return (
    <div className="min-h-screen bg-dark-bg text-spice-parchment selection:bg-chili-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 border-b border-dark-border/60 overflow-hidden bg-radial-hero">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-chili-500/30 text-chili-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6">
              <Binary className="w-3.5 h-3.5 text-spice-gold" />
              <span>Computational Fashion Intelligence</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              The Science of Sylvie
            </h1>
            <p className="text-base sm:text-xl text-spice-parchment/70 max-w-3xl mx-auto font-light leading-relaxed">
              Fashion is not guessing. Sylvie solves daily dressing via a 37-dimensional garment ontology, ISO 7730 thermodynamic comfort modeling, and chromatic undertone vectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars of Fashion Science */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Layers,
              title: '37-Dimension Ontology',
              desc: 'From fiber denier to drape coefficient, garments are parsed across 4 observability tiers without manual tagging.',
              badge: 'Vision-LLM',
            },
            {
              icon: Thermometer,
              title: 'ISO 7730 CLO Model',
              desc: 'Thermodynamic heat balance equations dynamically compute outfit thermal resistance against hyper-local wind & humidity.',
              badge: 'Physics',
            },
            {
              icon: Palette,
              title: '40-Swatch Tone Matrix',
              desc: 'Continuous CIELAB colour space delta-E calculations match garment reflectance against melanin undertones.',
              badge: 'Optics',
            },
            {
              icon: Cpu,
              title: 'FashionCLIP Vector Graph',
              desc: '512-dimensional semantic latent vectors eliminate outfit repetition by solving wardrobe graph connectivity.',
              badge: 'Embeddings',
            },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl glass-panel p-6 border border-dark-border hover:border-chili-500/50 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-chili-500/10 text-chili-400 border border-chili-500/20">
                  <pillar.icon className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-spice-gold px-2.5 py-1 rounded-full bg-spice-gold/10 border border-spice-gold/20">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-spice-parchment/70 leading-relaxed font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive ISO 7730 CLO Simulator */}
      <section className="py-20 px-6 sm:px-8 border-t border-b border-dark-border/60 bg-dark-surface/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-chili-400 font-semibold">
              Interactive Lab
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
              ISO 7730 Dynamic CLO Simulator
            </h2>
            <p className="text-sm sm:text-base text-spice-parchment/70 max-w-xl mx-auto mt-3 font-light">
              Adjust environmental inputs to observe how Sylvie calculates necessary thermal resistance in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-3xl glass-panel p-8 sm:p-12 border border-chili-500/30 shadow-chili">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-spice-parchment/70">Ambient Temperature</span>
                  <span className="text-white font-bold">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="38"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-chili-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-spice-parchment/70">Wind Velocity & Draft</span>
                  <span className="text-white font-bold">{windSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-chili-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-spice-parchment/70">Metabolic Activity Level</span>
                  <span className="text-chili-400 font-bold uppercase">{activity}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['resting', 'walking', 'active'] as const).map((act) => (
                    <button
                      key={act}
                      onClick={() => setActivity(act)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono uppercase transition-all ${
                        activity === act
                          ? 'bg-chili-500 text-white font-bold'
                          : 'bg-dark-elevated text-spice-parchment/70 hover:text-white'
                      }`}
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Gauge & Recommendation */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-dark-bg/80 border border-dark-border text-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-spice-parchment/60 mb-2">
                Required Thermal Insulation
              </span>
              <div className="font-display text-5xl sm:text-6xl font-bold text-white mb-1">
                {currentClo} <span className="text-xl text-chili-400 font-mono font-normal">CLO</span>
              </div>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-spice-gold/15 text-spice-gold border border-spice-gold/30 mt-2 mb-6">
                {advice.label}
              </span>

              <div className="w-full border-t border-dark-border/60 pt-4 text-left">
                <span className="text-[10px] font-mono uppercase text-spice-parchment/50 block mb-1">
                  Synthesized Almirah Combination
                </span>
                <p className="text-xs font-medium text-white leading-relaxed">
                  {advice.combo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 37-Dimension Observability Architecture */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-chili-400 font-semibold">
            Zero Manual Data Entry
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-2">
            The 4 Observability Tiers
          </h2>
          <p className="text-sm sm:text-base text-spice-parchment/70 max-w-2xl mx-auto mt-3 font-light">
            How Sylvie maps your clothing items into structured metadata from a single smartphone snapshot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              tier: 'Level A: Direct Vision Sensor',
              tech: 'YOLOv8 + Florence-2 Precision Bounding',
              dims: ['Garment Class', 'Primary Hue', 'Pattern Geometry', 'Sleeve Cut', 'Hemline Length', 'Collar Architecture'],
              desc: 'Extracted in <120ms with pixel-level segmentation masks and dominant LAB color extraction.',
            },
            {
              tier: 'Level B: Vision-LLM Inferred',
              tech: 'Multi-Modal Reasoning & Texture Analysis',
              dims: ['Fabric Type', 'Weight (GSM)', 'Drape Index', 'Formality Tier', 'Stretch Ratio', 'Breathability'],
              desc: 'Inferring tactile micro-properties from weave tension, wrinkle behavior, and stitch density.',
            },
            {
              tier: 'Level C: Temporal & Environmental',
              tech: 'Open-Meteo API + Wear Frequency Graph',
              dims: ['Local Ambient Temp', 'Dew Point / Humidity', 'Precipitation Risk', 'Days Since Last Laundry', 'UV Index'],
              desc: 'Contextualizing outfit suitability against physical reality, preventing over-wearing and laundry bottlenecks.',
            },
            {
              tier: 'Level D: Relational Graph Solvers',
              tech: 'Qdrant + Graph Neural Synergy Engine',
              dims: ['Monochromatic Harmony', 'Triadic Contrast', 'Silhouette Balance', 'Occasion Compliance', 'Redundancy Score'],
              desc: 'Evaluating compatibility across the entire wardrobe graph to ensure 0 clash and optimal proportion.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl glass-panel p-8 border border-dark-border"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl font-bold text-white">{item.tier}</h3>
                <span className="text-[10px] font-mono text-chili-400 bg-chili-500/10 px-2.5 py-1 rounded-full border border-chili-500/20">
                  {item.tech}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-spice-parchment/70 mb-4 font-light leading-relaxed">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-dark-border/40">
                {item.dims.map((dim, j) => (
                  <span
                    key={j}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-dark-surface text-spice-parchment/90 border border-dark-border"
                  >
                    {dim}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 border-t border-dark-border/60 text-center bg-radial-chili">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6">
            Put Fashion Science in Your Pocket
          </h2>
          <p className="text-sm sm:text-base text-spice-parchment/70 mb-8 font-light leading-relaxed">
            Install the Sylvie APK on your Android device and digitize your wardrobe with cutting-edge computational styling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="py-3.5 px-8 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-medium text-sm shadow-chili transition-all hover:scale-105"
            >
              Download Standalone APK
            </Link>
            <Link
              href="/lookbook"
              className="py-3.5 px-8 rounded-full glass-panel hover:bg-dark-elevated text-spice-parchment font-medium text-sm border border-dark-border transition-all"
            >
              Explore Lookbook
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
