import {
  handleSignup,
  handleLogin,
  handleLogout,
  handleValidateAccessToken,
} from '#core/controllers/auth.js';
import express from 'express';
const router = express.Router();

router.get('/validate-access-token', handleValidateAccessToken);

router.get('/logout', handleLogout);

router.post('/login', handleLogin);

router.post('/signup', handleSignup);

export default router;
