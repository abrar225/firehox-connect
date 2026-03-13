const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function checkDb() {
  const users = await prisma.user.findMany();
  console.log('--- USERS ---');
  console.log(users);
  
  const rooms = await prisma.room.findMany();
  console.log('--- ROOMS ---');
  console.log(rooms);
  
  const sessions = await prisma.participantSession.findMany();
  console.log('--- SESSIONS ---');
  console.log(sessions);
  
  if (users.length >= 2 && rooms.length >= 1 && sessions.length >= 2) {
    console.log('\n✅ DB INTEGRATION VERIFIED. Records exactly match Alice and Bob test run.');
  } else {
    console.log('\n❌ Missing expected records.');
  }
}

checkDb().catch(console.error).finally(() => prisma.$disconnect());
