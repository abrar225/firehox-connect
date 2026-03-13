import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Document 4 — Color System
        'fh-bg-primary': '#0B0F14',
        'fh-bg-secondary': '#111827',
        'fh-surface': '#1F2937',
        'fh-border': '#2D3748',
        'fh-accent': '#6366F1',
        'fh-accent-hover': '#4F46E5',
        'fh-success': '#22C55E',
        'fh-warning': '#F59E0B',
        'fh-error': '#EF4444',
        'fh-text-primary': '#F9FAFB',
        'fh-text-secondary': '#9CA3AF',
        'fh-text-muted': '#6B7280',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'fh-h1': ['40px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-h2': ['32px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-h3': ['24px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-h4': ['20px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-body': ['16px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-small': ['14px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'fh-micro': ['12px', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        'fh-btn': '10px',
        'fh-input': '8px',
        'fh-tile': '12px',
        'fh-control': '16px',
      },
      boxShadow: {
        'fh-tile': '0px 10px 30px rgba(0,0,0,0.4)',
      },
      maxWidth: {
        'fh-content': '1440px',
      },
      screens: {
        'mobile': '768px',
        'desktop': '1280px',
        'ultrawide': '1600px',
      },
      transitionDuration: {
        'fh-default': '150ms',
        'fh-hover': '100ms',
        'fh-layout': '250ms',
      },
    },
  },
  plugins: [],
};

export default config;
