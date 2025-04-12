import { prisma } from '#core/db.js';

class LikeRepository {
  async createLike(userId, cardId) {
    await prisma.UserLikedCards.create({
      data: { userId, cardId },
    });
  }

  async createDislike(userId, cardId) {
    await prisma.UserDislikedCards.create({
      data: { userId, cardId },
    });
  }

  async getUserLikes(userId) {
    return await prisma.UserLikedCards.findMany({
      where: { userId },
      select: { cardId: true },
    });
  }

  async getUserDislikes(userId) {
    return await prisma.UserDislikedCards.findMany({
      where: { userId },
      select: { cardId: true },
    });
  }

  async whoLikedCard(cardId) {
    return await prisma.UserLikedCards.findMany({
      where: { cardId },
      select: { userId: true },
    });
  }

  async whoDislikedCard(cardId) {
    return await prisma.UserDislikedCards.findMany({
      where: { cardId },
      select: { userId: true },
    });
  }
}

export const likeRepository = new LikeRepository();
