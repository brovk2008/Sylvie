'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Sparkles, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-32 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Sylvie"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-spice-parchment/80">
          <Link href="/lookbook" className="hover:text-chili-400 transition-colors flex items-center gap-1.5 py-1">
            <Sparkles className="w-3 h-3 text-spice-gold" />
            <span>Lookbook</span>
          </Link>
          <Link href="/science" className="hover:text-chili-400 transition-colors py-1">
            Science
          </Link>
          <Link href="/#features" className="hover:text-chili-400 transition-colors py-1">
            Features
          </Link>
          <Link href="/#demo" className="hover:text-chili-400 transition-colors py-1">
            Walkthrough
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-mono uppercase tracking-wider text-spice-parchment hover:text-white px-3 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/download"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-chili hover:shadow-chili-lg hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get APK</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-spice-parchment hover:text-chili-400"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-dark-border mt-3 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <Link
            href="/lookbook"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-mono uppercase text-spice-parchment hover:text-chili-400 py-1 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-spice-gold" />
            <span>Editorial Lookbook</span>
          </Link>
          <Link
            href="/science"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-mono uppercase text-spice-parchment hover:text-chili-400 py-1"
          >
            Science & Ontology
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-mono uppercase text-spice-parchment hover:text-chili-400 py-1"
          >
            Features
          </Link>
          <Link
            href="/#demo"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-mono uppercase text-spice-parchment hover:text-chili-400 py-1"
          >
            Interactive Walkthrough
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-mono uppercase text-spice-parchment hover:text-chili-400 py-1"
          >
            Sign In to Sylvie Studio
          </Link>
          <Link
            href="/download"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-chili-500 text-white font-mono text-xs uppercase tracking-wider shadow-chili mt-2"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </Link>
        </div>
      )}
    </nav>
  );
};
