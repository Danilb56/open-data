import express from 'express';
import { verifyAccessToken } from '#utils/jwt.js';
import { createAccessToken } from '#utils/jwt.js';
import { userRepository } from '#core/repositories/user.js';
const router = express.Router();

router.get('/validate-access-token', (req, res) => {
	const token = verifyAccessToken(req.cookies.access_token);
	if (!token) res.status(200).json({ cookie: req.cookies.access_token });
	res.json(token).status(200);
});

router.get('/logout', (req, res) => {
	res.clearCookie('token');
	res.sendStatus(200);
});

router.get('/login', (req, res) => {
	const token = createAccessToken({ sub: 'exampleUser', role: 'user' }, 60 * 60 * 24 * 7);
	res.cookie('access_token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // 2 hours
	res.status(200).json({ token });
});

router.post('/signup', async (req, res) => {
	const userCredentials = req.body.user;
	if (!userCredentials) return res.status(400).json({ message: 'User credentials are required' });

	if (!userCredentials.email || !userCredentials.password)
		return res.status(400).json({ message: 'Email and password are required' });

	if (await userRepository.findUserByEmail(userCredentials.email))
		return res.status(400).json({ message: 'User with this email already exists' });

	const { password, ...rest } = userCredentials;
	const user = await userRepository.createUser({ ...rest, hashedPassword: password });
	res.status(200).json({ ...user, password: undefined });
});

export default router;
