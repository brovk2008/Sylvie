import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { EditorialLookbook } from '@/components/sections/EditorialLookbook';
import { ChromaticSpectrum } from '@/components/sections/ChromaticSpectrum';
import { Features } from '@/components/sections/Features';
import { PhoneDemo } from '@/components/sections/PhoneDemo';
import { MasterOntologySection } from '@/components/sections/MasterOntologySection';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { StyleSurveyPreview } from '@/components/sections/StyleSurveyPreview';
import { DownloadSection } from '@/components/sections/Download';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg selection:bg-chili-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <EditorialLookbook />
      <ChromaticSpectrum />
      <Features />
      <PhoneDemo />
      <MasterOntologySection />
      <HowItWorks />
      <StyleSurveyPreview />
      <DownloadSection />
      <Footer />
    </main>
  );
}
