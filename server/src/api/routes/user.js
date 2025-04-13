import { userController } from '#core/controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/create-card', (req, res) => userController.createCard(req, res));

router.get('/cards', (req, res) => userController.getCards(req, res));

router.get('/likes', (req, res) => userController.getLikes(req, res));

router.get('/contacts', (req, res) => userController.getContacts(req, res));

export default router;
