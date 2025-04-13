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

  async getCardsWhoLiked(userId) {
    const userCard = await prisma.card.findUnique({
      where: { authorId: userId },
      select: { id: true },
    });

    const users = await prisma.UserLikedCards.findMany({
      where: { cardId: userCard.id },
      select: { userId: true },
    });

    const cards = await prisma.card.findMany({
      where: { authorId: { in: users.map((user) => user.userId) } },
      include: {
        author: { select: { name: true, age: true } },
        schedules: true,
        SportsObject_CardAddedObjects: { select: { location: true } },
      },
    });
    return cards;
  }
  async getCardsWhoLikedWithContacts(userId) {
    const userCard = await prisma.card.findUnique({
      where: { authorId: userId },
      select: { id: true },
    });

    const users = await prisma.UserLikedCards.findMany({
      where: { cardId: userCard.id },
      select: { userId: true },
    });

    const cards = await prisma.card.findMany({
      where: { authorId: { in: users.map((user) => user.userId) } },
      include: {
        author: true,
        schedules: true,
        SportsObject_CardAddedObjects: { select: { location: true } },
      },
    });
    return cards;
  }
}

export const cardRepository = new CardRepository();
