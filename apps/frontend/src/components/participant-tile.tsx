'use client';

import { useState, useRef, useEffect } from 'react';
import { User, VideoOff } from 'lucide-react';
import { type MeetingMode, type BaseFrameData } from '@/stores/meeting-store';
import { AvatarRenderer } from './avatar-renderer';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

interface ParticipantTileProps {
  displayName: string;
  mode: MeetingMode;
  isMuted: boolean;
  isCameraOff: boolean;
  isAdmin?: boolean;
  isLocal?: boolean;
  stream?: MediaStream | null;
  landmarks?: NormalizedLandmarkList | null;
  baseFrame?: BaseFrameData | null;
}

export function ParticipantTile({
  displayName,
  mode,
  isMuted,
  isCameraOff,
  isAdmin = false,
  isLocal = false,
  stream,
  landmarks,
  baseFrame,
}: ParticipantTileProps) {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState({ width: 640, height: 480 });

  // Attach stream to video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      if (video.srcObject !== stream) {
        video.srcObject = stream;
        video.play().catch((err) => {
          console.warn(`[ParticipantTile] ${displayName} play() failed:`, err.message);
        });
      }
    } else {
      video.srcObject = null;
      setIsReady(false);
    }
  }, [stream, displayName]);

  // Measure tile size for avatar renderer + Intersection Observer for Performance (Phase 13)
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setTileSize({ width: Math.round(width), height: Math.round(height) });
        }
      }
    });
    resizeObserver.observe(el);

    const intObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // 10% visible is enough
    );
    intObserver.observe(el);


    return () => {
      resizeObserver.disconnect();
      intObserver.disconnect();
    };
  }, []);

  const hasVideo = !!stream && !isCameraOff;
  const hasLandmarks = !!landmarks && landmarks.length > 0;
  
  // Declaration moved up to fix lint/runtime error
  const showAvatar = hasLandmarks && mode === 'vector';

  // Force video element to play on mount/update
  useEffect(() => {
    if (!videoRef.current || !stream || showAvatar) return;
    
    const v = videoRef.current;
    if (v.srcObject !== stream) {
      v.srcObject = stream;
    }
    
    // Explicitly play to handle browser restrictions
    v.play().catch((err) => {
      console.warn('[ParticipantTile] Play failed:', err);
    });
  }, [stream, showAvatar, mode]);


  return (
    <div
      ref={tileRef}
      className={`video-tile relative aspect-video flex items-center justify-center group overflow-hidden bg-black border border-fh-border/30 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Three.js Avatar (shown when in vector mode) */}
      {showAvatar && (
        <AvatarRenderer
          landmarks={landmarks!}
          baseFrame={baseFrame}
          width={tileSize.width}
          height={tileSize.height}
          isActive={isVisible}
        />
      )}

      {/* Video element (shown in pixel mode or when avatar not ready) */}
      {stream && !showAvatar && (
        <video
          key={`${mode}-${stream.id}`} // Force remount/replay on mode switch
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          onCanPlay={() => setIsReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hasVideo && isReady && isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}


      {/* Audio element (guarantee stream audio plays when video is hidden for Vector Mode) */}
      {stream && showAvatar && !isLocal && (
        <audio
          ref={(audio) => {
            if (audio && audio.srcObject !== stream) {
              audio.srcObject = stream;
              audio.play().catch(() => {});
            }
          }}
          autoPlay
          className="hidden"
        />
      )}


      {/* Placeholder when no video, no avatar, or video not ready */}
      {(!hasVideo || !isReady) && !showAvatar && (
        <div className="flex flex-col items-center gap-3 text-fh-text-muted relative z-10 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-fh-surface flex items-center justify-center border border-fh-border shadow-inner">
            <User className="w-8 h-8 opacity-40" />
          </div>
          {!hasVideo && isCameraOff && (
            <div className="flex items-center gap-1.5 text-fh-small font-medium">
              <VideoOff className="w-4 h-4 opacity-70" />
              <span>Camera off</span>
            </div>
          )}
          {hasVideo && !isReady && (
            <div className="flex items-center gap-2 text-fh-micro text-fh-accent animate-pulse mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-fh-accent" />
              <span>Connecting video…</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom overlay — name + indicators */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-fh-small font-semibold text-white truncate max-w-[140px]">
              {displayName || 'Guest'}
              {isLocal && <span className="text-fh-text-secondary font-normal ml-1">(You)</span>}
            </span>
            {isAdmin && (
              <span className="px-1.5 py-0.5 roundedbg-fh-accent/20 border border-fh-accent text-[9px] text-fh-accent font-bold uppercase tracking-wider ml-1">
                Admin
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isMuted && (
              <div className="px-2 py-0.5 rounded-full bg-fh-error/20 border border-fh-error/30 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-fh-error" />
                <span className="text-[10px] text-fh-error font-bold uppercase tracking-tighter">Muted</span>
              </div>
            )}
            {mode === 'vector' && (
              <div className="px-2 py-0.5 rounded-full bg-fh-success/20 border border-fh-success/30 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-fh-success animate-pulse" />
                <span className="text-[10px] text-fh-success font-bold uppercase tracking-tighter">Vector</span>
              </div>
            )}
            {mode === 'pixel' && (
              <span className="badge-fallback text-[10px]">PIXEL</span>
            )}
          </div>
        </div>
      </div>

      {/* Always-visible name tag */}
      <div
        className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-fh-micro text-white z-20
                    group-hover:opacity-0 transition-opacity duration-300 border border-white/5 flex items-center gap-1.5"
      >
        <span>{displayName || 'Guest'}{isLocal ? ' (You)' : ''}</span>
        {isAdmin && <span className="text-[10px] text-fh-accent font-bold uppercase">Admin</span>}
      </div>
    </div>
  );
}
