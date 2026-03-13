// =============================================================================
// FireHox Connect — useSignaling Hook
// Wires the Socket.IO signaling service to the Zustand meeting store,
// and forwards WebRTC events to the useWebRTC hook.
// =============================================================================

'use client';

import { useEffect, useRef } from 'react';
import { signalingService } from '@/services/signaling';
import { useMeetingStore } from '@/stores/meeting-store';
import type { WebRTCHandlers } from './use-webrtc';

/**
 * Connect to the signaling server and sync peer events with Zustand.
 * Call this hook once in the meeting room page.
 *
 * @param roomId - Current room ID
 * @param webRTCHandlers - Optional handlers from useWebRTC to forward signals
 * @param onPeerInitiate - Called when we should initiate a new P2P connection
 */
export function useSignaling(
  roomId: string,
  webRTCHandlers?: WebRTCHandlers,
  onPeerInitiate?: (userId: string) => void
) {
  const userId = useMeetingStore((s) => s.userId);
  const storeRoomId = useMeetingStore((s) => s.roomId);
  const displayName = useMeetingStore((s) => s.displayName);
  const setConnectionStatus = useMeetingStore((s) => s.setConnectionStatus);
  const addParticipant = useMeetingStore((s) => s.addParticipant);
  const removeParticipant = useMeetingStore((s) => s.removeParticipant);
  const updateParticipant = useMeetingStore((s) => s.updateParticipant);
  const mode = useMeetingStore((s) => s.mode);

  const connectedRef = useRef(false);

  // Keep stable references to the WebRTC callbacks (they change on each render)
  const webRTCHandlersRef = useRef<WebRTCHandlers | undefined>(webRTCHandlers);
  const onPeerInitiateRef = useRef<((userId: string) => void) | undefined>(onPeerInitiate);

  // Broadcast local mode change
  useEffect(() => {
    if (connectedRef.current && storeRoomId) {
      signalingService.updateMode(storeRoomId, mode);
    }
  }, [mode, storeRoomId]);

  useEffect(() => {
    webRTCHandlersRef.current = webRTCHandlers;
  }, [webRTCHandlers]);

  useEffect(() => {
    onPeerInitiateRef.current = onPeerInitiate;
  }, [onPeerInitiate]);

  useEffect(() => {
    if (connectedRef.current) return;
    connectedRef.current = true;

    setConnectionStatus('connecting');

    signalingService.connect({
      onConnect: () => {
        setConnectionStatus('connected');
        // Join the room once connected
        signalingService.joinRoom(roomId, userId, displayName || 'Guest');
        // Send initial mode
        signalingService.updateMode(roomId, mode);
      },


      onDisconnect: (reason) => {
        console.log('[useSignaling] Disconnected:', reason);
        if (reason === 'io server disconnect') {
          setConnectionStatus('disconnected');
        } else {
          setConnectionStatus('reconnecting');
        }
      },

      onPeerList: (peers) => {
        // Add all existing peers to the store, then initiate P2P connections
        peers.forEach((peer) => {
          addParticipant({
            userId: peer.userId,
            displayName: peer.displayName || 'Guest',
            socketId: peer.socketId,
            mode: (peer.mode as any) || 'pixel',
            isMuted: false,
            isCameraOff: false,
          });
          // Initiate WebRTC offer to each existing peer
          onPeerInitiateRef.current?.(peer.userId);
        });
      },

      onPeerJoined: (data) => {
        addParticipant({
          userId: data.userId,
          displayName: data.displayName || 'Guest',
          socketId: data.socketId,
          mode: (data.mode as any) || 'pixel',
          isMuted: false,
          isCameraOff: false,
        });
        // We do NOT initiate here. The new joiner will initiate with us.
      },


      onPeerLeft: (data) => {
        removeParticipant(data.userId);
      },

      onPeerModeChanged: (data) => {
        updateParticipant(data.userId, { mode: data.mode });
      },

      // WebRTC relay — forwarded to useWebRTC

      onWebRTCOffer: (data) => {
        webRTCHandlersRef.current?.handleOffer(data);
      },
      onWebRTCAnswer: (data) => {
        webRTCHandlersRef.current?.handleAnswer(data);
      },
      onICECandidate: (data) => {
        webRTCHandlersRef.current?.handleICE(data);
      },

      onError: (data) => {
        console.error('[useSignaling] Server error:', data.message);
      },
    });

    // Cleanup on unmount
    return () => {
      connectedRef.current = false;
      signalingService.disconnect();
      setConnectionStatus('disconnected');
    };
  }, [roomId, userId, setConnectionStatus, addParticipant, removeParticipant, updateParticipant]);
}
