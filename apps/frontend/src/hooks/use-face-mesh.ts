// =============================================================================
// FireHox Connect — useFaceMesh Hook
// Uses @mediapipe/face_mesh loaded from CDN (via layout.tsx <Script> tag).
// NOT imported through webpack to avoid WASM Module.arguments conflict.
// =============================================================================

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Types only — no runtime import from the npm package (that causes WASM crash)
export type NormalizedLandmark = { x: number; y: number; z: number };
export type NormalizedLandmarkList = NormalizedLandmark[];

export interface FaceMeshResults {
  multiFaceLandmarks?: NormalizedLandmarkList[];
}

export interface FaceMeshState {
  landmarks: NormalizedLandmarkList | null;
  isModelLoaded: boolean;
  isFaceDetected: boolean;
}

// Tesselation connections — bundled here to avoid importing from mediapipe npm
// These are the standard 468-landmark connection pairs from FACEMESH_TESSELATION
// We pull them from the CDN-loaded global at runtime
function getTesselation(): [number, number][] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (win.FACEMESH_TESSELATION) return Array.from(win.FACEMESH_TESSELATION);
  return [];
}

// Export for face-mesh-overlay to use
export { getTesselation };

/**
 * Continuously runs face mesh detection on the provided video element.
 * Relies on @mediapipe/face_mesh being loaded globally from CDN.
 */
export function useFaceMesh(
  videoRef: React.RefObject<HTMLVideoElement>
): FaceMeshState {
  const [landmarks, setLandmarks] = useState<NormalizedLandmarkList | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faceMeshRef = useRef<any>(null);

  const onResults = useCallback((results: FaceMeshResults) => {
    if (!activeRef.current) return;
    const detected = !!(results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0);
    setIsFaceDetected(detected);
    setLandmarks(detected ? results.multiFaceLandmarks![0] : null);
  }, []);

  useEffect(() => {
    activeRef.current = true;

    async function init() {
      try {
        // Wait for the CDN script to expose FaceMesh on window
        let attempts = 0;
        while (!(window as any).FaceMesh && attempts < 50) {
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const FaceMeshClass = (window as any).FaceMesh;
        if (!FaceMeshClass) {
          console.error('[FaceMesh] FaceMesh not found on window. CDN script may have failed.');
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

        // RAF detection loop
        async function detectFrame() {
          if (!activeRef.current) return;
          const video = videoRef.current;
          if (video && video.readyState >= 2 && !video.paused) {
            try {
              await faceMesh.send({ image: video });
            } catch {
              // Frame processing error — continue loop
            }
          }
          rafRef.current = requestAnimationFrame(detectFrame);
        }

        rafRef.current = requestAnimationFrame(detectFrame);
      } catch (err) {
        console.error('[FaceMesh] Init error:', err);
      }
    }

    init();

    return () => {
      activeRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { faceMeshRef.current?.close?.(); } catch { /* ignore */ }
    };
  }, [onResults, videoRef]);

  return { landmarks, isModelLoaded, isFaceDetected };
}
