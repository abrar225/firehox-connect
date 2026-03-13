// Direct WebSocket test to bypass Next.js compilation timeouts
const { io } = require('socket.io-client');
const crypto = require('crypto');

async function runTest() {
  return new Promise((resolve) => {
    const roomId = 'test-db-123';
    
    // Connect Alice
    const aliceSocket = io('http://127.0.0.1:3001/rooms', { path: '/ws' });
    const aliceId = crypto.randomUUID();
    
    aliceSocket.on('connect', () => {
      console.log('Alice connected. Joining room...');
      aliceSocket.emit('join_room', { roomId, userId: aliceId, displayName: 'AliceTest' });
    });

    // When Alice gets peer_list, connect Bob
    aliceSocket.on('peer_list', () => {
      console.log('Alice joined room.');
      
      const bobSocket = io('http://127.0.0.1:3001/rooms', { path: '/ws' });
      const bobId = crypto.randomUUID();
      
      bobSocket.on('connect', () => {
        console.log('Bob connected. Joining room...');
        bobSocket.emit('join_room', { roomId, userId: bobId, displayName: 'BobTest' });
      });

      // When Alice sees Bob join, the test is successful
      aliceSocket.on('peer_joined', () => {
        console.log('Alice saw Bob join. DB write successful.');
        aliceSocket.disconnect();
        bobSocket.disconnect();
        setTimeout(resolve, 500); // Wait for disconnects to finalize in DB
      });
    });
  });
}

runTest().then(() => {
  console.log('✅ Direct Socket Test Completed. Verifying DB...');
  require('../../packages/database/verify.js');
}).catch(console.error);
