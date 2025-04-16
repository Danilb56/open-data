import { likeController } from '#core/controllers/like.js';
import express from 'express';
import { withAuthMiddleware } from '#api/middleware.js';

const router = express.Router();

router.use(withAuthMiddleware);

router.post('/like', (req, res) => likeController.like(req, res));

router.post('/dislike', (req, res) => likeController.dislike(req, res));

export default router;
