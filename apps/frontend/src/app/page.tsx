'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Video, Zap, Shield, Gauge, LogIn, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function LandingPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const handleCreateMeeting = async () => {
    if (!user) return;
    setError('');
    const signalingUrl = process.env.NEXT_PUBLIC_SIGNALING_URL || 'http://localhost:3001';
    
    try {
      const res = await fetch(`${signalingUrl}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      
      if (!res.ok) throw new Error('Failed to create meeting');
      const data = await res.json();
      router.push(`/room/${data.roomCode}/lobby`);
    } catch {
      setError('Could not create meeting. Signaling server might be down.');
    }
  };

  const handleJoinMeeting = async () => {
    let code = roomCode.trim();
    if (!code) {
      setError('Please enter a room code');
      return;
    }
    setError('');

    // Extract room code if full URL is pasted
    const match = code.match(/\/room\/([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      code = match[1];
    }
    
    const signalingUrl = process.env.NEXT_PUBLIC_SIGNALING_URL || 'http://localhost:3001';

    try {
      const res = await fetch(`${signalingUrl}/api/rooms/${code}`);
      if (!res.ok) {
        setError('Meeting does not exist or has ended');
        return;
      }
      router.push(`/room/${code}/lobby`);
    } catch {
      setError('Could not verify meeting. Signaling server might be down.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-grid">
      {/* Background glow */}
      <div className="hero-glow top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
      <div className="hero-glow bottom-0 right-0 translate-x-1/4 translate-y-1/4 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-14 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-fh-accent/10 border border-fh-accent/20 flex items-center justify-center animate-float">
              <Video className="w-6 h-6 text-fh-accent" />
            </div>
            <h1 className="text-fh-h1 font-bold tracking-tight bg-gradient-to-r from-fh-text-primary to-fh-text-secondary bg-clip-text">
              FireHox Connect
            </h1>
          </div>
          <p className="text-fh-h4 text-fh-text-secondary max-w-xl mx-auto leading-relaxed">
            Generative Vector Video Communication
          </p>
          <p className="text-fh-body text-fh-text-muted mt-3 max-w-md mx-auto">
            Ultra-low bandwidth calls powered by AI facial landmark streaming. 
            No installation required.
          </p>
        </div>

        {/* Action Panel */}
        <div className="w-full max-w-md space-y-5 animate-slide-up-delay-1">
          {loading ? (
             <div className="flex justify-center p-8">
               <Loader2 className="w-8 h-8 animate-spin text-fh-text-muted" />
             </div>
          ) : !user ? (
            <button
              onClick={handleLogin}
              className="btn-primary w-full text-lg group relative overflow-hidden flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Sign in with Google</span>
              <div className="absolute inset-0 bg-gradient-to-r from-fh-accent to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ) : (
            <>
              {/* Create Meeting */}
              <button
                id="btn-start-meeting"
                onClick={handleCreateMeeting}
                className="btn-primary w-full text-lg group relative overflow-hidden"
              >
                <span className="relative z-10">Start Meeting</span>
                <div className="absolute inset-0 bg-gradient-to-r from-fh-accent to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-fh-border" />
                <span className="text-fh-text-muted text-fh-small">or join with code</span>
                <div className="flex-1 h-px bg-fh-border" />
              </div>

              {/* Join Meeting */}
              <div className="flex gap-3">
                <input
                  id="input-room-code"
                  type="text"
                  value={roomCode}
                  onChange={(e) => {
                    setRoomCode(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter room code"
                  className="input-field flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinMeeting()}
                />
                <button
                  id="btn-join-meeting"
                  onClick={handleJoinMeeting}
                  className="btn-secondary whitespace-nowrap"
                >
                  Join
                </button>
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <p className="text-fh-error text-fh-small text-center animate-fade-in">{error}</p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg w-full animate-slide-up-delay-2">
          <FeatureCard icon={<Zap className="w-5 h-5" />} label="Low Latency" />
          <FeatureCard icon={<Shield className="w-5 h-5" />} label="P2P Encrypted" />
          <FeatureCard icon={<Gauge className="w-5 h-5" />} label="90% Less Bandwidth" />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-fh-text-muted text-fh-micro animate-slide-up-delay-3 flex flex-col items-center gap-2">
        <span>FireHox Connect — Phase 1 Prototype</span>
        {user && (
          <button onClick={() => supabase.auth.signOut()} className="text-fh-accent hover:underline">
            Sign out ({user.user_metadata?.full_name || user.email})
          </button>
        )}
      </footer>
    </main>
  );
}

function FeatureCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-fh-surface/50 border border-fh-border/50 rounded-fh-tile p-4 text-center
                    hover:border-fh-accent/30 transition-colors duration-fh-default">
      <div className="text-fh-accent mb-2 flex justify-center">{icon}</div>
      <p className="text-fh-micro text-fh-text-secondary">{label}</p>
    </div>
  );
}

