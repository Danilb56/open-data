import { userController } from '#core/controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/markers', (req, res) => userController.getMarkers(req, res));

export default router;
