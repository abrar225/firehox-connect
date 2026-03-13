# FireHox Connect - Project Documentation

## 1. Project Overview

**FireHox Connect** is a modern, WebRTC-based real-time video conferencing web application. Its standout feature is its dual-mode communication capability, allowing users to seamlessly switch between:
1. **Pixel Mode**: Standard high-quality video and audio streaming.
2. **Vector Mode (3D Avatar)**: A bandwidth-efficient, stylized rendering mode where the video feed is replaced by a real-time 3D Three.js mesh. The user's face is tracked using MediaPipe Face Mesh, and their facial landmarks are streamed over WebRTC DataChannels to animate a 3D hologram/avatar wrapped with their captured face texture.

## 2. System Architecture

The project is structured as a monorepo (using pnpm workspaces) with three main packages:

*   **`apps/frontend`**: A Next.js (React 18) application handling the user interface, video capture, WebRTC peer connections, and 3D rendering.
*   **`apps/signaling-server`**: A Node.js + Express + Socket.IO server responsible for room coordination and WebRTC signaling (relay of offers, answers, and ICE candidates).
*   **`packages/database`**: Defines the database schema using Prisma and generates the database client.
*   **`packages/shared-types`**: Contains shared TypeScript interfaces for socket payloads, WebRTC configurations, and database types to ensure end-to-end type safety.

## 3. Database Implementation

The database is built on **PostgreSQL** (hosted via Supabase), managed using **Prisma ORM**. It tracks the persistent state of users, rooms, and active sessions.

### Schema Details
*   **`User` (users)**:
    *   Tracks users connecting to the platform.
    *   Fields: `id` (UUID), `created_at`, `last_seen`, `optional_display_name`.
*   **`Room` (rooms)**:
    *   Represents a meeting room.
    *   Fields: `id`, `room_code` (unique 12-char code), `host_user_id`, `created_at`, `is_active`, `max_participants` (defaults to 4).
*   **`ParticipantSession` (participant_sessions)**:
    *   Maps a user to a room for a specific connection session.
    *   Fields: `id`, `room_id`, `user_id`, `socket_id`, `connection_status` (connected, disconnected, reconnecting), ` joined_at`, `left_at`.

When a user joins a room, the signaling server creates/updates these records to enforce room capacity limits (maximum 4 participants) and track active peers.

## 4. Signaling Server Logic

The Node.js server (`apps/signaling-server/src/index.ts`) uses Socket.IO on the `/ws` endpoint (and `/rooms` namespace). **Crucially, the server never processes media streams**; it only orchestrates connections.

**Key Socket Events:**
*   **`join_room`**: Validates the room limit via the database, creates a `ParticipantSession`, adds the socket to the internal room, and broadcasts a `peer_joined` event to others, while sending the newcomer a `peer_list`.
*   **`webrtc_offer` / `webrtc_answer` / `ice_candidate`**: Relays WebRTC negotiation payloads between peers to establish direct P2P connections.
*   **`update_mode`**: Relays when a user toggles between Vector and Pixel mode.
*   **`disconnect`**: Cleans up the user's `ParticipantSession`, removing them from the active list, and marks the room as inactive if it becomes empty.

## 5. Frontend & Core Implementations

### A. State Management (Zustand)
The application state is heavily managed by a robust Zustand store (`useMeetingStore`).
It holds:
*   **Room State**: Room ID, connection status.
*   **Self State**: User ID, Display Name, Mic/Camera toggles, Current Mode (pixel/vector), Local MediaStream, and Local Base Frame.
*   **Remote State**: Participant list, remote Base Frames.

### B. WebRTC & Peer-to-Peer (`useWebRTC` Hook)
The frontend uses **`simple-peer`** to manage RTCPeerConnections.
It handles multiple data streams per connection:
1.  **Media Stream**: Normal audio/video tracks.
2.  **Data Channel (`landmarks`)**: An **unordered, unreliable** (no retransmits) channel (`maxRetransmits: 0`) designed for extremely low latency. It continuously streams the 468 MediaPipe facial landmark coordinates (encoded to ArrayBuffer, decoded on the other side) at 20-30 FPS.
3.  **Data Channel (`baseFrame`)**: An **ordered, reliable** channel used to send the user's "Base Frame" (a static snapshot image of their face + its static landmarks) once at the start of the session to texture the 3D mesh.

### C. Face Tracking (`useFaceMesh` Hook)
Uses Google's `@mediapipe/face_mesh` (loaded via CDN to optimize performance and prevent WASM conflicts). It continuously analyzes the local video feed, detects 468 3D facial landmarks, and updates the local state which is then broadcasted to peers over the `landmarks` DataChannel.

### D. Render Engine: 3D Avatar (`AvatarRenderer` Component)
When a user switches to **Vector Mode**:
*   **Three.js Environment**: Sets up a `WebGLRenderer`, `Scene`, and an `OrthographicCamera` centered on the mesh.
*   **Mesh Generation**: Dynamically extracts the face triangulation grid from `FACEMESH_TESSELATION` to bind the 468 vertices into a continuous geometric surface.
*   **Custom Shaders**: Employs highly customized WebGL vertex and fragment shaders.
    *   Creates a premium "Hologram" look featuring interactive grid lines, scanline animations, soft transparent outer edges, and darkened eye sockets.
    *   Receives the remote user's Base Frame image, UV-maps it (baking UVs from the Base Frame's static landmarks), and projects it onto the moving geometry.
*   **Animation**: The received WebRTC landmarks are smoothed using an Exponential Moving Average (EMA) to reduce jitter, scaled based on the viewport aspect ratio, and mapped directly to the Three.js BufferGeometry vertices in real-time.

## 6. What We Have Achieved So Far

1.  **Repository Foundation & Architecture**: Established the monorepo structure, Next.js frontend, and Node.js Socket.IO external signaling server.
2.  **Database Integration**: Configured Prisma with PostgreSQL (Supabase) and implemented proper session management, tracking active connections strictly.
3.  **Real-Time P2P Network Built**: WebRTC mesh networking is fully operational using `simple-peer` and Socket.IO for signaling. Handshakes (Offers/Answers/ICE) are fully working.
4.  **Optimized DataChannels implemented**: Segregated low-latency unreliable channels for facial data vs reliable channels for BaseFrames.
5.  **Face Tracking Pipeline**: Implemented a highly performant MediaPipe Face Mesh integration that tracks faces and emits 3D vectors without interrupting the main UI thread.
6.  **Advanced 3D Renderer**: Built the `AvatarRenderer` from scratch in Three.js, mapping 2D flat video into a 3D stylistic topology with custom shaders that wrap facial textures cleanly over geometric representations, creating a high-fidelity "Vector" mode.
7.  **Dynamic UI**: Fully functional participant grids, control toggles, and UI states (loading, no camera, muted overlays) built with React and TailwindCSS.

This represents a complete, functional Phase-1 of FireHox Connect with complex multimedia pipelines operating harmoniously.
