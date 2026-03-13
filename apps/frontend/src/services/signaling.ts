// =============================================================================
// FireHox Connect — Socket.IO Signaling Client
// Connects to the signaling server for room coordination and WebRTC handshake.
// Architecture Rule: This service NEVER handles media streams.
// =============================================================================

import { io, Socket } from 'socket.io-client';

// -----------------------------------------------------------------------------
// Types matching the signaling server events
// -----------------------------------------------------------------------------

export interface PeerInfo {
  userId: string;
  socketId: string;
  displayName?: string;
  mode?: string;
}

export interface SignalingCallbacks {
  onPeerList: (peers: PeerInfo[]) => void;
  onPeerJoined: (data: { userId: string; socketId: string; displayName?: string; mode?: string }) => void;
  onPeerLeft: (data: { userId: string }) => void;


  onWebRTCOffer: (data: { fromUserId: string; sdp: string; fromSocketId: string }) => void;
  onWebRTCAnswer: (data: { fromUserId: string; sdp: string; fromSocketId: string }) => void;
  onICECandidate: (data: {
    fromUserId: string;
    candidate: string;
    sdpMid: string;
    sdpMLineIndex: number;
    fromSocketId: string;
  }) => void;
  onPeerModeChanged: (data: { userId: string; mode: any }) => void;
  onError: (data: { message: string }) => void;
  onConnect: () => void;
  onDisconnect: (reason: string) => void;
}


// -----------------------------------------------------------------------------
// Signaling Service
// -----------------------------------------------------------------------------

const SIGNALING_URL = process.env.NEXT_PUBLIC_SIGNALING_URL || 'http://localhost:3001';

class SignalingService {
  private socket: Socket | null = null;
  private callbacks: Partial<SignalingCallbacks> = {};

  /**
   * Connect to the signaling server's /rooms namespace.
   * Document 8, Section 2: Connection endpoint /ws, namespace /rooms
   */
  connect(callbacks: Partial<SignalingCallbacks>): void {
    if (this.socket?.connected) {
      console.warn('[Signaling] Already connected');
      return;
    }

    this.callbacks = callbacks;

    this.socket = io(`${SIGNALING_URL}/rooms`, {
      path: '/ws',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection lifecycle
    this.socket.on('connect', () => {
      console.log('[Signaling] Connected, socketId:', this.socket?.id);
      this.callbacks.onConnect?.();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[Signaling] Disconnected:', reason);
      this.callbacks.onDisconnect?.(reason);
    });

    this.socket.on('connect_error', (err) => {
      console.error('[Signaling] Connection error:', err.message);
    });

    // Room events
    this.socket.on('peer_list', (data: { peers: PeerInfo[] }) => {
      console.log('[Signaling] Peer list:', data.peers);
      this.callbacks.onPeerList?.(data.peers);
    });

    this.socket.on('peer_joined', (data: { userId: string; socketId: string; displayName?: string; mode?: string }) => {
      console.log('[Signaling] Peer joined:', data.userId, data.displayName, data.mode);
      this.callbacks.onPeerJoined?.(data);
    });


    this.socket.on('peer_left', (data: { userId: string }) => {
      console.log('[Signaling] Peer left:', data.userId);
      this.callbacks.onPeerLeft?.(data);
    });

    // WebRTC signaling relay
    this.socket.on('webrtc_offer', (data: { fromUserId: string; sdp: string; fromSocketId: string }) => {
      console.log('[Signaling] WebRTC offer from:', data.fromUserId);
      this.callbacks.onWebRTCOffer?.(data);
    });

    this.socket.on('webrtc_answer', (data: { fromUserId: string; sdp: string; fromSocketId: string }) => {
      console.log('[Signaling] WebRTC answer from:', data.fromUserId);
      this.callbacks.onWebRTCAnswer?.(data);
    });

    this.socket.on('ice_candidate', (data: {
      fromUserId: string;
      candidate: string;
      sdpMid: string;
      sdpMLineIndex: number;
      fromSocketId: string;
    }) => {
      this.callbacks.onICECandidate?.(data);
    });

    this.socket.on('peer_mode_changed', (data: { userId: string; mode: string }) => {
      console.log('[Signaling] Peer mode changed:', data.userId, data.mode);
      this.callbacks.onPeerModeChanged?.(data);
    });

    // Error handling
    this.socket.on('error', (data: { message: string }) => {
      console.error('[Signaling] Error:', data.message);
      this.callbacks.onError?.(data);
    });
  }

  /**
   * Join a room. Triggers peer_list response and peer_joined broadcast.
   */
  joinRoom(roomId: string, userId: string, displayName: string): void {
    if (!this.socket?.connected) {
      console.error('[Signaling] Cannot join room — not connected');
      return;
    }
    this.socket.emit('join_room', { roomId, userId, displayName });
  }

  /**
   * Update current meeting mode (vector/pixel)
   */
  updateMode(roomId: string, mode: string): void {
    this.socket?.emit('update_mode', { roomId, mode });
  }

  /**
   * Send WebRTC offer to a specific peer via signaling server relay.

   */
  sendOffer(roomId: string, toUserId: string, sdp: string): void {
    this.socket?.emit('webrtc_offer', { roomId, toUserId, sdp });
  }

  /**
   * Send WebRTC answer to a specific peer via signaling server relay.
   */
  sendAnswer(roomId: string, toUserId: string, sdp: string): void {
    this.socket?.emit('webrtc_answer', { roomId, toUserId, sdp });
  }

  /**
   * Send ICE candidate to peers via signaling server relay.
   */
  sendICECandidate(
    roomId: string,
    toUserId: string,
    candidate: string,
    sdpMid: string,
    sdpMLineIndex: number
  ): void {
    this.socket?.emit('ice_candidate', { roomId, toUserId, candidate, sdpMid, sdpMLineIndex });
  }

  /**
   * Disconnect from the signaling server.
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      console.log('[Signaling] Disconnected and cleaned up');
    }
  }

  /**
   * Check if currently connected.
   */
  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get current socket ID.
   */
  get socketId(): string | undefined {
    return this.socket?.id;
  }
}

// Singleton instance
export const signalingService = new SignalingService();
