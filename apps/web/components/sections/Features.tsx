'use client';

import React from 'react';
import { Camera, Palette, CloudSun, UserCheck, BrainCircuit, Archive } from 'lucide-react';

const FEATURES = [
  {
    icon: Camera,
    title: 'Full Wardrobe Scan',
    desc: 'Photograph every item in seconds. Multi-stage vision AI segments, categorizes, and tags fabric, fit, and formality automatically.',
    tag: 'Computer Vision',
  },
  {
    icon: Palette,
    title: 'Color Harmony AI',
    desc: 'Mathematical HSL color harmony algorithms and the 60-30-10 styling rule guarantee every outfit is visually unified without color clashes.',
    tag: 'Color Science',
  },
  {
    icon: CloudSun,
    title: 'Weather-Aware Dressing',
    desc: 'Integrated with real-time temperature, wind, and rain data. ISO 7730 CLO thermal calculations assemble garments that keep you comfortable.',
    tag: 'CLO Thermal Math',
  },
  {
    icon: UserCheck,
    title: 'Body & Skin Tone Profile',
    desc: 'Calibrated to your exact measurements, BMI dial, and a 40-swatch skin tone selector spanning all Fitzpatrick scales and undertones.',
    tag: 'Personalized Fit',
  },
  {
    icon: BrainCircuit,
    title: 'Style Psychology Game',
    desc: 'A slot-machine style interactive discovery game that seeds your style preference vector before your very first recommendation.',
    tag: 'Machine Learning',
  },
  {
    icon: Archive,
    title: 'My Almirah Intelligence',
    desc: 'A living digital closet with wear tracking, cost-per-wear analytics, laundry status, and smart alerts for under-utilized garments.',
    tag: 'Smart Closet',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400">
            Engineered For Precision Styling
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Not just an outfit picker.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chili-400 to-spice-paprika">
              A fashion intelligence system.
            </span>
          </h2>
          <p className="text-spice-parchment/70 text-base sm:text-lg">
            Unlike generic apps that pull images off Pinterest, Sylvie works exclusively with the clothes currently sitting in your wardrobe.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="chili-card-glow rounded-3xl p-8 bg-dark-surface border border-dark-border group flex flex-col justify-between"
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

                <div className="mt-6 pt-4 border-t border-dark-border/60 flex items-center text-xs font-mono text-chili-400/80 group-hover:text-chili-400">
                  <span>Explore in app &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
