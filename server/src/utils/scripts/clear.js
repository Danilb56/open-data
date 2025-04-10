import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  await prisma.schedule.deleteMany();
  await prisma.card.deleteMany();
  await prisma.user.deleteMany();
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
