// =============================================================================
// FireHox Connect — Meeting Store (Zustand)
// Manages room state, participant list, device toggles, and meeting mode.
// =============================================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type MeetingMode = 'none' | 'vector' | 'pixel';
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

export interface BaseFrameData {
  imageSrc: string;
  landmarks: NormalizedLandmarkList;
}

export interface Participant {
  userId: string;
  displayName: string;
  socketId: string;
  mode: MeetingMode;
  isMuted: boolean;
  isCameraOff: boolean;
}

export interface MeetingState {
  // Room
  roomId: string | null;
  roomCode: string | null;
  hostUserId: string | null;
  connectionStatus: ConnectionStatus;

  // Self
  userId: string;
  displayName: string;
  isMicOn: boolean;
  isCameraOn: boolean;
  mode: MeetingMode;

  // Local media stream (captured in lobby)
  localStream: MediaStream | null;
  
  // Base frames for texture mapping
  localBaseFrame: BaseFrameData | null;
  remoteBaseFrames: Map<string, BaseFrameData>;

  // Participants (remote)
  participants: Participant[];

  // Meeting timing
  joinedAt: number | null;

  // Actions — Room
  setRoom: (roomId: string, roomCode?: string) => void;
  setHostUserId: (userId: string | null) => void;
  clearRoom: () => void;
  setConnectionStatus: (status: ConnectionStatus) => void;

  // Actions — Self
  setUserId: (userId: string) => void;
  setDisplayName: (name: string) => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  setMode: (mode: MeetingMode) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  setLocalBaseFrame: (frame: BaseFrameData | null) => void;

  // Actions — Base Frames (Remote)
  addRemoteBaseFrame: (userId: string, frame: BaseFrameData) => void;
  removeRemoteBaseFrame: (userId: string) => void;
  clearRemoteBaseFrames: () => void;

  // Actions — Participants
  addParticipant: (participant: Participant) => void;
  removeParticipant: (userId: string) => void;
  updateParticipant: (userId: string, update: Partial<Participant>) => void;
  clearParticipants: () => void;

  // Actions — Meeting
  joinMeeting: () => void;
  leaveMeeting: () => void;
}

// -----------------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------------

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      // Initial state
      roomId: null,
      roomCode: null,
      hostUserId: null,
      connectionStatus: 'disconnected',

      // Generate a fall-back ID, but persist will overwrite it if found in storage
      userId: typeof crypto !== 'undefined' ? crypto.randomUUID() : '',
      displayName: '',
      isMicOn: true,
      isCameraOn: true,
      mode: 'none',
      localStream: null,
      localBaseFrame: null,
      remoteBaseFrames: new Map(),

      participants: [],
      joinedAt: null,

      // Room actions
      setRoom: (roomId, roomCode) =>
        set({ roomId, roomCode: roomCode ?? roomId.slice(0, 8) }),

      setHostUserId: (hostUserId) => set({ hostUserId }),

      clearRoom: () =>
        set({ roomId: null, roomCode: null, hostUserId: null, connectionStatus: 'disconnected' }),

      setConnectionStatus: (status) =>
        set({ connectionStatus: status }),

      // Self actions
      setUserId: (userId) => set({ userId }),
      setDisplayName: (displayName) => set({ displayName }),

      toggleMic: () =>
        set((state) => ({ isMicOn: !state.isMicOn })),

      toggleCamera: () =>
        set((state) => ({ isCameraOn: !state.isCameraOn })),

      setMode: (mode) => set({ mode }),
      setLocalStream: (stream) => set({ localStream: stream }),
      setLocalBaseFrame: (frame) => set({ localBaseFrame: frame }),

      // Base Frame Actions
      addRemoteBaseFrame: (userId, frame) =>
        set((state) => {
          const next = new Map(state.remoteBaseFrames);
          next.set(userId, frame);
          return { remoteBaseFrames: next };
        }),

      removeRemoteBaseFrame: (userId) =>
        set((state) => {
          const next = new Map(state.remoteBaseFrames);
          next.delete(userId);
          return { remoteBaseFrames: next };
        }),

      clearRemoteBaseFrames: () => set({ remoteBaseFrames: new Map() }),

      // Participant actions
      addParticipant: (participant) =>
        set((state) => {
          if (state.participants.find((p) => p.userId === participant.userId)) {
            return state; // Already exists
          }
          return { participants: [...state.participants, participant] };
        }),

      removeParticipant: (userId) =>
        set((state) => ({
          participants: state.participants.filter((p) => p.userId !== userId),
        })),

      updateParticipant: (userId, update) =>
        set((state) => ({
          participants: state.participants.map((p) =>
            p.userId === userId ? { ...p, ...update } : p
          ),
        })),

      clearParticipants: () => set({ participants: [] }),

      // Meeting lifecycle
      joinMeeting: () => set({ joinedAt: Date.now() }),

      leaveMeeting: () =>
        set((state) => {
          if (state.localStream) {
            state.localStream.getTracks().forEach((track) => track.stop());
          }
          return {
            participants: [],
            connectionStatus: 'disconnected',
            joinedAt: null,
            mode: 'none',
            localStream: null,
            remoteBaseFrames: new Map(),
          };
        }),
    }),
    {
      name: 'firehox-meeting-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        userId: state.userId,
        displayName: state.displayName,
        isMicOn: state.isMicOn,
        isCameraOn: state.isCameraOn,
      }),
    }
  )
);

