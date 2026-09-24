import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { PhoneDemo } from '@/components/sections/PhoneDemo';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { StyleSurveyPreview } from '@/components/sections/StyleSurveyPreview';
import { DownloadSection } from '@/components/sections/Download';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg selection:bg-chili-500 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <PhoneDemo />
      <HowItWorks />
      <StyleSurveyPreview />
      <DownloadSection />
      <Footer />
    </main>
  );
}
