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
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-spice-parchment/80">
          <a href="#features" className="hover:text-chili-400 transition-colors">
            Features
          </a>
          <a href="#demo" className="hover:text-chili-400 transition-colors">
            Interactive Walkthrough
          </a>
          <a href="#quiz" className="hover:text-chili-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-spice-gold" />
            Style Game
          </a>
          <a href="#how-it-works" className="hover:text-chili-400 transition-colors">
            How It Works
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#download"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-chili-500 hover:bg-chili-600 text-white font-medium text-sm transition-all duration-300 shadow-chili hover:shadow-chili-lg hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Get APK</span>
          </a>
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
          <a
            href="#features"
            onClick={() => setMobileOpen(false)}
            className="text-base text-spice-parchment hover:text-chili-400 py-1"
          >
            Features
          </a>
          <a
            href="#demo"
            onClick={() => setMobileOpen(false)}
            className="text-base text-spice-parchment hover:text-chili-400 py-1"
          >
            Interactive Walkthrough
          </a>
          <a
            href="#quiz"
            onClick={() => setMobileOpen(false)}
            className="text-base text-spice-parchment hover:text-chili-400 py-1 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-spice-gold" />
            Style Game
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="text-base text-spice-parchment hover:text-chili-400 py-1"
          >
            How It Works
          </a>
          <a
            href="#download"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-chili-500 text-white font-medium text-sm shadow-chili mt-2"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </a>
        </div>
      )}
    </nav>
  );
};
