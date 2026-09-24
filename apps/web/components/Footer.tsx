'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-16 text-spice-parchment/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="relative h-10 w-32 mb-4">
              <Image
                src="/logo.png"
                alt="Sylvie"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="font-display text-lg text-white mb-2">
              Your wardrobe. Your rules.
            </p>
            <p className="text-sm text-spice-parchment/60 max-w-sm leading-relaxed">
              A personal fashion intelligence system calibrated to what you physically own, your body silhouette, and your local weather.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-chili-400 transition-colors">
                  Fashion Vision AI
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-chili-400 transition-colors">
                  Digital Almirah
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-chili-400 transition-colors">
                  Style Psychology Game
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-chili-400 transition-colors">
                  Android APK Build
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture / Docs */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-spice-parchment/60">YOLOv8 + Florence-2</span>
              </li>
              <li>
                <span className="text-spice-parchment/60">FashionCLIP + Qdrant</span>
              </li>
              <li>
                <span className="text-spice-parchment/60">ISO 7730 CLO Model</span>
              </li>
              <li>
                <span className="text-spice-parchment/60">40-Swatch Tone Matrix</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-spice-parchment/50">
          <p>© {new Date().getFullYear()} Sylvie Fashion Systems. All rights reserved.</p>
          <p className="text-chili-400/80">
            🌶️ Built for style. Powered by intelligence. Named Sylvie.
          </p>
        </div>
      </div>
    </footer>
  );
};
