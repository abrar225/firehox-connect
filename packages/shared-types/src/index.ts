// =============================================================================
// FireHox Connect — Shared Type Definitions
// Based on: WebRTC Protocol Spec (Document 8) & Backend Schema (Document 5)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Landmark & Vector Types
// -----------------------------------------------------------------------------

/** A single facial landmark coordinate (normalized) */
export interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

/** Vector frame packet sent over DataChannel (Document 8, Section 7) */
export interface VectorFramePacket {
  type: 'vector_frame';
  userId: string;
  timestamp: number;
  frameId: number;
  landmarks: LandmarkPoint[];
}

// -----------------------------------------------------------------------------
// 2. Signaling Message Types (Document 8, Sections 3-5)
// -----------------------------------------------------------------------------

/** Base message envelope — every signaling message must follow this */
export interface SignalingMessage {
  type: SignalingEventType;
  roomId: string;
  fromUserId: string;
  toUserId: string | null;
  timestamp: number;
  payload: Record<string, unknown>;
}

/** All valid signaling event types */
export type SignalingEventType =
  | 'join_room'
  | 'peer_list'
  | 'peer_joined'
  | 'peer_left'
  | 'webrtc_offer'
  | 'webrtc_answer'
  | 'ice_candidate'
  | 'vector_mode_disabled'
  | 'vector_mode_enabled'
  | 'connection_error'
  | 'protocol_violation';

// Room events payloads
export interface JoinRoomPayload {
  displayName: string;
}

export interface PeerInfo {
  userId: string;
  socketId: string;
}

export interface PeerListPayload {
  peers: PeerInfo[];
}

export interface PeerJoinedPayload {
  userId: string;
}

export interface PeerLeftPayload {
  userId: string;
}

// WebRTC handshake payloads
export interface WebRTCOfferPayload {
  sdp: string;
}

export interface WebRTCAnswerPayload {
  sdp: string;
}

export interface ICECandidatePayload {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
}

// Mode switch payloads (Document 8, Sections 11-12)
export interface VectorModeDisabledPayload {
  reason: string;
}

export interface VectorModeEnabledPayload {
  status: 'restored';
}

// Error payloads (Document 8, Section 13)
export interface ConnectionErrorPayload {
  message: string;
}

export interface ProtocolViolationPayload {
  message: string;
}

// -----------------------------------------------------------------------------
// 3. Room & Participant Types (Backend Schema, Document 5)
// -----------------------------------------------------------------------------

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export interface Room {
  id: string;
  roomCode: string;
  hostUserId: string;
  createdAt: string;
  isActive: boolean;
  maxParticipants: number;
}

export interface User {
  id: string;
  createdAt: string;
  lastSeen: string;
  optionalDisplayName?: string;
}

export interface ParticipantSession {
  id: string;
  roomId: string;
  userId: string;
  socketId: string;
  connectionStatus: ConnectionStatus;
  joinedAt: string;
  leftAt?: string;
}

// -----------------------------------------------------------------------------
// 4. API Response Types
// -----------------------------------------------------------------------------

export interface CreateRoomResponse {
  roomId: string;
  roomCode: string;
}

export interface GetRoomResponse {
  room: Room;
  participants: ParticipantSession[];
}

// -----------------------------------------------------------------------------
// 5. DataChannel Constants (Document 8, Section 6)
// -----------------------------------------------------------------------------

export const DATACHANNEL_NAME = 'firehox-vector';

export const DATACHANNEL_CONFIG = {
  ordered: false,
  maxRetransmits: 0,
} as const;

// -----------------------------------------------------------------------------
// 6. Architecture Constants
// -----------------------------------------------------------------------------

/** Max vector packet size in bytes (Document 9, Section 6) */
export const MAX_VECTOR_PACKET_SIZE = 2048;

/** Landmark confidence threshold for fallback (Document 9, Section 6) */
export const FALLBACK_CONFIDENCE_THRESHOLD = 0.5;

/** Maximum participants per room (PRD, Section 5.1) */
export const MAX_PARTICIPANTS = 4;

/** Target vector packet frequency range */
export const VECTOR_FPS_MIN = 20;
export const VECTOR_FPS_MAX = 30;

/** Rendering FPS target */
export const RENDER_FPS_TARGET = 30;
