import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Sylvie 🌶️ — Your AI-Powered Personal Stylist',
  description: 'Sylvie digitizes your physical wardrobe into an intelligent stylist. Weather-aware, occasion-perfect, and color-harmonious outfit recommendations calibrated exclusively to what you actually own.',
  keywords: ['personal stylist', 'wardrobe AI', 'outfit generator', 'fashion tech', 'CLO weather dressing', 'color harmony'],
  openGraph: {
    title: 'Sylvie 🌶️ — Your AI-Powered Personal Stylist',
    description: 'Your physical wardrobe, digitized and styled by multimodal AI.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0E0504" />
      </head>
      <body className="min-h-screen bg-dark-bg text-spice-cream antialiased selection:bg-chili-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
