'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function ExitPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-grid relative overflow-hidden">
      {/* Background glow */}
      <div className="hero-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />

      <div className="relative z-10 text-center animate-slide-up">
        {/* Animated check icon */}
        <div className="w-20 h-20 rounded-full bg-fh-success/10 border border-fh-success/20 
                        flex items-center justify-center mx-auto mb-8 animate-float">
          <CheckCircle className="w-10 h-10 text-fh-success" />
        </div>

        <h1 className="text-fh-h2 font-bold mb-3">Meeting Ended</h1>
        <p className="text-fh-text-secondary text-fh-body mb-2">
          Thank you for using FireHox Connect.
        </p>
        <p className="text-fh-text-muted text-fh-small mb-10">
          Your session has been securely closed. All connections have been cleaned up.
        </p>

        <button
          id="btn-return-home"
          onClick={() => router.push('/')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </button>
      </div>
    </main>
  );
}
