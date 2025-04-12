import { prisma } from '#core/db.js';

class CardRepository {
  async getAll() {
    return await prisma.card.findMany({
      include: {
        author: { select: { name: true, age: true } },
        schedules: true,
        SportsObject_CardAddedObjects: { select: { location: true } },
      },
    });
  }
  async getCardByAuthorId(id) {
    return await prisma.card.findUnique({
      where: { authorId: id },
      include: {
        schedules: true,
        SportsObject_CardAddedObjects: { select: { location: true } },
      },
    });
  }
}

export const cardRepository = new CardRepository();
