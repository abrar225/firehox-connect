'use client';

import { useParams, useRouter } from 'next/navigation';
import { Users, Clock, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useMeetingStore } from '@/stores/meeting-store';
import { ParticipantGrid } from '@/components/participant-grid';
import { ControlBar } from '@/components/control-bar';
import { CopyLinkButton } from '@/components/copy-link-button';
import { useSignaling } from '@/hooks/use-signaling';
import { useWebRTC } from '@/hooks/use-webrtc';
import { useMediaControls } from '@/hooks/use-media-controls';
import { useRoomFaceMesh } from '@/hooks/use-room-face-mesh';
import { encodeLandmarks } from '@/lib/vector-codec';

export default function MeetingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const {
    displayName,
    isMicOn,
    isCameraOn,
    mode,
    participants,
    joinedAt,
    leaveMeeting,
    setRoom,
    joinMeeting,
    connectionStatus,
    localStream,
    setLocalStream,
    localBaseFrame,
    remoteBaseFrames,
  } = useMeetingStore();

  // 1. Ensure room is set and joinedAt is initialized
  useEffect(() => {
    if (!joinedAt) {
      setRoom(roomId);
      joinMeeting();
    }
  }, [roomId, joinedAt, setRoom, joinMeeting]);

  // 2. Stream Recovery Policy: If we refresh, the localStream in store is lost.
  // Re-acquire it automatically if we are in a room and have a displayName.
  useEffect(() => {
    if (!localStream && joinedAt && displayName) {
      console.log('[MeetingRoom] Recovering local stream after refresh...');
      
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        // Apply current toggle states
        stream.getAudioTracks().forEach(t => t.enabled = isMicOn);
        stream.getVideoTracks().forEach(t => t.enabled = isCameraOn);
        setLocalStream(stream);
      }).catch(err => {
        console.error('[MeetingRoom] Failed to recover stream:', err);
      });
    }
  }, [localStream, joinedAt, displayName, isMicOn, isCameraOn, setLocalStream]);

  // Sync mic/camera toggles with actual MediaStream tracks
  useMediaControls();


  // Initialize WebRTC — media streams + data channels
  const { remoteStreams, remoteLandmarks, webRTCHandlers, initiateWithPeer, broadcastLandmarkFrame } =
    useWebRTC(roomId, localStream);

  // Initialize signaling
  useSignaling(roomId, webRTCHandlers, initiateWithPeer);

  // Run face mesh on local camera inside the room (Phase 7)
  const { landmarks: localLandmarks, isFaceDetected } = useRoomFaceMesh(localStream);

  // Broadcast local landmarks to all peers at ~30fps (Phase 8)
  const broadcastRef = useRef(broadcastLandmarkFrame);
  useEffect(() => {
    broadcastRef.current = broadcastLandmarkFrame;
  }, [broadcastLandmarkFrame]);

  useEffect(() => {
    if (!localLandmarks || mode !== 'vector') return;
    try {
      const buffer = encodeLandmarks(localLandmarks);
      broadcastRef.current(buffer);
    } catch {
      // Encoding error — skip frame
    }
  }, [localLandmarks, mode]);

  // Phase 11: Auto-Fallback Mode Strategy
  // If user is in vector mode but face is not detected for a sustained period (e.g., 2.5 seconds),
  // automatically downgrade back to pixel mode to prevent a frozen avatar.
  const { setMode } = useMeetingStore();
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode === 'vector' && !isFaceDetected) {
      if (!fallbackTimeoutRef.current) {
        console.log('[MeetingRoom] Face lost in Vector mode. Starting fallback timer...');
        fallbackTimeoutRef.current = setTimeout(() => {
          console.log('[MeetingRoom] Auto-falling back to Pixel mode.');
          setMode('pixel');
          fallbackTimeoutRef.current = null;
        }, 2500); // 2.5 seconds buffer
      }
    } else {
      // Face is detected or we are not in vector mode -> clear fallback timer
      if (fallbackTimeoutRef.current) {
        console.log('[MeetingRoom] Face recovered or mode switched. Canceling auto-fallback.');
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    }

    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [isFaceDetected, mode, setMode]);


  // Meeting duration timer
  const [elapsed, setElapsed] = useState('0:00');
  useEffect(() => {
    if (!joinedAt) return;
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - joinedAt) / 1000);
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;
      setElapsed(`${mins}:${secs.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [joinedAt]);

  const handleLeave = () => {
    leaveMeeting();
    router.push('/exit');
  };

  return (
    <main className="min-h-screen flex flex-col bg-fh-bg-primary animate-fade-in">
      {/* Top: Meeting Status Bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-fh-border/50 bg-fh-bg-secondary/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-fh-text-muted" />
            <span className="text-fh-small text-fh-text-secondary">
              {participants.length + 1}
            </span>
          </div>
          <div className="w-px h-4 bg-fh-border" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-fh-text-muted" />
            <span className="text-fh-micro text-fh-text-muted font-mono">{elapsed}</span>
          </div>
          <div className="w-px h-4 bg-fh-border" />
          <span className="text-fh-micro text-fh-text-muted truncate max-w-[100px]" title={roomId}>
            {roomId.slice(0, 8)}…
          </span>
          <div className="w-px h-4 bg-fh-border" />

          {/* Connection Status Indicator */}
          <div className="flex items-center gap-1.5">
            {connectionStatus === 'connected' && (
              <>
                <Wifi className="w-3.5 h-3.5 text-fh-success" />
                <span className="text-[10px] text-fh-success font-medium uppercase tracking-wider">Connected</span>
              </>
            )}
            {connectionStatus === 'connecting' && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-fh-text-muted animate-spin" />
                <span className="text-[10px] text-fh-text-muted font-medium uppercase tracking-wider">Connecting</span>
              </>
            )}
            {connectionStatus === 'reconnecting' && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-fh-warning animate-spin" />
                <span className="text-[10px] text-fh-warning font-medium uppercase tracking-wider">Reconnecting</span>
              </>
            )}
            {connectionStatus === 'disconnected' && (
              <>
                <WifiOff className="w-3.5 h-3.5 text-fh-error" />
                <span className="text-[10px] text-fh-error font-medium uppercase tracking-wider">Disconnected</span>
              </>
            )}
          </div>

          {/* Face detection status for local user */}
          {isFaceDetected && (
            <>
              <div className="w-px h-4 bg-fh-border" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-fh-success animate-pulse" />
                <span className="text-[10px] text-fh-success font-medium uppercase tracking-wider">Face Tracked</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <CopyLinkButton roomId={roomId} variant="compact" />
          <div className="badge-vector">Vector Mode</div>
        </div>
      </header>

      {/* Center: Participant Grid */}
      <div className="flex-1 flex items-center justify-center p-4 desktop:p-6">
        <ParticipantGrid
          localUser={{
            displayName: displayName || 'You',
            mode: mode || 'none',
            isMuted: !isMicOn,
            isCameraOff: !isCameraOn,
          }}
          participants={participants}
          localStream={localStream}
          remoteStreams={remoteStreams}
          remoteLandmarks={remoteLandmarks}
          localLandmarks={localLandmarks}
          localBaseFrame={localBaseFrame}
          remoteBaseFrames={remoteBaseFrames}
        />
      </div>

      {/* Bottom: Control Bar */}
      <ControlBar onLeave={handleLeave} />
    </main>
  );
}
