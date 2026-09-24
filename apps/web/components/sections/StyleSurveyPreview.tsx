'use client';

import React, { useState } from 'react';
import { Search, Check, Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_STYLE_CARDS, STYLE_EXPANSION_MAP } from '@sylvie/fashion-ontology';

export const StyleSurveyPreview = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['streetwear', 'minimalist']);
  const [searchQuery, setSearchQuery] = useState('');
  const [burstId, setBurstId] = useState<string | null>(null);

  const toggleStyle = (id: string) => {
    setBurstId(id);
    setTimeout(() => setBurstId(null), 500);

    setSelectedStyles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Compute recommended expansion styles from selected
  const expandedRecommendations = Array.from(
    new Set(selectedStyles.flatMap((id) => STYLE_EXPANSION_MAP[id] || []))
  ).filter((id) => !selectedStyles.includes(id)).slice(0, 5);

  const filteredCards = INITIAL_STYLE_CARDS.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="quiz" className="py-24 bg-dark-surface/40 border-y border-dark-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400">
            Psychological Style Engine
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Test the Style Discovery Game
          </h2>
          <p className="text-spice-parchment/70 text-base sm:text-lg">
            Sylvie learns what you love before you even upload a garment. Select 3 or more aesthetics below to see your AI style vector adapt in real-time.
          </p>
        </div>

        {/* Interactive Survey Container */}
        <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-dark-border">
          {/* Top Bar: Search + Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-dark-border mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-spice-parchment/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles (e.g., Streetwear, Quiet Luxury)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-dark-bg border border-dark-border text-sm text-white placeholder-spice-parchment/40 focus:outline-none focus:border-chili-500"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-sm font-mono">
              <span className="px-3 py-1 rounded-full bg-dark-bg border border-dark-border text-spice-gold font-bold">
                {selectedStyles.length} Styles Selected
              </span>
              <button
                onClick={() => setSelectedStyles([])}
                className="text-xs text-spice-parchment/60 hover:text-chili-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {/* Style Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {filteredCards.map((card) => {
              const isSelected = selectedStyles.includes(card.id);
              const isBursting = burstId === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => toggleStyle(card.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border select-none flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? 'bg-dark-elevated border-chili-500 shadow-chili scale-[1.02]'
                      : 'bg-dark-surface/90 border-dark-border hover:border-chili-800 hover:scale-[1.01]'
                  } ${isBursting ? 'ring-4 ring-chili-500/50 scale-105' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-spice-parchment/60 uppercase">
                        {card.category}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected ? 'bg-chili-500 text-white' : 'border border-dark-border bg-dark-bg'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <h4 className="font-display text-base font-bold text-white mb-1">
                      {card.name}
                    </h4>

                    <p className="text-[11px] text-spice-parchment/70 leading-snug line-clamp-2">
                      {card.tagline}
                    </p>
                  </div>

                  {/* Palette preview pills */}
                  <div className="flex gap-1 mt-3">
                    {card.palette.map((color, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/30"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Expansion Engine Notification */}
          {expandedRecommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-dark-bg/80 border border-chili-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-spice-gold shrink-0" />
                <span className="text-xs font-mono text-spice-parchment/80">
                  AI Auto-Expansion detected related sub-genres:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {expandedRecommendations.map((subId) => (
                  <span
                    key={subId}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-dark-surface border border-chili-700/40 text-chili-300 capitalize"
                  >
                    + {subId.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
