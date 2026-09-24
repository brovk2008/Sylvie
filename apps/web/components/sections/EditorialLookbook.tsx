'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Compass, Eye, ArrowUpRight } from 'lucide-react';

export const EditorialLookbook = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Multi-directional parallax transforms driven by scroll
  const yColumnLeft = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yColumnCenter = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yColumnRight = useTransform(scrollYProgress, [0, 1], [-60, 120]);

  const xTagLeft = useTransform(scrollYProgress, [0, 1], [-40, 20]);
  const xTagRight = useTransform(scrollYProgress, [0, 1], [40, -30]);

  const rotateCard1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotateCard2 = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-dark-bg overflow-hidden border-b border-dark-border"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-chili-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chili-950/70 border border-chili-700/50 text-xs font-mono tracking-wider uppercase text-chili-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-chili-400" />
            <span>High-Fashion Digital Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
          >
            The Runway In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chili-400 via-chili-500 to-spice-paprika">
              Your Wardrobe.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-spice-parchment/80 font-normal leading-relaxed"
          >
            Scroll to explore how Sylvie synchronizes physical clothing silhouettes, seasonal color science, and thermal comfort into fluid, effortless daily looks.
          </motion.p>
        </div>

        {/* Multi-Directional Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column — Capsule Flatlay with Downward Parallax */}
          <motion.div
            style={{ y: yColumnLeft, rotate: rotateCard1 }}
            className="md:col-span-4 flex flex-col gap-6"
          >
            <div className="group relative rounded-3xl overflow-hidden border border-dark-border bg-dark-card shadow-2xl transition-all duration-500 hover:border-chili-500/50">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/capsule-flatlay.jpg"
                  alt="Minimalist luxury capsule wardrobe flatlay"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-chili-400">
                    Almirah Audit · 14 Pieces
                  </span>
                  <span className="text-xs font-mono text-spice-gold bg-spice-gold/10 px-2 py-0.5 rounded-full">
                    94 Combinations
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Capsule Versatility Matrix
                </h3>
                <p className="text-sm text-spice-parchment/70 leading-relaxed mb-4">
                  Every garment is indexed with its silhouette drape, cut frequency, and color undertone to maximize rotation.
                </p>

                {/* Floating Tag */}
                <motion.div
                  style={{ x: xTagLeft }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-surface/90 border border-dark-border text-xs font-medium text-white shadow-lg backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Cost-per-wear: $1.42/day</span>
                </motion.div>
              </div>
            </div>

            {/* Quick Quote Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-3xl border border-dark-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-chili-500/20 flex items-center justify-center text-chili-400 font-bold text-xs">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sylvie Editorial Note</h4>
                  <p className="text-xs text-spice-parchment/60">Issue 4 · Fall Layering</p>
                </div>
              </div>
              <p className="text-sm text-spice-parchment/85 italic leading-relaxed">
                &ldquo;Texture creates depth when color is restrained. Mix heavyweight waffle knits with structured raw denim to establish effortless visual balance.&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Center Column — Hero Editorial Vogue Portrait with Upward Parallax */}
          <motion.div
            style={{ y: yColumnCenter }}
            className="md:col-span-5 flex flex-col items-center"
          >
            <div className="group relative w-full rounded-3xl overflow-hidden border-2 border-chili-500/40 bg-dark-card shadow-chili-lg transition-all duration-500 hover:border-chili-400">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/hero-editorial.jpg"
                  alt="Vogue style editorial fashion portrait"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />

                {/* Floating Interactive Badge Over Image */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-dark-bg/80 border border-chili-500/50 backdrop-blur-md text-xs font-mono tracking-wider text-chili-300">
                    AESTHETIC ARCHETYPE
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-chili-500 text-white font-mono text-xs font-semibold shadow-md">
                    0.74 CLO
                  </div>
                </div>

                {/* Bottom Image Overlay Details */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-dark-bg/85 border border-dark-border/80 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-chili-400">
                      The Terracotta Overcoat
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> 98% Skin Harmony
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">
                    Warm Autumn Undertone Match
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E83B2E] border border-white/20" title="Chili Terracotta" />
                    <span className="w-4 h-4 rounded-full bg-[#FDF5E6] border border-white/20" title="Cream Knit" />
                    <span className="w-4 h-4 rounded-full bg-[#3B2219] border border-white/20" title="Mocha Trousers" />
                    <span className="text-xs text-spice-parchment/60 ml-2 font-mono">
                      Triadic Warm Palette
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Skin Harmony & Street Style with Staggered Parallax */}
          <motion.div
            style={{ y: yColumnRight, rotate: rotateCard2 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            {/* Skin Harmony Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-dark-border bg-dark-card shadow-xl transition-all duration-500 hover:border-chili-500/50">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/skin-harmony.jpg"
                  alt="Skin tone color matching portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5">
                <span className="text-xs font-mono uppercase text-spice-gold">
                  Color Theory Engine
                </span>
                <h3 className="font-display text-base font-bold text-white mt-1 mb-2">
                  Olive & Golden Undertones
                </h3>
                <p className="text-xs text-spice-parchment/70 leading-relaxed">
                  Avoids unflattering washed-out hues by comparing 40 calibrated Fitzpatrick & Monk undertone coordinates.
                </p>

                {/* Floating Swatch Tag */}
                <motion.div
                  style={{ x: xTagRight }}
                  className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-chili-950/80 border border-chili-700/60 text-[11px] font-mono text-chili-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-spice-gold" />
                  <span>Optimal: Sage + Terracotta</span>
                </motion.div>
              </div>
            </div>

            {/* Street Style Card */}
            <div className="group relative rounded-3xl overflow-hidden border border-dark-border bg-dark-card shadow-xl transition-all duration-500 hover:border-chili-500/50">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/street-style.jpg"
                  alt="Urban street style weather calibrated"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-chili-400 mb-1">
                  <span>Weather-Driven</span>
                  <span>14°C Crisp Chill</span>
                </div>
                <h4 className="font-display text-sm font-bold text-white">
                  Dynamic Layering Engine
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
