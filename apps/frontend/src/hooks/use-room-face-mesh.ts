// =============================================================================
// FireHox Connect — useRoomFaceMesh Hook
// Runs MediaPipe Face Mesh on the local camera stream INSIDE the meeting room.
// Produces landmark data that gets encoded and streamed via data channels.
// =============================================================================

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { NormalizedLandmarkList, FaceMeshResults } from './use-face-mesh';

export interface RoomFaceMeshState {
  landmarks: NormalizedLandmarkList | null;
  isModelLoaded: boolean;
  isFaceDetected: boolean;
}

/**
 * Runs face mesh detection on a MediaStream (the user's local camera).
 * Creates a hidden <video> element internally to feed frames to FaceMesh.
 *
 * @param localStream - The user's camera MediaStream from Zustand
 */
export function useRoomFaceMesh(
  localStream: MediaStream | null
): RoomFaceMeshState {
  const [landmarks, setLandmarks] = useState<NormalizedLandmarkList | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  const activeRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faceMeshRef = useRef<any>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);

  const onResults = useCallback((results: FaceMeshResults) => {
    if (!activeRef.current) return;
    const detected = !!(results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0);
    setIsFaceDetected(detected);
    setLandmarks(detected ? results.multiFaceLandmarks![0] : null);
  }, []);

  useEffect(() => {
    if (!localStream) return;

    activeRef.current = true;

    // Create a hidden video element to feed frames to FaceMesh
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.muted = true;
    video.srcObject = localStream;
    video.play().catch(() => {});
    hiddenVideoRef.current = video;

    async function init() {
      try {
        // Wait for CDN-loaded FaceMesh
        let attempts = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        while (!(window as any).FaceMesh && attempts < 50) {
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FaceMeshClass = (window as any).FaceMesh;
        if (!FaceMeshClass) {
          console.error('[RoomFaceMesh] FaceMesh not found on window');
          return;
        }

        const faceMesh = new FaceMeshClass({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.65,
        });

        faceMesh.onResults(onResults);
        faceMeshRef.current = faceMesh;

        if (!activeRef.current) return;
        setIsModelLoaded(true);

        // Detection loop at ~30fps
        async function detectFrame() {
          if (!activeRef.current) return;
          if (video.readyState >= 2 && !video.paused) {
            try {
              await faceMesh.send({ image: video });
            } catch {
              // Skip frame errors
            }
          }
          rafRef.current = requestAnimationFrame(detectFrame);
        }

        rafRef.current = requestAnimationFrame(detectFrame);
      } catch (err) {
        console.error('[RoomFaceMesh] Init error:', err);
      }
    }

    init();

    return () => {
      activeRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { faceMeshRef.current?.close?.(); } catch { /* ignore */ }
      // Clean up hidden video
      if (hiddenVideoRef.current) {
        hiddenVideoRef.current.srcObject = null;
        hiddenVideoRef.current = null;
      }
    };
  }, [localStream, onResults]);

  return { landmarks, isModelLoaded, isFaceDetected };
}
