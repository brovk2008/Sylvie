'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleInstantGuest = () => {
    setLoading(true);
    setTimeout(() => {
      // Set local storage session
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'sylvie_auth_session',
          JSON.stringify({
            userId: 'usr_guest_demo',
            name: 'Haute Guest',
            email: 'guest@sylvie.fashion',
            authenticatedAt: new Date().toISOString(),
          })
        );
      }
      setSuccessMsg('Session activated. Redirecting to Sylvie Studio...');
      setTimeout(() => {
        router.push('/lookbook');
      }, 800);
    }, 600);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'sylvie_auth_session',
          JSON.stringify({
            userId: `usr_${Date.now()}`,
            name: email.split('@')[0],
            email: email,
            authenticatedAt: new Date().toISOString(),
          })
        );
      }
      setSuccessMsg(`Welcome, ${email.split('@')[0]}! Redirecting...`);
      setTimeout(() => {
        router.push('/lookbook');
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-spice-parchment selection:bg-chili-500 selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 pt-32 pb-20 relative overflow-hidden bg-radial-hero">
        <div className="w-full max-w-md relative z-10">
          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl glass-panel p-8 sm:p-10 border border-chili-500/30 shadow-chili-lg"
          >
            {/* Logo & Headline */}
            <div className="text-center mb-8">
              <div className="relative h-12 w-36 mx-auto mb-4">
                <Image
                  src="/logo.png"
                  alt="Sylvie"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Access Sylvie Studio
              </h1>
              <p className="text-xs sm:text-sm text-spice-parchment/70 mt-1 font-light">
                Sign in to sync your Digital Almirah across mobile & web.
              </p>
            </div>

            {successMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : null}

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-spice-parchment/70 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-spice-parchment/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="couture@domain.com"
                    className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-dark-surface/90 border border-dark-border text-sm text-white placeholder-spice-parchment/30 focus:outline-none focus:border-chili-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-chili-500 hover:bg-chili-600 active:scale-95 text-white font-medium text-sm shadow-chili transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In with Email'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <span className="relative px-3 text-[11px] font-mono uppercase bg-dark-surface text-spice-parchment/50">
                Or Instant Access
              </span>
            </div>

            {/* Guest Demo Instant Login */}
            <button
              onClick={handleInstantGuest}
              disabled={loading}
              className="w-full py-3 px-6 rounded-full glass-panel hover:bg-dark-elevated border border-spice-gold/30 hover:border-spice-gold/60 text-spice-gold font-mono text-xs transition-all flex items-center justify-center gap-2 mb-4 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-spice-gold group-hover:rotate-12 transition-transform" />
              <span>Launch Instant Guest Styling Session &rarr;</span>
            </button>

            {/* Android App Link */}
            <div className="pt-4 border-t border-dark-border/60 text-center">
              <Link
                href="/download"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-chili-400 hover:text-chili-300 transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Prefer the Native App? Download APK</span>
              </Link>
            </div>
          </motion.div>

          {/* Privacy Note */}
          <p className="text-center text-[11px] text-spice-parchment/50 font-mono mt-6">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-white">Terms</Link> and{' '}
            <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
