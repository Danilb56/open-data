import { userController } from '#core/controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/create-card', (req, res) => userController.createCard(req, res));

router.get('/cards', (req, res) => userController.getCards(req, res));

router.get('/likes', (req, res) => userController.getLikes(req, res));

router.get('/contacts', (req, res) => userController.getContacts(req, res));

router.get('/', (req, res) => userController.getProfile(req, res));

router.put('/', (req, res) => userController.updateUser(req, res));

router.put('/schedules', (req, res) =>
  userController.updateSchedules(req, res),
);

router.put('/locations', (req, res) =>
  userController.updateLocations(req, res),
);

export default router;
