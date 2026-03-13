// =============================================================================
// FireHox Connect — Vector Codec
// Encodes/decodes 468 face landmarks into a compact binary format for
// ultra-low bandwidth streaming over WebRTC data channels.
//
// Format:
//   Byte 0:      version (1)
//   Bytes 1..N:  468 × 3 × Int16 (quantized x, y, z) = 2808 bytes
//   Total:       2809 bytes per frame (~84 KB/s at 30 fps)
// =============================================================================

import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

// Quantization range: float [0.0, 1.0] → Int16 [0, 10000]
// z values can be negative, so we use [-5000, 5000] mapped to [-0.5, 0.5]
const SCALE_XY = 10000;
const SCALE_Z = 10000;
const OFFSET_Z = 5000; // shift z into positive range for Int16
const NUM_LANDMARKS = 468;
const VERSION = 1;
const HEADER_BYTES = 1;
const PAYLOAD_BYTES = NUM_LANDMARKS * 3 * 2; // 468 * 3 coords * 2 bytes each
export const FRAME_BYTES = HEADER_BYTES + PAYLOAD_BYTES; // 2809

/**
 * Encode 468 face landmarks into ~ 2.8 KB binary frame.
 */
export function encodeLandmarks(landmarks: NormalizedLandmarkList): ArrayBuffer {
  const buffer = new ArrayBuffer(FRAME_BYTES);
  const view = new DataView(buffer);

  // Header
  view.setUint8(0, VERSION);

  // Payload
  let offset = HEADER_BYTES;
  for (let i = 0; i < NUM_LANDMARKS; i++) {
    const lm = landmarks[i];
    if (!lm) {
      // Missing landmark — write zeros
      view.setInt16(offset, 0, true);
      view.setInt16(offset + 2, 0, true);
      view.setInt16(offset + 4, 0, true);
    } else {
      // Quantize: clamp to range then scale to Int16
      const qx = Math.round(Math.max(0, Math.min(1, lm.x)) * SCALE_XY);
      const qy = Math.round(Math.max(0, Math.min(1, lm.y)) * SCALE_XY);
      const qz = Math.round(Math.max(-0.5, Math.min(0.5, lm.z)) * SCALE_Z + OFFSET_Z);

      view.setInt16(offset, qx, true);
      view.setInt16(offset + 2, qy, true);
      view.setInt16(offset + 4, qz, true);
    }
    offset += 6;
  }

  return buffer;
}

/**
 * Decode a binary frame back into 468 face landmarks.
 */
export function decodeLandmarks(buffer: ArrayBuffer): NormalizedLandmarkList {
  const view = new DataView(buffer);

  // Validate
  const version = view.getUint8(0);
  if (version !== VERSION) {
    console.warn(`[VectorCodec] Unknown version ${version}, expected ${VERSION}`);
  }

  const landmarks: NormalizedLandmarkList = [];
  let offset = HEADER_BYTES;

  for (let i = 0; i < NUM_LANDMARKS; i++) {
    const qx = view.getInt16(offset, true);
    const qy = view.getInt16(offset + 2, true);
    const qz = view.getInt16(offset + 4, true);

    landmarks.push({
      x: qx / SCALE_XY,
      y: qy / SCALE_XY,
      z: (qz - OFFSET_Z) / SCALE_Z,
    });

    offset += 6;
  }

  return landmarks;
}
