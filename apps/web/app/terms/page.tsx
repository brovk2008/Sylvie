'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Scale, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-spice-parchment selection:bg-chili-500 selection:text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-36 pb-24">
        {/* Header */}
        <div className="mb-12 border-b border-dark-border/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chili-500/10 text-chili-400 text-xs font-mono font-medium uppercase tracking-wider mb-4 border border-chili-500/20">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm font-mono text-spice-parchment/60 mt-3">
            Effective Date: September 25, 2026 &middot; Version 2.4.0 (Global Enterprise)
          </p>
        </div>

        {/* Executive Summary Box */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-chili-500/30 mb-12 bg-dark-surface/60">
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-spice-gold" />
            Our Core Promise to You
          </h3>
          <p className="text-xs sm:text-sm text-spice-parchment/80 leading-relaxed font-light">
            Sylvie is engineered for individual personal styling. You retain 100% intellectual ownership of all photographs of yourself and your clothing uploaded to the platform. Sylvie never sells, advertises, or commercially licenses your wardrobe imagery.
          </p>
        </div>

        {/* Full Terms Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-spice-parchment/80 font-light">
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">01.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing, downloading, or using the Sylvie application (available via native Android APK, iOS, or web interfaces at <code className="text-xs font-mono text-chili-300">sylvie-9vch.onrender.com</code>), you enter into a legally binding agreement with Sylvie Fashion Intelligence Systems Inc. (&ldquo;Sylvie&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). If you do not agree to these terms, you must refrain from using the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">02.</span> Wardrobe Ownership & Intellectual Property
            </h2>
            <p className="mb-3">
              When you capture, digitize, or store clothing items within your Sylvie Digital Almirah:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
              <li>
                <strong className="text-white">User Ownership:</strong> You retain complete ownership, copyright, and all associated rights in any photographs, selfies, or scans you upload.
              </li>
              <li>
                <strong className="text-white">Limited Processing License:</strong> You grant Sylvie an exclusive, revocable, non-transferable license solely to process your images through our computer vision pipeline (YOLOv8, Florence-2, and FashionCLIP) to extract garment taxonomy dimensions and generate outfit recommendations.
              </li>
              <li>
                <strong className="text-white">No Exploitation:</strong> Your images are never used to train public foundation models without your explicit opt-in, nor will they ever be sold to third-party fashion brands or data aggregators.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">03.</span> Nature of AI Recommendations & Disclaimers
            </h2>
            <p className="mb-3">
              Sylvie utilizes machine learning algorithms, ISO 7730 mathematical thermodynamic comfort models, and CIELAB color harmony equations to formulate outfit suggestions.
            </p>
            <p>
              While Sylvie aims for computational aesthetic harmony and meteorological comfort, all suggestions are advisory. Sylvie is not liable for personal discomfort, local dress code discrepancies, or weather variations that diverge from public meteorological feeds.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">04.</span> Account Security & Mobile APK Sideloading
            </h2>
            <p className="mb-3">
              Users downloading the Sylvie Android APK directly from official repositories or GitHub Releases verify that the APK package matches the published SHA-256 checksum. Users are responsible for maintaining the confidentiality of their authentication credentials and device security.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">05.</span> Data Deletion & Termination
            </h2>
            <p className="mb-3">
              You may terminate your Sylvie account at any time via the Mobile App Profile Settings or by submitting an automated deletion request. Upon termination, all wardrobe items, feature embeddings, and skin tone telemetry stored in our Neon PostgreSQL databases are purged in compliance with global right-to-be-forgotten standards.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-chili-400 font-mono text-base">06.</span> Contact & Legal Notice
            </h2>
            <p>
              For legal inquiries, intellectual property notices, or compliance verifications, please reach out to our legal department at <span className="text-chili-400 font-mono">legal@sylvie.fashion</span> or through our registered GitHub repository repository portal.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-dark-border/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <Link href="/privacy" className="text-spice-gold hover:text-white transition-colors flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> View Privacy Policy &rarr;
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
