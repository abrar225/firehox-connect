import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FireHox Connect',
  description: 'Generative Vector Video Communication — Ultra-low bandwidth video calls powered by AI facial landmark streaming.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter bg-fh-bg-primary text-fh-text-primary min-h-screen antialiased">
        {/* MediaPipe loaded from CDN to avoid webpack WASM bundling issues */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
