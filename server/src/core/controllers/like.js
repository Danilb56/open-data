import { likeRepository } from '#core/repositories/like.js';

class LikeController {
  async like(req, res) {
    const userId = req.ctx.sub;
    const { cardId } = req.body;
    await likeRepository.createLike(userId, cardId);
    res.sendStatus(200);
  }

  async dislike(req, res) {
    const userId = req.ctx.sub;
    const cardId = req.body.cardId;
    await likeRepository.createDislike(userId, cardId);
    res.sendStatus(200);
  }
}

export const likeController = new LikeController();
