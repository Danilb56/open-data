import { userController } from '#core/controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/create-card', (req, res) => userController.createCard(req, res));

export default router;
