'use client';

import { useRef, useEffect, memo } from 'react';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

const MESH_COLOR = 'rgba(99, 102, 241, 0.45)';
const CONTOUR_COLOR = 'rgba(129, 140, 248, 0.85)';

interface FaceMeshOverlayProps {
  landmarks: NormalizedLandmarkList | null;
  videoWidth: number;
  videoHeight: number;
}

/**
 * Canvas overlay that draws face mesh connections on top of the camera preview.
 * Uses FACEMESH_TESSELATION from window (loaded via CDN script in layout.tsx).
 */
export const FaceMeshOverlay = memo(function FaceMeshOverlay({
  landmarks,
  videoWidth,
  videoHeight,
}: FaceMeshOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoWidth || canvas.offsetWidth;
    canvas.height = videoHeight || canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks) return;

    const w = canvas.width;
    const h = canvas.height;

    // Get tesselation from CDN global
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tesselation: [number, number][] = Array.from((window as any).FACEMESH_TESSELATION ?? []);

    if (tesselation.length > 0) {
      ctx.strokeStyle = MESH_COLOR;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (const [startIdx, endIdx] of tesselation) {
        const start = landmarks[startIdx];
        const end = landmarks[endIdx];
        if (!start || !end) continue;
        ctx.moveTo(start.x * w, start.y * h);
        ctx.lineTo(end.x * w, end.y * h);
      }
      ctx.stroke();
    }

    // Draw key landmark dots (every 8th for performance)
    ctx.fillStyle = CONTOUR_COLOR;
    for (let i = 0; i < landmarks.length; i += 8) {
      const lm = landmarks[i];
      ctx.beginPath();
      ctx.arc(lm.x * w, lm.y * h, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [landmarks, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: landmarks ? 1 : 0, transition: 'opacity 0.4s ease' }}
    />
  );
});
