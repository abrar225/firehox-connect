// =============================================================================
// FireHox Connect — Signaling Server
// Purpose: Room coordination + WebRTC signaling relay
// Architecture Rule: Server NEVER processes media streams
// =============================================================================

import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { prisma } from '@firehox/database';


const PORT = process.env.PORT || 3001;

// -----------------------------------------------------------------------------
// 1. Express HTTP Server
// -----------------------------------------------------------------------------

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

// -----------------------------------------------------------------------------
// 1.5 Room Validation APIs
// -----------------------------------------------------------------------------


app.post('/api/rooms', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    // Generate a 12-character alphanumeric room code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const roomCode = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    
    // Ensure User exists before creating room
    await prisma.user.upsert({
      where: { id: userId },
      update: { last_seen: new Date() },
      create: { id: userId },
    });

    const room = await prisma.room.create({
      data: {
        room_code: roomCode,
        host_user_id: userId,
        max_participants: 4,
        is_active: true,
      },
    });

    res.json({ roomCode: room.room_code });
  } catch (error) {
    console.error('[Signaling] Error creating room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/rooms/:roomId', async (req, res) => {
  try {
    const room = await prisma.room.findUnique({
      where: { room_code: req.params.roomId },
    });

    if (!room || !room.is_active) {
      return res.status(404).json({ error: 'Room not found or inactive' });
    }

    res.json(room);
  } catch (error) {
    console.error('[Signaling] Error fetching room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// -----------------------------------------------------------------------------
// 2. HTTP Server
// -----------------------------------------------------------------------------

const httpServer = createServer(app);

// -----------------------------------------------------------------------------
// 3. Socket.IO Signaling Server
// (Document 8, Section 2: Connection endpoint /ws, namespace /rooms)
// -----------------------------------------------------------------------------

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  path: '/ws',
});


const roomsNamespace = io.of('/rooms');

// We still need a quick way to look up who a socket is for WebRTC relay 
// without querying DB on every single ICE candidate (for performance).
const socketToUser = new Map<string, { userId: string; roomId: string; roomDbId: string; mode: string }>();


roomsNamespace.on('connection', (socket) => {
  console.log(`[Signaling] Socket connected: ${socket.id}`);

  // Handle room join
  socket.on('join_room', async (data: { roomId: string; userId: string; displayName: string }) => {
    const { roomId, userId, displayName } = data;

    try {
      // 1. Ensure Room exists in DB (Must be created via API first)
      const room = await prisma.room.findUnique({
        where: { room_code: roomId },
      });

      if (!room || !room.is_active) {
        socket.emit('error', { message: 'Meeting does not exist or is inactive' });
        return;
      }

      // 2. Enforce max participants
      const activeSessionsCount = await prisma.participantSession.count({
        where: {
          room_id: room.id,
          connection_status: 'connected',
        },
      });

      if (activeSessionsCount >= room.max_participants) {
        socket.emit('error', { message: 'Room is full (max 4 participants)' });
        return;
      }

      // 3. Ensure User exists
      await prisma.user.upsert({
        where: { id: userId },
        update: {
          last_seen: new Date(),
          optional_display_name: displayName,
        },
        create: {
          id: userId,
          optional_display_name: displayName,
        },
      });

      // 4. Create or update ParticipantSession
      await prisma.participantSession.create({
        data: {
          room_id: room.id,
          user_id: userId,
          socket_id: socket.id,
          connection_status: 'connected',
        },
      });

      // 5. Join Socket.IO room & update memory cache
      socket.join(roomId);
      socketToUser.set(socket.id, { userId, roomId, roomDbId: room.id, mode: 'pixel' });

      console.log(`[Signaling] User ${userId} (${displayName}) joined DB room ${roomId}`);


      // 6. Send existing peer list
      const existingPeers = await prisma.participantSession.findMany({
        where: {
          room_id: room.id,
          connection_status: 'connected',
          NOT: { socket_id: socket.id },
        },
        include: {
          user: true,
        },
      });

      const peers = existingPeers.map((p: any) => ({
        userId: p.user_id,
        socketId: p.socket_id,
        displayName: p.user?.optional_display_name || 'Guest',
        mode: socketToUser.get(p.socket_id)?.mode || 'pixel',
      }));
      socket.emit('peer_list', { peers });

      // 7. Notify others
      socket.to(roomId).emit('peer_joined', { 
        userId, 
        socketId: socket.id,
        displayName: displayName || 'Guest',
        mode: 'pixel'
      });



    } catch (error) {
      console.error('[Signaling] Join error:', error);
      socket.emit('error', { message: 'Internal server error joining room' });
    }
  });

  // WebRTC signaling relay — offer
  socket.on('webrtc_offer', async (data: { toUserId: string; sdp: string; roomId: string }) => {
    const user = socketToUser.get(socket.id);
    if (!user) return;

    // Find the target socket ID for the given toUserId in this room
    const targetSession = await prisma.participantSession.findFirst({
      where: {
        room: { room_code: data.roomId },
        user_id: data.toUserId,
        connection_status: 'connected'
      }
    });

    if (targetSession) {
      roomsNamespace.to(targetSession.socket_id).emit('webrtc_offer', {
        fromUserId: user.userId,
        sdp: data.sdp,
        fromSocketId: socket.id,
      });
    }
  });

  // WebRTC signaling relay — answer
  socket.on('webrtc_answer', async (data: { toUserId: string; sdp: string; roomId: string }) => {
    const user = socketToUser.get(socket.id);
    if (!user) return;

    const targetSession = await prisma.participantSession.findFirst({
      where: {
        room: { room_code: data.roomId },
        user_id: data.toUserId,
        connection_status: 'connected'
      }
    });

    if (targetSession) {
      roomsNamespace.to(targetSession.socket_id).emit('webrtc_answer', {
        fromUserId: user.userId,
        sdp: data.sdp,
        fromSocketId: socket.id,
      });
    }
  });

  // ICE candidate relay
  socket.on('ice_candidate', async (data: { toUserId: string; candidate: string; sdpMid: string; sdpMLineIndex: number; roomId: string }) => {
    const user = socketToUser.get(socket.id);
    if (!user) return;

    const targetSession = await prisma.participantSession.findFirst({
      where: {
        room: { room_code: data.roomId },
        user_id: data.toUserId,
        connection_status: 'connected'
      }
    });

    if (targetSession) {
      roomsNamespace.to(targetSession.socket_id).emit('ice_candidate', {
        fromUserId: user.userId,
        candidate: data.candidate,
        sdpMid: data.sdpMid,
        sdpMLineIndex: data.sdpMLineIndex,
        fromSocketId: socket.id,
      });
    }
  });

  // Mode update relay
  socket.on('update_mode', (data: { mode: string; roomId: string }) => {
    const user = socketToUser.get(socket.id);
    if (!user) return;

    user.mode = data.mode; // Update server memory state

    socket.to(data.roomId).emit('peer_mode_changed', {
      userId: user.userId,
      mode: data.mode
    });
  });



  // Handle disconnect
  socket.on('disconnect', async () => {
    const user = socketToUser.get(socket.id);
    if (user) {
      const { userId, roomId, roomDbId } = user;

      // 1. Notify remaining peers immediately
      socket.to(roomId).emit('peer_left', { userId });
      socketToUser.delete(socket.id);

      try {
        // 2. Update DB Session
        await prisma.participantSession.updateMany({
          where: { socket_id: socket.id },
          data: {
            connection_status: 'disconnected',
            left_at: new Date(),
          },
        });

        // 3. Mark room inactive if empty
        // NOTE: Commented out for now to allow hosts to refresh/return without killing the room.
        /*
        const activeCount = await prisma.participantSession.count({
          where: { room_id: roomDbId, connection_status: 'connected' },
        });

        if (activeCount === 0) {
          await prisma.room.update({
            where: { id: roomDbId },
            data: { is_active: false },
          });
          console.log(`[Signaling] DB Room ${roomId} marked inactive (empty)`);
        }
        */
      } catch (error) {
        console.error('[Signaling] Disconnect DB error:', error);
      }

      console.log(`[Signaling] User ${userId} disconnected from DB room ${roomId}`);
    }
  });
});

// -----------------------------------------------------------------------------
// 4. Start Server
// -----------------------------------------------------------------------------

httpServer.listen(PORT, () => {
  console.log(`\n🔥 FireHox Connect Signaling Server`);
  console.log(`   Health:    http://localhost:${PORT}/health`);
  console.log(`   Socket.IO: ws://localhost:${PORT}/ws`);
  console.log(`   Namespace: /rooms\n`);
});
