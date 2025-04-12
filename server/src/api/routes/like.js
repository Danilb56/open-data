import { likeController } from '#core/controllers/like.js';
import express from 'express';

const router = express.Router();

router.post('/like', (req, res) => likeController.like(req, res));

router.post('/dislike', (req, res) => likeController.dislike(req, res));

export default router;
