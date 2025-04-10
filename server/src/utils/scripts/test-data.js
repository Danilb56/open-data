import { fakerRU, faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sportsObjects = await prisma.sportsObject.findMany({
  select: { global_id: true },
});

function getRandomDays() {
  const daysArray = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const randomCount = Math.floor(Math.random() * 7) + 1;
  const shuffled = [...daysArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, randomCount);
}

function createUser() {
  return {
    hashedPassword: 'fake-password',
    email: fakerRU.internet.email(),
    phone:
      '+7' +
      fakerRU.phone
        .number()
        .replaceAll('-', '')
        .replaceAll('(', '')
        .replaceAll(')', ''),
    tgUsername: fakerRU.internet.username(),
    name: fakerRU.person.firstName(),
    age: fakerRU.number.int({ min: 18, max: 60 }),
    card: createCard(),
  };
}

function createSchedule(dayOfWeek) {
  const times = faker.date
    .betweens({
      from: '2023-01-01T00:00:00.000Z',
      to: '2023-01-02T00:00:00.000Z',
      count: 2,
    })
    .map((date) =>
      date
        .toISOString()
        .split('T')[1]
        .split(':')
        .filter((_, i) => i < 2)
        .join(':'),
    );
  return {
    dayOfWeek: dayOfWeek,
    startTime: times[0],
    endTime: times[1],
  };
}

function createCard() {
  const randomCount = Math.floor(Math.random() * 10) + 1;
  const shuffled = [...sportsObjects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const locations = shuffled.slice(0, randomCount);
  return {
    schedules: { create: getRandomDays().map((day) => createSchedule(day)) },
    SportsObject_CardAddedObjects: {
      connect: locations.map((obj) => ({ global_id: obj.global_id })),
    },
  };
}

(async function main() {
  const users = faker.helpers.multiple(createUser, {
    count: 1000,
  });
  users.map(async (user) => {
    const { card, ...rest } = user;
    const createdUser = await prisma.user.create({ data: rest });
    const createdCard = await prisma.card.create({
      data: { ...card, authorId: createdUser.id },
    });
    console.log(createdUser);
    console.log(createdCard);
  });
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
