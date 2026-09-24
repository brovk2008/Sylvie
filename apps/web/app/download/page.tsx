import React from 'react';
import { Navbar } from '@/components/Navbar';
import { DownloadSection } from '@/components/sections/Download';
import { Footer } from '@/components/Footer';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-dark-bg pt-20">
      <Navbar />
      <DownloadSection />
      <Footer />
    </main>
  );
}
