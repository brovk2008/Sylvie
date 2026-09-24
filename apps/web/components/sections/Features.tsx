'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, CloudSun, UserCheck, BrainCircuit, Archive, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Camera,
    title: 'Full Wardrobe Scan',
    desc: 'Photograph every item in seconds. Multi-stage vision AI segments, categorizes, and tags fabric, fit, and formality automatically.',
    tag: 'Computer Vision',
    direction: -30,
  },
  {
    icon: Palette,
    title: 'Color Harmony AI',
    desc: 'Mathematical HSL color harmony algorithms and the 60-30-10 styling rule guarantee every outfit is visually unified without color clashes.',
    tag: 'Color Science',
    direction: 0,
  },
  {
    icon: CloudSun,
    title: 'Weather-Aware Dressing',
    desc: 'Integrated with real-time temperature, wind, and rain data. ISO 7730 CLO thermal calculations assemble garments that keep you comfortable.',
    tag: 'CLO Thermal Math',
    direction: 30,
  },
  {
    icon: UserCheck,
    title: 'Body & Skin Tone Profile',
    desc: 'Calibrated to your exact measurements, BMI dial, and a 40-swatch skin tone selector spanning all Fitzpatrick scales and undertones.',
    tag: 'Personalized Fit',
    direction: -30,
  },
  {
    icon: BrainCircuit,
    title: 'Style Psychology Game',
    desc: 'A slot-machine style interactive discovery game that seeds your style preference vector before your very first recommendation.',
    tag: 'Machine Learning',
    direction: 0,
  },
  {
    icon: Archive,
    title: 'My Almirah Intelligence',
    desc: 'A living digital closet with wear tracking, cost-per-wear analytics, laundry status, and smart alerts for under-utilized garments.',
    tag: 'Smart Closet',
    direction: 30,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-28 bg-dark-bg relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-chili-950/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-chili-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400"
          >
            Engineered For Precision Styling
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4"
          >
            Not just an outfit picker.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chili-400 via-chili-500 to-spice-paprika">
              A fashion intelligence system.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-spice-parchment/70 text-base sm:text-lg"
          >
            Unlike generic apps that pull images off Pinterest, Sylvie works exclusively with the clothes currently sitting in your wardrobe.
          </motion.p>
        </div>

        {/* 6 Feature Cards Grid with Staggered Multi-Directional Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: feat.direction, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="chili-card-glow rounded-3xl p-8 bg-dark-surface border border-dark-border group flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-dark-elevated border border-chili-900/60 flex items-center justify-center text-chili-400 group-hover:text-chili-300 group-hover:scale-110 transition-all duration-300 shadow-ambient">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-dark-bg border border-dark-border text-spice-parchment/60">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-chili-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-spice-parchment/75 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-dark-border/60 flex items-center justify-between text-xs font-mono text-chili-400/80 group-hover:text-chili-400 transition-colors">
                  <span>Explore in app</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
