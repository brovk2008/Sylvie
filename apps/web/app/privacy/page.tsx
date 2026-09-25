'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, EyeOff, Lock, Server, CheckCircle2, UserCheck, Smartphone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-spice-parchment selection:bg-chili-500 selection:text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-36 pb-24">
        {/* Header */}
        <div className="mb-12 border-b border-dark-border/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium uppercase tracking-wider mb-4 border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy & Biometrics Protection</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs sm:text-sm font-mono text-spice-parchment/60 mt-3">
            Last Updated: September 25, 2026 &middot; Compliant with GDPR, CCPA, and DPDP
          </p>
        </div>

        {/* 3 Privacy Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl glass-panel border border-dark-border">
            <EyeOff className="w-6 h-6 text-chili-400 mb-2" />
            <h4 className="font-display text-base font-bold text-white mb-1">Zero Commercial Sale</h4>
            <p className="text-xs text-spice-parchment/70 font-light leading-relaxed">
              We never sell, rent, or monetize your wardrobe snapshots or facial calibration scans to third-party brands.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-dark-border">
            <Shield className="w-6 h-6 text-spice-gold mb-2" />
            <h4 className="font-display text-base font-bold text-white mb-1">On-Device Feature Extraction</h4>
            <p className="text-xs text-spice-parchment/70 font-light leading-relaxed">
              Whenever supported, neural feature embeddings are generated on-device, minimizing raw media exposure.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-dark-border">
            <Server className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-display text-base font-bold text-white mb-1">Isolated Neon Encryption</h4>
            <p className="text-xs text-spice-parchment/70 font-light leading-relaxed">
              All clothing metadata and logs are secured with AES-256 encryption in isolated tenant partitions.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-spice-parchment/80 font-light">
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">01.</span> Information We Collect
            </h2>
            <p className="mb-3">
              To operate as your personal fashion intelligence system, Sylvie collects and processes specific data categories:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
              <li>
                <strong className="text-white">Wardrobe Imagery:</strong> Photos of clothing garments uploaded via the app camera or gallery to construct your Digital Almirah.
              </li>
              <li>
                <strong className="text-white">Skin Tone & Silhouette Telemetry:</strong> Optional calibration selfies to derive CIELAB hex swatches against the 40-Tone Fitzpatrick/Monk Scale. Raw face photos are converted into mathematical coordinates and discarded from persistent storage upon request.
              </li>
              <li>
                <strong className="text-white">Environmental Coordinates:</strong> Coarse latitude/longitude (city-level precision) to fetch live temperature, precipitation probability, and wind velocity from weather APIs.
              </li>
              <li>
                <strong className="text-white">Wear History:</strong> Timestamps of outfits worn to optimize laundry cycles and prevent duplicate outfits.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">02.</span> How We Process Your Visual Media
            </h2>
            <p className="mb-3">
              When an image is submitted:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-xs sm:text-sm">
              <li>The image is sent via an encrypted TLS 1.3 tunnel to our serverless vision microservice (<code className="text-xs font-mono text-chili-300">sylvie-9vch.onrender.com</code>).</li>
              <li>YOLOv8 detects garment boundaries; Florence-2 extracts textual and textural ontology dimensions.</li>
              <li>The clothing item is transformed into a 512-dimensional vector embedding and indexed in Qdrant.</li>
              <li>The structured record is saved in Neon PostgreSQL under your private user ID.</li>
            </ol>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">03.</span> Android Permissions & Hardware Access
            </h2>
            <p className="mb-3">
              The Sylvie Android application requests the minimum necessary permissions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
              <li><code className="text-xs font-mono text-spice-gold">CAMERA</code>: Used strictly within the app to take snapshots of clothing items for addition to the almirah.</li>
              <li><code className="text-xs font-mono text-spice-gold">READ_EXTERNAL_STORAGE</code>: Used solely to select existing garment photos from your gallery.</li>
              <li>Sylvie does not run background camera monitors, keyloggers, or unauthorized audio listeners.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">04.</span> Your Rights & Permanent Deletion
            </h2>
            <p className="mb-3">
              Under international privacy frameworks (GDPR Article 17, CCPA Right to Delete), you hold complete control over your records. You may export your entire wardrobe graph as a JSON archive or trigger an instant, irreversible deletion of all items, vectors, and wear logs from our servers.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">05.</span> Contact Privacy Officer
            </h2>
            <p>
              For data protection questions, compliance audits, or data export requests, please contact our Data Protection Officer at <span className="text-chili-400 font-mono">privacy@sylvie.fashion</span>.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-dark-border/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <Link href="/terms" className="text-spice-gold hover:text-white transition-colors flex items-center gap-1.5">
            View Terms of Service &rarr;
          </Link>
          <Link href="/" className="text-spice-parchment/60 hover:text-white transition-colors">
            Return to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
