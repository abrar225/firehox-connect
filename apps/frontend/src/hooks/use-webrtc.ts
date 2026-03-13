// =============================================================================
// FireHox Connect — useWebRTC Hook
// Manages Peer-to-Peer WebRTC connections via simple-peer.
// Handles both media streams AND data channels for landmark vector streaming.
// =============================================================================

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import SimplePeer from 'simple-peer';
import { signalingService } from '@/services/signaling';
import { decodeLandmarks } from '@/lib/vector-codec';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';
import { useMeetingStore } from '@/stores/meeting-store';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface WebRTCHandlers {
  handleOffer: (data: { fromUserId: string; sdp: string; fromSocketId: string }) => void;
  handleAnswer: (data: { fromUserId: string; sdp: string; fromSocketId: string }) => void;
  handleICE: (data: {
    fromUserId: string;
    candidate: string;
    sdpMid: string;
    sdpMLineIndex: number;
    fromSocketId: string;
  }) => void;
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

export function useWebRTC(
  roomId: string,
  localStream: MediaStream | null
): {
  remoteStreams: Map<string, MediaStream>;
  remoteLandmarks: Map<string, NormalizedLandmarkList>;
  webRTCHandlers: WebRTCHandlers;
  initiateWithPeer: (userId: string) => void;
  broadcastLandmarkFrame: (buffer: ArrayBuffer) => void;
} {
  // Map of userId -> SimplePeer instance
  const peersRef = useRef<Map<string, SimplePeer.Instance>>(new Map());

  // Map of userId -> data channel for landmark streaming
  const dataChannelsRef = useRef<Map<string, RTCDataChannel>>(new Map());

  // Map of userId -> remote MediaStream (triggers re-render when updated)
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());

  // Map of userId -> latest remote landmarks (triggers re-render when updated)
  const [remoteLandmarks, setRemoteLandmarks] = useState<Map<string, NormalizedLandmarkList>>(new Map());

  // Stable ref to localStream to avoid stale closures
  const localStreamRef = useRef<MediaStream | null>(null);
  useEffect(() => {
    const prevStream = localStreamRef.current;
    localStreamRef.current = localStream;

    // If a stream was just acquired (e.g. after refresh recovery), 
    // we need to add it to all existing peer connections.
    if (localStream && !prevStream && peersRef.current.size > 0) {
      console.log('[WebRTC] Local stream acquired, adding to active peers');
      peersRef.current.forEach((peer) => {
        try {
          peer.addStream(localStream);
        } catch (err) {
          console.warn('[WebRTC] Failed to add stream to peer:', err);
        }
      });
    }
  }, [localStream]);


  // Base frame access
  const localBaseFrame = useMeetingStore(state => state.localBaseFrame);
  const addRemoteBaseFrame = useMeetingStore(state => state.addRemoteBaseFrame);
  
  const localBaseFrameRef = useRef(localBaseFrame);
  useEffect(() => {
    localBaseFrameRef.current = localBaseFrame;
  }, [localBaseFrame]);

  // ---------------------------------------------------------------------------
  // Stream helpers
  // ---------------------------------------------------------------------------

  const addRemoteStream = useCallback((userId: string, stream: MediaStream) => {
    setRemoteStreams((prev) => {
      const next = new Map(prev);
      next.set(userId, stream);
      return next;
    });
  }, []);

  const removeRemoteStream = useCallback((userId: string) => {
    setRemoteStreams((prev) => {
      const next = new Map(prev);
      next.delete(userId);
      return next;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Landmark helpers
  // ---------------------------------------------------------------------------

  const updateRemoteLandmarks = useCallback((userId: string, landmarks: NormalizedLandmarkList) => {
    setRemoteLandmarks((prev) => {
      const next = new Map(prev);
      next.set(userId, landmarks);
      return next;
    });
  }, []);

  const removeRemoteLandmarks = useCallback((userId: string) => {
    setRemoteLandmarks((prev) => {
      const next = new Map(prev);
      next.delete(userId);
      return next;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Data channel setup
  // ---------------------------------------------------------------------------

  const setupDataChannel = useCallback(
    (userId: string, channel: RTCDataChannel) => {
      channel.binaryType = 'arraybuffer';

      channel.onopen = () => {
        console.log(`[DataChannel] Open with ${userId}`);
        dataChannelsRef.current.set(userId, channel);
      };

      channel.onmessage = async (event: MessageEvent) => {
        let buffer: ArrayBuffer;
        if (event.data instanceof ArrayBuffer) {
          buffer = event.data;
        } else if (event.data instanceof Blob) {
          try {
            buffer = await event.data.arrayBuffer();
          } catch {
            return;
          }
        } else {
          return;
        }

        try {
          const landmarks = decodeLandmarks(buffer);
          updateRemoteLandmarks(userId, landmarks);
        } catch {
          // Ignore malformed frames
        }
      };

      channel.onclose = () => {
        console.log(`[DataChannel] Closed with ${userId}`);
        dataChannelsRef.current.delete(userId);
        removeRemoteLandmarks(userId);
      };

      channel.onerror = () => {
        dataChannelsRef.current.delete(userId);
      };
    },
    [updateRemoteLandmarks, removeRemoteLandmarks]
  );

  const setupBaseFrameChannel = useCallback((userId: string, channel: RTCDataChannel) => {
    channel.binaryType = 'arraybuffer'; // Or text, doesn't matter since we JSON parse

    channel.onopen = () => {
      console.log(`[BaseFrameChannel] Open with ${userId}`);
      if (localBaseFrameRef.current) {
        channel.send(JSON.stringify(localBaseFrameRef.current));
      }
    };

    channel.onmessage = async (event: MessageEvent) => {
      try {
        let text = event.data;
        if (text instanceof Blob) {
          text = await text.text();
        } else if (text instanceof ArrayBuffer) {
          text = new TextDecoder().decode(text);
        }
        const frame = JSON.parse(text);
        if (frame.imageSrc && frame.landmarks) {
          addRemoteBaseFrame(userId, frame);
        }
      } catch (err) {
        console.warn(`[BaseFrameChannel] Decode error from ${userId}:`, err);
      }
    };
  }, [addRemoteBaseFrame]);

  // ---------------------------------------------------------------------------
  // Create a new SimplePeer instance
  // ---------------------------------------------------------------------------

  const createPeer = useCallback(
    (userId: string, initiator: boolean, sdpString?: string) => {
      // Destroy any existing connection for this user
      if (peersRef.current.has(userId)) {
        peersRef.current.get(userId)?.destroy();
        peersRef.current.delete(userId);
      }
      dataChannelsRef.current.delete(userId);

      const peer = new SimplePeer({
        initiator,
        stream: localStreamRef.current || undefined,
        trickle: true,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
          ],
        },
      });

      peer.on('signal', (signal: SimplePeer.SignalData) => {
        const signalStr = JSON.stringify(signal);
        if (signal.type === 'offer') {
          signalingService.sendOffer(roomId, userId, signalStr);
        } else if (signal.type === 'answer') {
          signalingService.sendAnswer(roomId, userId, signalStr);
        } else {
          const raw = signal as unknown as { candidate?: { candidate?: string; sdpMid?: string; sdpMLineIndex?: number } };
          if (raw.candidate) {
            signalingService.sendICECandidate(
              roomId,
              JSON.stringify(raw.candidate.candidate ?? ''),
              raw.candidate.sdpMid ?? '',
              raw.candidate.sdpMLineIndex ?? 0
            );
          }
        }
      });

      peer.on('stream', (stream: MediaStream) => {
        console.log(`[WebRTC] Remote stream received from ${userId}`);
        addRemoteStream(userId, stream);
      });

      // Data channel handling via the underlying RTCPeerConnection
      peer.on('connect', () => {
        console.log(`[WebRTC] Peer ${userId} connected`);

        // Access the underlying RTCPeerConnection
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pc = (peer as any)._pc as RTCPeerConnection;
        if (!pc) return;

        if (initiator) {
          // We create the data channel
          const dc = pc.createDataChannel('landmarks', {
            ordered: false,      // Unordered for lowest latency
            maxRetransmits: 0,   // No retransmits — if it's lost, next frame replaces it
          });
          setupDataChannel(userId, dc);

          // Base frame channel (needs to be ordered & reliable)
          const baseDc = pc.createDataChannel('baseFrame', {
            ordered: true,
          });
          setupBaseFrameChannel(userId, baseDc);
        }

        // Listen for incoming data channels (for answerer side)
        pc.ondatachannel = (event: RTCDataChannelEvent) => {
          if (event.channel.label === 'landmarks') {
            setupDataChannel(userId, event.channel);
          } else if (event.channel.label === 'baseFrame') {
            setupBaseFrameChannel(userId, event.channel);
          }
        };
      });

      peer.on('close', () => {
        console.log(`[WebRTC] Peer ${userId} connection closed`);
        peersRef.current.delete(userId);
        dataChannelsRef.current.delete(userId);
        removeRemoteStream(userId);
        removeRemoteLandmarks(userId);
      });

      peer.on('error', (err: Error) => {
        console.error(`[WebRTC] Peer ${userId} error:`, err.message);
        peersRef.current.delete(userId);
        dataChannelsRef.current.delete(userId);
        removeRemoteStream(userId);
        removeRemoteLandmarks(userId);
      });

      // If answering, process the incoming offer signal
      if (!initiator && sdpString) {
        peer.signal(JSON.parse(sdpString));
      }

      peersRef.current.set(userId, peer);
      return peer;
    },
    [roomId, addRemoteStream, removeRemoteStream, removeRemoteLandmarks, setupDataChannel]
  );

  // ---------------------------------------------------------------------------
  // Public: broadcast a landmark frame to ALL connected peers
  // ---------------------------------------------------------------------------

  const broadcastLandmarkFrame = useCallback((buffer: ArrayBuffer) => {
    dataChannelsRef.current.forEach((channel, userId) => {
      if (channel.readyState === 'open') {
        try {
          channel.send(buffer);
        } catch {
          console.warn(`[DataChannel] Failed to send to ${userId}`);
        }
      }
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Public: initiate a P2P connection
  // ---------------------------------------------------------------------------

  const initiateWithPeer = useCallback(
    (userId: string) => {
      console.log(`[WebRTC] Initiating (offer) to ${userId}`);
      createPeer(userId, true);
    },
    [createPeer]
  );

  // ---------------------------------------------------------------------------
  // Public handlers — called by useSignaling
  // ---------------------------------------------------------------------------

  const handleOffer = useCallback(
    (data: { fromUserId: string; sdp: string }) => {
      console.log(`[WebRTC] Incoming offer from ${data.fromUserId}`);
      createPeer(data.fromUserId, false, data.sdp);
    },
    [createPeer]
  );

  const handleAnswer = useCallback(
    (data: { fromUserId: string; sdp: string }) => {
      console.log(`[WebRTC] Incoming answer from ${data.fromUserId}`);
      const peer = peersRef.current.get(data.fromUserId);
      if (peer) {
        peer.signal(JSON.parse(data.sdp));
      }
    },
    []
  );

  const handleICE = useCallback(
    (data: {
      fromUserId: string;
      candidate: string;
      sdpMid: string;
      sdpMLineIndex: number;
    }) => {
      const peer = peersRef.current.get(data.fromUserId);
      if (peer) {
        try {
          peer.signal({
            type: 'candidate',
            candidate: {
              candidate: JSON.parse(data.candidate),
              sdpMid: data.sdpMid,
              sdpMLineIndex: data.sdpMLineIndex,
            },
          } as unknown as SimplePeer.SignalData);
        } catch {
          // Ignore malformed ICE
        }
      }
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Cleanup on unmount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    return () => {
      dataChannelsRef.current.forEach((channel) => {
        try { channel.close(); } catch { /* ignore */ }
      });
      dataChannelsRef.current.clear();
      peersRef.current.forEach((peer) => peer.destroy());
      peersRef.current.clear();
    };
  }, []);

  return {
    remoteStreams,
    remoteLandmarks,
    initiateWithPeer,
    broadcastLandmarkFrame,
    webRTCHandlers: { handleOffer, handleAnswer, handleICE },
  };
}
