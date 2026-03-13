/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared-types'],

  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent webpack from bundling MediaPipe WASM packages.
      // They must be loaded via CDN <script> tags to avoid Module.arguments conflict.
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        { '@mediapipe/face_mesh': 'globalThis.FaceMeshLib' },
      ];
    }
    return config;
  },
};

export default nextConfig;

