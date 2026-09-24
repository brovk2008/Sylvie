'use client';

import React from 'react';
import { Download, QrCode, Smartphone, ShieldCheck, AlertCircle, ExternalLink, Activity } from 'lucide-react';

const GITHUB_RELEASE_APK = 'https://github.com/brovk2008/Sylvie/releases/latest/download/sylvie.apk';
const LOCAL_APK = '/sylvie.apk';

export const DownloadSection = () => {
  return (
    <section id="download" className="py-28 bg-gradient-to-b from-dark-bg via-[#1F0C0A] to-dark-bg relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-chili-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-chili-400">
          Get Started Today
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Install Sylvie on your Android device
        </h2>
        <p className="text-spice-parchment/70 text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Experience AI styling on real hardware. Download the standalone APK directly or scan the QR code to install.
        </p>

        {/* Download Card Container */}
        <div className="max-w-2xl mx-auto rounded-3xl glass-panel p-8 sm:p-10 border border-chili-700/60 shadow-chili-lg">
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
            {/* Left: APK Specs & Button */}
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-chili-500/20 text-chili-400">
                  <Smartphone className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono text-spice-parchment/70 uppercase">
                  Production Build v1.0.0
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Sylvie for Android
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-spice-parchment/60 mb-6">
                <span>Universal APK</span>
                <span>•</span>
                <span>Android 8.0+</span>
                <span>•</span>
                <span className="text-spice-gold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={LOCAL_APK}
                  download="sylvie-v1.0.0.apk"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 px-8 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-bold text-base transition-all duration-300 shadow-chili hover:scale-105 active:scale-95 group"
                >
                  <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                  <span>Direct Download APK</span>
                </a>

                <a
                  href={GITHUB_RELEASE_APK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-full bg-dark-surface hover:bg-dark-elevated border border-dark-border hover:border-chili-700/70 text-xs font-mono text-spice-parchment/80 transition-all hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-chili-400" />
                  <span>GitHub Releases Mirror (Latest CI Build)</span>
                </a>
              </div>
            </div>

            {/* Right: SVG QR Code */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-dark-bg shrink-0 shadow-lg">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Clean stylized SVG QR code */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-32 h-32"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner markers */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0E0504" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" rx="1" fill="#E83B2E" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0E0504" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" rx="1" fill="#E83B2E" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0E0504" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" rx="1" fill="#E83B2E" />

                  {/* QR Data modules */}
                  <rect x="36" y="8" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="46" y="8" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="56" y="8" width="6" height="6" rx="1" fill="#0E0504" />

                  <rect x="8" y="36" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="20" y="44" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="24" y="54" width="6" height="6" rx="1" fill="#0E0504" />

                  {/* Center pattern */}
                  <rect x="38" y="38" width="24" height="24" rx="4" fill="#0E0504" />
                  <circle cx="50" cy="50" r="6" fill="#E83B2E" />

                  <rect x="68" y="36" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="76" y="44" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="86" y="52" width="6" height="6" rx="1" fill="#0E0504" />

                  <rect x="36" y="74" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="46" y="82" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="56" y="74" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="66" y="82" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="76" y="74" width="6" height="6" rx="1" fill="#0E0504" />
                  <rect x="86" y="82" width="6" height="6" rx="1" fill="#0E0504" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-dark-bg/80 font-bold mt-1 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-chili-500" /> Scan to install
              </span>
            </div>
          </div>

          {/* Live System Indicator */}
          <div className="mt-8 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-spice-parchment/70 bg-dark-bg/60 p-4 rounded-2xl border">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Backend API Live (sylvie-9vch.onrender.com)</span>
            </div>
            <div className="flex items-center gap-2 text-chili-300">
              <Activity className="w-3.5 h-3.5 text-chili-400" />
              <span>Neon Postgres &middot; Ohio (AWS US East 2)</span>
            </div>
          </div>

          {/* Android Side-load Tip */}
          <div className="mt-4 text-left flex items-start gap-3 text-xs text-spice-parchment/60 p-2">
            <AlertCircle className="w-4 h-4 text-spice-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">First time installing an APK?</p>
              <p className="mt-0.5">
                When prompted by Android, tap <strong>Settings</strong> &rarr; enable <strong>&ldquo;Allow from this source&rdquo;</strong> to complete installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
