'use client';

import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import type { NormalizedLandmarkList } from '@/hooks/use-face-mesh';

import type { BaseFrameData } from '@/stores/meeting-store';

interface AvatarRendererProps {
  landmarks: NormalizedLandmarkList;
  baseFrame?: BaseFrameData | null;
  width?: number;
  height?: number;
  isActive?: boolean;
}

// Extract triangles by finding 3-cliques in the MediaPipe Tesselation edges (O(V*E))
function getTesselationTriangles(): number[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tess = (window as any).FACEMESH_TESSELATION;
  if (!tess) return [];

  const adj = new Map<number, Set<number>>();
  for (const [u, v] of tess) {
    if (!adj.has(u)) adj.set(u, new Set());
    if (!adj.has(v)) adj.set(v, new Set());
    adj.get(u)!.add(v);
    adj.get(v)!.add(u);
  }

  const triangles: number[] = [];
  for (const [u, v] of tess) {
    const min = Math.min(u, v);
    const max = Math.max(u, v);
    const neighborsU = adj.get(min);
    const neighborsV = adj.get(max);
    if (!neighborsU || !neighborsV) continue;

    for (const w of neighborsU) {
      if (w > max && neighborsV.has(w)) {
        triangles.push(min, max, w);
      }
    }
  }
  return triangles;
}

/**
 * Renders a real-time 3D solid face mesh avatar using Three.js.
 * Wraps a photographic texture (Base Frame) onto 468 vertex coordinates.
 */
export const AvatarRenderer = memo(function AvatarRenderer({
  landmarks,
  baseFrame,
  width = 640,
  height = 480,
  isActive = true,
}: AvatarRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const rafRef = useRef<number | null>(null);
  const initedRef = useRef(false);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || initedRef.current) return;
    initedRef.current = true;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f14); // fh-bg-primary
    sceneRef.current = scene;

    // Orthographic camera (centered Cartesian)
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(-aspect * 0.6, aspect * 0.6, 0.6, -0.6, 0.1, 10);
    camera.position.z = 2; // place camera pulled back
    cameraRef.current = camera;


    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Get triangles dynamically
    const triangles = getTesselationTriangles();

    // --- Solid Mesh with Custom Shader for Soft Edges ---
    const positions = new Float32Array(468 * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    if (triangles.length > 0) {
      const indices = new Uint16Array(triangles);
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    }

    // Custom shader for a high-end Hologram/Vector look
    const material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: { value: null },
        uOpacity: { value: 0.0 },
        uHasTexture: { value: false },
        uTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform sampler2D uTexture;
        uniform float uOpacity;
        uniform bool uHasTexture;
        uniform float uTime;

        void main() {
          // Distance for soft edges
          float dist = distance(vUv, vec2(0.5, 0.5));
          float edgeAlpha = smoothstep(0.48, 0.35, dist);

          if (!uHasTexture) {
            // High-end 'Grid' look for when texture is loading
            float grid = sin(vPosition.y * 40.0 + uTime * 2.0) * 0.5 + 0.5;
            gl_FragColor = vec4(0.1, 0.5, 1.0, (0.2 + grid * 0.2) * edgeAlpha);
            return;
          }

          vec4 texColor = texture2D(uTexture, vUv);
          
          // Eye masking - soften the 'black holes'
          // We use known UV coordinates for eyes or just soften dark spots
          float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
          vec3 finalColor = texColor.rgb;
          
          if (luminance < 0.1) {
            finalColor = mix(vec3(0.05, 0.05, 0.1), finalColor, 0.5); // Add subtle navy to deep shadows/eyes
          }

          // Subtle hologram scanlines
          float scanline = sin(vPosition.y * 100.0 - uTime * 3.0) * 0.03;
          finalColor += scanline;

          gl_FragColor = vec4(finalColor, edgeAlpha * uOpacity);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;
    geometryRef.current = geometry;
    materialRef.current = material as any;


    // Render loop
    function animate(time: number) {
      rafRef.current = requestAnimationFrame(animate);
      if (!isActiveRef.current) return; // Pause rendering completely if off-screen (Phase 13 setup)
      
      if (material.uniforms.uTime) {
        material.uniforms.uTime.value = time / 1000;
      }
      renderer.render(scene, camera);
    }
    animate(0);

    return () => {
      initedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Load texture and bake UVs when baseFrame arrives / changes
  useEffect(() => {
    if (!baseFrame || !materialRef.current || !geometryRef.current) return;

    const geo = geometryRef.current;
    if (!geo.getAttribute('uv')) {
      // Bake static UVs from the base frame's snapshot landmarks
      const uvs = new Float32Array(468 * 2);
      for (let i = 0; i < 468; i++) {
        const lm = baseFrame.landmarks[i];
        if (lm) {
          uvs[i * 2] = lm.x;
          uvs[i * 2 + 1] = 1.0 - lm.y; // Invert Y for Three.js UV space
        }
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    }

    // Load texture image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = baseFrame.imageSrc;
    img.onload = () => {
      const mat = materialRef.current as any;
      if (!mat || !mat.uniforms) return;

      const texture = new THREE.Texture(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      
      mat.uniforms.uTexture.value = texture;
      mat.uniforms.uHasTexture.value = true;
      mat.uniforms.uOpacity.value = 1.0;
      mat.needsUpdate = true;
    };
  }, [baseFrame]);


  // Handle resize dynamically
  useEffect(() => {
    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.setSize(width, height);
      
      const aspect = width / height;
      cameraRef.current.left = -aspect * 0.6;
      cameraRef.current.right = aspect * 0.6;
      cameraRef.current.top = 0.6;
      cameraRef.current.bottom = -0.6;
      cameraRef.current.updateProjectionMatrix();

    }
  }, [width, height]);

  // Smoothing state
  const smoothedLandmarksRef = useRef<NormalizedLandmarkList | null>(null);
  const SMOOTHING_FACTOR = 0.45; // Lower = smoother but more lag

  // Update vertex positions when landmarks change
  useEffect(() => {
    if (!geometryRef.current || !landmarks) return;

    // Initialize smoothed landmarks if first frame
    if (!smoothedLandmarksRef.current) {
      smoothedLandmarksRef.current = JSON.parse(JSON.stringify(landmarks));
    }

    const posAttr = geometryRef.current.getAttribute('position') as THREE.BufferAttribute;
    const aspect = width / height;

    for (let i = 0; i < 468; i++) {
      const lm = landmarks[i];
      if (!lm) continue;

      // 1. Exponential Moving Average Smoothing
      const prev = smoothedLandmarksRef.current![i];
      const cur = {
        x: prev.x + (lm.x - prev.x) * SMOOTHING_FACTOR,
        y: prev.y + (lm.y - prev.y) * SMOOTHING_FACTOR,
        z: prev.z + (lm.z - prev.z) * SMOOTHING_FACTOR,
      };
      smoothedLandmarksRef.current![i] = cur;

      // 2. Coordinate Mapping (MediaPipe -> Three.js)
      // MediaPipe: [0,0] Top-Left. Three.js: [0,0] Center.
      
      // Horizontal scaling: maintain face proportions
      const x = (cur.x - 0.5) * aspect;
      
      // Vertical scaling: invert and center
      const y = 0.5 - cur.y; 
      
      // Depth scaling: landmarks[0].z is the relative depth.
      // We need to scale Z to prevent the "mashed" flat look or excessive "spike" look.
      // Multiplier 1.5 - 1.8 usually gives the most natural head depth.
      const z = -cur.z * aspect * 1.6; 

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
  }, [landmarks, width, height]);



  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #0b0f14 0%, #111827 100%)' }}
    />
  );
});
