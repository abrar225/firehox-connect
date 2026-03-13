'use client';

import { ParticipantTile } from './participant-tile';
import { type Participant, type MeetingMode, type BaseFrameData } from '@/stores/meeting-store';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

interface ParticipantGridProps {
  localUser: {
    displayName: string;
    mode: MeetingMode;
    isMuted: boolean;
    isCameraOff: boolean;
  };
  participants: Participant[];
  localStream?: MediaStream | null;
  remoteStreams?: Map<string, MediaStream>;
  remoteLandmarks?: Map<string, NormalizedLandmarkList>;
  localLandmarks?: NormalizedLandmarkList | null;
  localBaseFrame?: BaseFrameData | null;
  remoteBaseFrames?: Map<string, BaseFrameData>;
}

import { useMeetingStore } from '@/stores/meeting-store';

/**
 * Dynamic participant grid layout:
 *   1 participant  → full screen
 *   2 participants → horizontal split
 *   3-4 participants → 2×2 grid
 */
export function ParticipantGrid({
  localUser,
  participants,
  localStream,
  remoteStreams,
  remoteLandmarks,
  localLandmarks,
  localBaseFrame,
  remoteBaseFrames,
}: ParticipantGridProps) {
  const hostUserId = useMeetingStore((s) => s.hostUserId);
  const localUserId = useMeetingStore((s) => s.userId);

  const allParticipants = [
    { ...localUser, userId: localUserId, isLocal: true, socketId: '' },
    ...participants.map((p) => ({ ...p, isLocal: false, isCameraOff: p.isCameraOff })),
  ];

  const count = allParticipants.length;

  const gridClass =
    count === 1
      ? 'grid-cols-1'
      : count === 2
        ? 'grid-cols-1 desktop:grid-cols-2'
        : 'grid-cols-1 desktop:grid-cols-2';

  return (
    <div className={`w-full max-w-6xl grid ${gridClass} gap-3 transition-all duration-fh-layout`}>
      {allParticipants.map((p) => (
        <ParticipantTile
          key={p.userId}
          displayName={p.isLocal ? localUser.displayName : p.displayName}
          mode={p.mode}
          isMuted={p.isMuted}
          isCameraOff={p.isCameraOff}
          isAdmin={p.userId === hostUserId}
          isLocal={p.isLocal}
          stream={p.isLocal ? localStream : remoteStreams?.get(p.userId)}
          landmarks={p.isLocal ? localLandmarks : remoteLandmarks?.get(p.userId)}
          baseFrame={p.isLocal ? localBaseFrame : remoteBaseFrames?.get(p.userId)}
        />
      ))}

      {/* Empty state */}
      {count === 1 && (
        <div className="video-tile aspect-video flex items-center justify-center border border-dashed border-fh-border bg-fh-bg-secondary/50">
          <div className="text-center text-fh-text-muted">
            <p className="text-fh-body mb-1">Waiting for others to join…</p>
            <p className="text-fh-micro">Share the room link to invite participants</p>
          </div>
        </div>
      )}
    </div>
  );
}
