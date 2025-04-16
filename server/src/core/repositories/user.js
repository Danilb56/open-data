import { prisma } from '#core/db.js';

class UserRepository {
  async createUser(user) {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  }

  async findUserByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findUserById(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async updateUser(id, user) {
    const updatedUser = await prisma.user.update({ where: { id }, data: user });
    return updatedUser;
  }
  async updateLocations(id, locations) {
    const userCard = await prisma.card.findUnique({ where: { authorId: id } });
    await prisma.card.update({
      where: { id: userCard.id },
      data: {
        SportsObject_CardAddedObjects: {
          deleteMany: {},
        },
      },
    });
    await prisma.card.update({
      where: { id: userCard.id },
      data: {
        SportsObject_CardAddedObjects: {
          connect: locations.map((location) => ({ locationId: location.id })),
        },
      },
    });
  }

  async updateSchedules(id, schedules) {
    const userCard = await prisma.card.findUnique({ where: { authorId: id } });
    await prisma.schedule.deleteMany({ where: { cardId: userCard.id } });
    await prisma.card.update({
      where: { id: userCard.id },
      data: {
        schedules: {
          create: Object.entries(schedules)
            .filter(([, schedule]) => schedule.active)
            .map(([day, schedule]) => ({
              dayOfWeek: day,
              startTime: schedule.start,
              endTime: schedule.end,
            })),
        },
      },
    });
  }

  async createCard(userId, data) {
    const createdCard = await prisma.card.create({
      data: {
        schedules: {
          create: Object.entries(data.schedules)
            .filter(([, schedule]) => schedule.active)
            .map(([day, schedule]) => ({
              dayOfWeek: day,
              startTime: schedule.start,
              endTime: schedule.end,
            })),
        },
        SportsObject_CardAddedObjects: {
          connect: data.locations.map((id) => ({ locationId: id })),
        },
        authorId: userId,
      },
    });
    return createdCard;
  }
}

export const userRepository = new UserRepository();
