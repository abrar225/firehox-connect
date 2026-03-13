'use client';

import { useParams, useRouter } from 'next/navigation';
import { Video, VideoOff, Mic, MicOff, Camera, Check, User, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useMeetingStore } from '@/stores/meeting-store';
import { CopyLinkButton } from '@/components/copy-link-button';
import { FaceMeshOverlay } from '@/components/face-mesh-overlay';
import { useFaceMesh } from '@/hooks/use-face-mesh';

import { createClient } from '@/utils/supabase/client';

export default function LobbyPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const {
    isMicOn,
    isCameraOn,
    toggleMic,
    toggleCamera,
    setRoom,
    joinMeeting,
    setLocalStream,
    setLocalBaseFrame,
    setHostUserId,
    setDisplayName: setGlobalDisplayName,
  } = useMeetingStore();

  const [baseFrameCaptured, setBaseFrameCaptured] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [cameraError, setCameraError] = useState('');
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    async function initLobby() {
      // 1. Auth check
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !active) {
        if (active) router.push('/?error=auth_required');
        return;
      }
      
      const name = session.user.user_metadata?.full_name || session.user.email || 'Guest';
      if (active) setDisplayName(name);

      // 2. Fetch room details
      try {
        const signalingUrl = process.env.NEXT_PUBLIC_SIGNALING_URL || 'http://localhost:3001';
        const res = await fetch(`${signalingUrl}/api/rooms/${roomId}`);
        if (!res.ok) {
          if (active) router.push('/?error=invalid_room');
          return;
        }
        const room = await res.json();
        if (active) {
          setHostUserId(room.host_user_id);
        }
      } catch (err) {
        console.error('Failed to fetch room:', err);
        if (active) router.push('/?error=server_error');
      }
    }
    initLobby();
    return () => { active = false; };
  }, [roomId, router, supabase.auth, setHostUserId]);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });


  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ---------------------------------------------------------------------------
  // Face Mesh
  // ---------------------------------------------------------------------------
  const { landmarks, isModelLoaded, isFaceDetected } = useFaceMesh(videoRef);

  // ---------------------------------------------------------------------------
  // Start camera on mount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let active = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const currentState = useMeetingStore.getState();
        // Apply current toggle states immediately (reads latest, not stale mount values)
        stream.getAudioTracks().forEach((t) => { t.enabled = currentState.isMicOn; });
        stream.getVideoTracks().forEach((t) => { t.enabled = currentState.isCameraOn; });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error('[Lobby] Media access error:', err);
        setCameraError('Camera/microphone access denied. You can still join.');
      }
    }

    startCamera();

    return () => {
      active = false;
      if (!useMeetingStore.getState().joinedAt && streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Sync track enabled state with toggles (while in lobby)
  useEffect(() => {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((t) => { t.enabled = isCameraOn; });
  }, [isCameraOn]);

  useEffect(() => {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((t) => { t.enabled = isMicOn; });
  }, [isMicOn]);

  // Track video element dimensions for canvas overlay sizing
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoSize({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });
      // Fallback check to ensure we only say it's ready if sizing is valid
      if (videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
        setIsVideoReady(true);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Join meeting
  // ---------------------------------------------------------------------------
  const handleJoinMeeting = () => {
    setGlobalDisplayName(displayName);
    setRoom(roomId);
    joinMeeting();
    if (streamRef.current) {
      setLocalStream(streamRef.current);
    }
    router.push(`/room/${roomId}`);
  };

  // ---------------------------------------------------------------------------
  // Capture Base Frame
  // ---------------------------------------------------------------------------
  const handleCaptureBaseFrame = () => {
    if (!videoRef.current || !landmarks || landmarks.length === 0) return;

    // Create a tiny off-screen canvas to capture the image
    const canvas = document.createElement('canvas');
    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    const MAX_DIM = 320;
    
    let w = vw;
    let h = vh;
    if (w > MAX_DIM || h > MAX_DIM) {
      if (w > h) {
        h = Math.round((h * MAX_DIM) / w);
        w = MAX_DIM;
      } else {
        w = Math.round((w * MAX_DIM) / h);
        h = MAX_DIM;
      }
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas and export as WebP
    ctx.drawImage(videoRef.current, 0, 0, w, h);
    const imageSrc = canvas.toDataURL('image/webp', 0.8);

    setLocalBaseFrame({
      imageSrc,
      landmarks: JSON.parse(JSON.stringify(landmarks)) // Snapshot of current precise coordinates
    });

    setBaseFrameCaptured(true);
  };

  // ---------------------------------------------------------------------------
  // Status badge logic
  // ---------------------------------------------------------------------------
  const statusLabel = (() => {
    if (baseFrameCaptured) return 'Base frame captured';
    if (!isModelLoaded) return 'Initializing AI…';
    if (isFaceDetected) return 'Face detected ✓';
    return 'Face mesh: waiting…';
  })();

  const statusColor = baseFrameCaptured
    ? 'bg-fh-success'
    : isFaceDetected
      ? 'bg-fh-success animate-pulse'
      : 'bg-fh-text-muted';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-grid relative overflow-hidden">
      <div className="hero-glow top-0 left-1/3 animate-glow-pulse" />

      <div className="relative z-10 w-full max-w-5xl">
        <h2 className="text-fh-h2 font-bold mb-8 text-center animate-slide-up">Pre-Join Lobby</h2>

        <div className="grid grid-cols-1 desktop:grid-cols-5 gap-8 animate-slide-up-delay-1">
          {/* Left: Camera Preview (3 cols) */}
          <div className="desktop:col-span-3">
            <div className="video-tile aspect-video flex items-center justify-center relative overflow-hidden bg-black border border-fh-border shadow-2xl">
              {/* Live camera video element */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={() => setIsVideoReady(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  isCameraOn && !cameraError && isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Face Mesh Canvas Overlay - only render when video size is known */}
              {isCameraOn && !cameraError && isVideoReady && videoSize.width > 0 && (
                <FaceMeshOverlay
                  landmarks={landmarks}
                  videoWidth={videoSize.width}
                  videoHeight={videoSize.height}
                />
              )}

              {/* Fallback placeholder when camera is off or errored or not ready */}
              {(!isCameraOn || cameraError || !isVideoReady) && (
                <div className="flex flex-col items-center gap-3 text-fh-text-muted relative z-20 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-fh-surface/50 backdrop-blur-sm flex items-center justify-center border border-fh-border">
                    <User className="w-10 h-10 opacity-50" />
                  </div>
                  {cameraError ? (
                    <p className="text-fh-small text-fh-error max-w-xs text-center">{cameraError}</p>
                  ) : !isVideoReady && isCameraOn ? (
                    <div className="flex items-center gap-2 text-fh-micro animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-fh-accent" />
                      <span>Starting devices…</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-fh-small">
                      <VideoOff className="w-4 h-4" />
                      <span>Camera is off</span>
                    </div>
                  )}
                </div>
              )}


              {/* Status badge (top left) */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 rounded-full px-3 py-1 z-30">
                {!isModelLoaded && !baseFrameCaptured ? (
                  <Loader2 className="w-2.5 h-2.5 text-fh-text-muted animate-spin" />
                ) : (
                  <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                )}
                <span className="text-fh-micro text-fh-text-secondary">{statusLabel}</span>
              </div>
            </div>
          </div>

          {/* Right: Controls Panel (2 cols) */}
          <div className="desktop:col-span-2 flex flex-col gap-5">
            <div className="bg-fh-surface rounded-fh-tile p-5 space-y-4">
              <h3 className="text-fh-h4 font-semibold">Room Settings</h3>

              {/* Display name */}
              <div>
                <label className="block text-fh-micro text-fh-text-secondary mb-1.5">Display Name</label>
                <input
                  id="input-display-name"
                  type="text"
                  value={displayName}
                  readOnly
                  placeholder="Loading from Google..."
                  className="input-field w-full opacity-70 cursor-not-allowed bg-fh-surface/50"
                />
              </div>

              {/* Device Toggles */}
              <div>
                <label className="block text-fh-micro text-fh-text-secondary mb-1.5">Devices</label>
                <div className="flex gap-3">
                  <button
                    id="btn-toggle-mic"
                    onClick={toggleMic}
                    className={`control-btn ${!isMicOn ? 'bg-fh-error hover:bg-red-600' : ''}`}
                    title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button
                    id="btn-toggle-camera"
                    onClick={toggleCamera}
                    className={`control-btn ${!isCameraOn ? 'bg-fh-error hover:bg-red-600' : ''}`}
                    title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                  >
                    {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Base Frame Capture */}
              <div>
                <button
                  id="btn-capture-base"
                  onClick={handleCaptureBaseFrame}
                  disabled={baseFrameCaptured || !isFaceDetected}
                  className={`btn-secondary w-full flex items-center justify-center gap-2
                    ${baseFrameCaptured ? 'border-fh-success text-fh-success' : ''}
                    ${!isFaceDetected && !baseFrameCaptured ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {baseFrameCaptured ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Base Frame Captured</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      <span>{isFaceDetected ? 'Capture Base Frame' : 'Detecting Face…'}</span>
                    </>
                  )}
                </button>
                {!isFaceDetected && !baseFrameCaptured && (
                  <p className="text-fh-micro text-fh-text-muted mt-1.5 text-center">
                    Face must be detected to capture
                  </p>
                )}
              </div>
            </div>

            {/* Share Room */}
            <div className="bg-fh-surface rounded-fh-tile p-5 space-y-3">
              <h4 className="text-fh-small font-medium text-fh-text-secondary">Share Room</h4>
              <div className="flex items-center gap-2 bg-fh-bg-secondary rounded-fh-input px-3 py-2">
                <span className="text-fh-micro text-fh-text-muted truncate flex-1">
                  {roomId.slice(0, 12)}…
                </span>
                <CopyLinkButton roomId={roomId} variant="compact" />
              </div>
              <CopyLinkButton roomId={roomId} />
            </div>

            {/* Join Button */}
            <div>
              <button
                id="btn-join-room"
                onClick={handleJoinMeeting}
                disabled={!displayName.trim() || !baseFrameCaptured}
                className={`btn-primary w-full text-lg ${
                  (!displayName.trim() || !baseFrameCaptured) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Join Meeting
              </button>
              {(!displayName.trim() || !baseFrameCaptured) && (
                <p className="text-fh-micro text-fh-error mt-3 text-center font-medium bg-fh-error/10 py-1.5 rounded-full border border-fh-error/20">
                  {!displayName.trim() ? "Please enter a display name to join" : "Please capture a base frame to join"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
