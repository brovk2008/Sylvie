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
              Explore Sylvie
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/lookbook" className="hover:text-chili-400 transition-colors">
                  Haute Lookbook
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-chili-400 transition-colors">
                  Computational Fashion Science
                </Link>
              </li>
              <li>
                <Link href="/#demo" className="hover:text-chili-400 transition-colors">
                  Digital Almirah Walkthrough
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-chili-400 transition-colors">
                  Sylvie Studio Sign In
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-chili-400 transition-colors text-spice-gold flex items-center gap-1">
                  <span>Android APK Portal</span> &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/terms" className="hover:text-chili-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-chili-400 transition-colors">
                  Privacy & Biometric Policy
                </Link>
              </li>
              <li>
                <span className="text-spice-parchment/50">Zero Photo Monetization</span>
              </li>
              <li>
                <span className="text-spice-parchment/50">Neon AES-256 Storage</span>
              </li>
              <li>
                <span className="text-emerald-400">API: sylvie-9vch.onrender.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-spice-parchment/50">
          <p>© {new Date().getFullYear()} Sylvie Fashion Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>&middot;</span>
            <Link href="/download" className="hover:text-white transition-colors">Download APK</Link>
          </div>
          <p className="text-chili-400/90 font-medium">
            🌶️ Chili Spice Haute Couture Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};
