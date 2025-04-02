import { authController } from '#core/controllers/auth.js';
import express from 'express';
const router = express.Router();

router.get('/validate-access-token', (req, res) =>
  authController.handleValidateAccessToken(req, res),
);

router.get('/logout', (req, res) => authController.handleLogout(req, res));

router.post('/login', (req, res) => authController.handleLogin(req, res));

router.post('/signup', (req, res) => authController.handleSignup(req, res));

export default router;
