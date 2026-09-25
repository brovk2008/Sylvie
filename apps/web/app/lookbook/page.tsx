'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sparkles, Layers, Thermometer, Palette, CheckCircle2, ArrowRight, X, Eye, SlidersHorizontal } from 'lucide-react';

interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'gala' | 'indo-western' | 'streetwear' | 'capsule';
  image: string;
  dimensions: {
    silhouette: string;
    fabric: string;
    cloRating: number;
    suitableTemp: string;
    undertone: string;
    formality: string;
    hslHarmony: string[];
    aiConfidence: number;
  };
  editorialNote: string;
}

const LOOKBOOK_COLLECTION: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'The Velvet Revolution',
    subtitle: 'Haute Couture Evening Gala Gown',
    category: 'gala',
    image: '/images/gala-editorial.jpg',
    dimensions: {
      silhouette: 'Draped Column / Sculpted Bodice',
      fabric: 'Mulberry Silk Velvet (420 GSM) & Gold Bullion Brocade',
      cloRating: 1.15,
      suitableTemp: '14°C - 20°C',
      undertone: 'Warm Golden & Olive Undertones (Monk 4-7)',
      formality: 'Black Tie / Red Carpet / Gala',
      hslHarmony: ['#FF2819', '#E5B842', '#120605', '#FDFBF7'],
      aiConfidence: 99.2,
    },
    editorialNote: 'Sculpted Chiaroscuro draping captures light along the bias grain. Designed for high-formality nocturnal affairs with thermal comfort balanced via breathable natural silk weave.',
  },
  {
    id: 'look-2',
    title: 'Royal Zardozi Reimagined',
    subtitle: 'Indo-Western Couture Sherwani Fusion',
    category: 'indo-western',
    image: '/images/indo-western-couture.jpg',
    dimensions: {
      silhouette: 'Structured Achkan Jacket / Asymmetric Kurta',
      fabric: 'Raw Matka Silk with Handcrafted Antique Zari',
      cloRating: 1.45,
      suitableTemp: '12°C - 22°C',
      undertone: 'Rich Warm & Deep Amber (Fitzpatrick IV-VI)',
      formality: 'Sangeet / Royal Wedding / Reception',
      hslHarmony: ['#B81407', '#E5B842', '#080404', '#FF8C38'],
      aiConfidence: 98.7,
    },
    editorialNote: 'A seamless fusion of classical Mughal architectural embroidery and sharp Savile Row tailoring. Calibrated for grand celebratory evenings.',
  },
  {
    id: 'look-3',
    title: 'Parisian Nocturne',
    subtitle: 'Architectural Runway Statement',
    category: 'gala',
    image: '/images/runway-couture.jpg',
    dimensions: {
      silhouette: 'Hourglass Structured / Sharp Shoulder',
      fabric: 'Super 150s Merino Wool & Satin Lapel',
      cloRating: 0.95,
      suitableTemp: '16°C - 24°C',
      undertone: 'Cool Neutral & Alabaster (Fitzpatrick I-III)',
      formality: 'High Fashion / Gallery Premiere',
      hslHarmony: ['#080404', '#FF2819', '#F5EBE1', '#381613'],
      aiConfidence: 97.8,
    },
    editorialNote: 'A dramatic study in proportions. Minimalist structural lines meet electric chili crimson edge tracing, generating high optical impact under runway spotlights.',
  },
  {
    id: 'look-4',
    title: 'The Curated Dressing Suite',
    subtitle: 'Modular Capsule Almirah',
    category: 'capsule',
    image: '/images/wardrobe-suite.jpg',
    dimensions: {
      silhouette: 'Cohesive Multi-Garment Wardrobe Graph',
      fabric: 'Fine Cashmere, Egyptian Cotton, Calfskin Nappa',
      cloRating: 0.65,
      suitableTemp: 'Year-Round Adaptable',
      undertone: 'Omni-Harmonic 40-Tone Calibration',
      formality: 'Dynamic Day-to-Night Spectrum',
      hslHarmony: ['#E5B842', '#FF2819', '#1C0B09', '#FDFBF7'],
      aiConfidence: 99.8,
    },
    editorialNote: 'The physical manifestation of Sylvie’s digital almirah: every garment mapped into an interconnected wardrobe graph where each top matches at least 3 bottoms.',
  },
  {
    id: 'look-5',
    title: 'The Autumn Chili Flatlay',
    subtitle: 'Minimalist Essential Ensemble',
    category: 'capsule',
    image: '/images/capsule-flatlay.jpg',
    dimensions: {
      silhouette: 'Relaxed Tailored Smart Casual',
      fabric: 'Organic Cotton Twill & Merino Knitwear',
      cloRating: 0.85,
      suitableTemp: '15°C - 22°C',
      undertone: 'Warm Peach & Golden undertones',
      formality: 'Smart Casual / Creative Studio',
      hslHarmony: ['#FF5E1E', '#F5EBE1', '#120504', '#E5B842'],
      aiConfidence: 96.5,
    },
    editorialNote: 'Effortless tactile luxury. Styled using Sylvie’s triad harmony engine to juxtapose earthy paprika tones with structured dark mahogany obsidian.',
  },
  {
    id: 'look-6',
    title: 'Milanese Cyber-Luxe',
    subtitle: 'Contemporary High-Contrast Streetwear',
    category: 'streetwear',
    image: '/images/street-style.jpg',
    dimensions: {
      silhouette: 'Oversized Sculptural Bomber & Tapered Pleats',
      fabric: 'Treated Weatherproof Cordura & Japanese Denim',
      cloRating: 1.10,
      suitableTemp: '10°C - 18°C with Wind Chill',
      undertone: 'Universal High-Contrast (Cool / Olive)',
      formality: 'Avant-Garde Streetwear',
      hslHarmony: ['#FF2819', '#1C0B09', '#C49E99', '#FDFBF7'],
      aiConfidence: 98.1,
    },
    editorialNote: 'Designed for urban speed and unpredictable microclimates. Features weather-resistant outer shells paired with micro-breathable inner warmth.',
  },
];

export default function LookbookPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gala' | 'indo-western' | 'streetwear' | 'capsule'>('all');
  const [activeItem, setActiveItem] = useState<LookbookItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? LOOKBOOK_COLLECTION
    : LOOKBOOK_COLLECTION.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark-bg text-spice-parchment selection:bg-chili-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6 sm:px-8 border-b border-dark-border/60 overflow-hidden bg-radial-hero">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-chili-500/30 text-chili-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-spice-gold" />
              <span>Haute Couture Collection 2026</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              The Sylvie Lookbook
            </h1>
            <p className="text-base sm:text-xl text-spice-parchment/70 max-w-3xl mx-auto font-light leading-relaxed">
              Where computational fashion ontology meets Parisian runway elegance. Explore curated ensembles decomposed across 37 dimensions of drape, silhouette, and thermal harmony.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'gala', label: 'Evening Gala & Runway' },
              { id: 'indo-western', label: 'Indo-Western Fusion' },
              { id: 'capsule', label: 'Capsule Wardrobe' },
              { id: 'streetwear', label: 'Cyber-Luxe Streetwear' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                  selectedCategory === tab.id
                    ? 'bg-chili-500 text-white shadow-chili scale-105'
                    : 'glass-panel text-spice-parchment/70 hover:text-white hover:border-chili-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Grid */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveItem(item)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden glass-panel border border-dark-border hover:border-chili-500/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-chili"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-dark-surface">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-dark-bg/80 text-spice-gold border border-spice-gold/30 backdrop-blur-md">
                      {item.dimensions.cloRating} CLO &middot; {item.dimensions.suitableTemp}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-chili-500/90 text-white font-bold backdrop-blur-md">
                      {item.dimensions.aiConfidence}% AI Score
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-chili-400 font-semibold">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1 group-hover:text-chili-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {item.dimensions.hslHarmony.map((hex, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                      <span className="ml-auto text-xs font-mono text-spice-parchment/60 flex items-center gap-1 group-hover:text-white">
                        Inspect <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Detail Modal / Drawer */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-chili-500/40 p-6 sm:p-10 shadow-2xl bg-dark-surface/95"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-dark-elevated text-spice-parchment hover:text-white hover:bg-chili-500 transition-all"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Modal Image */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-dark-border">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Modal Specs */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chili-500/20 text-chili-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    {activeItem.subtitle}
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                    {activeItem.title}
                  </h2>
                  <p className="text-sm text-spice-parchment/80 leading-relaxed mb-6 font-light">
                    {activeItem.editorialNote}
                  </p>

                  {/* 37-Dimension Specs Matrix */}
                  <div className="space-y-3 font-mono text-xs border-t border-b border-dark-border py-4 my-4">
                    <div className="flex justify-between py-1 border-b border-dark-border/40">
                      <span className="text-spice-parchment/60 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-chili-400" /> Silhouette
                      </span>
                      <span className="text-white font-medium">{activeItem.dimensions.silhouette}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-dark-border/40">
                      <span className="text-spice-parchment/60 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-spice-gold" /> Fabric Physics
                      </span>
                      <span className="text-white font-medium">{activeItem.dimensions.fabric}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-dark-border/40">
                      <span className="text-spice-parchment/60 flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-emerald-400" /> ISO 7730 CLO Rating
                      </span>
                      <span className="text-emerald-400 font-bold">{activeItem.dimensions.cloRating} CLO ({activeItem.dimensions.suitableTemp})</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-dark-border/40">
                      <span className="text-spice-parchment/60 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-chili-400" /> Recommended Skin Tone
                      </span>
                      <span className="text-spice-parchment font-medium">{activeItem.dimensions.undertone}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-spice-parchment/60 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-spice-gold" /> Formality Level
                      </span>
                      <span className="text-white font-medium">{activeItem.dimensions.formality}</span>
                    </div>
                  </div>

                  {/* Chromatic Palette */}
                  <div className="mt-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-spice-parchment/70 block mb-2">
                      Harmonic Palette Extraction
                    </span>
                    <div className="flex items-center gap-3">
                      {activeItem.dimensions.hslHarmony.map((hex, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="w-9 h-9 rounded-xl border border-white/20 shadow-md"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-[10px] font-mono text-spice-parchment/60">{hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-8 flex gap-4">
                    <Link
                      href="/download"
                      className="flex-1 py-3 px-6 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-medium text-sm text-center shadow-chili transition-all hover:scale-105"
                    >
                      Digitize Your Look in Sylvie
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
