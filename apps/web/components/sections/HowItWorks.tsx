'use client';

import React from 'react';
import { Camera, Sliders, Sparkles } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Camera,
    title: 'Digitize Your Closet',
    desc: 'Take front and back photos of your physical clothing. Vision models automatically isolate garments from background noise, classify fabrics, and catalog dominant HSL colors.',
    detail: 'YOLOv8 Segmentation + Florence-2 Attribute Extraction',
  },
  {
    num: '02',
    icon: Sliders,
    title: 'Calibrate Your Profile',
    desc: 'Match your exact skin tone from our 40-swatch Fitzpatrick palette, enter proportions for your body profile, and take the psychological style quiz to seed your AI vector.',
    detail: 'Skin undertone analysis + 40+ fashion archetypes',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Dress in Runway Harmony',
    desc: 'Tell Sylvie your destination. The engine pulls live temperature and rain forecasts, solves for ISO 7730 CLO insulation, and serves 3 ranked outfits with stylist notes.',
    detail: 'Real-time weather + 60-30-10 color theory',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400">
            Simple 3-Step Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            How Sylvie dresses you
          </h2>
          <p className="text-spice-parchment/70 text-base sm:text-lg">
            From hanging in your physical almirah to runway-ready confidence in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="chili-card-glow rounded-3xl p-8 bg-dark-surface border border-dark-border relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-4xl font-extrabold text-chili-500/80">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-dark-elevated border border-chili-900/60 flex items-center justify-center text-chili-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-spice-parchment/75 leading-relaxed font-normal mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-dark-border/60">
                  <span className="text-[11px] font-mono text-spice-gold font-medium">
                    ✦ {step.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
