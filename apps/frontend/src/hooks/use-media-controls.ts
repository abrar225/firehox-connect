// =============================================================================
// FireHox Connect — useMediaControls Hook
// Keeps Zustand isMicOn/isCameraOn in sync with actual MediaStream track state.
// This is the single source of truth for track enable/disable in the room.
// =============================================================================

'use client';

import { useEffect } from 'react';
import { useMeetingStore } from '@/stores/meeting-store';

/**
 * Call this once in the meeting room page.
 * It watches isMicOn and isCameraOn and toggles the matching MediaStream tracks.
 * It also stops all tracks when the meeting is left (releases OS-level device).
 */
export function useMediaControls() {
  const { isMicOn, isCameraOn, localStream } = useMeetingStore();

  // Sync audio track enabled state
  useEffect(() => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = isMicOn;
    });
  }, [isMicOn, localStream]);

  // Sync video track enabled state
  useEffect(() => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOn;
    });
  }, [isCameraOn, localStream]);
}

