import { verifyAccessToken } from '#utils/jwt.js';
import { createAccessToken } from '#utils/jwt.js';
import { userRepository } from '#core/repositories/user.js';
import { cardRepository } from '#core/repositories/card.js';
import { hashPassword, comparePassword } from '#utils/security.js';

class AuthController {
  constructor() {
    this.ACCESS_TOKEN_KEY = 'access_token';
    this.MAX_AGE = 24 * 60 * 60 * 1000;
  }

  sendAuthCookie(res, token) {
    res.cookie(this.ACCESS_TOKEN_KEY, token, {
      maxAge: this.MAX_AGE,
      httpOnly: true,
    });
    res.status(200).json({ success: true });
  }

  handleLogout(req, res) {
    res.clearCookie(this.ACCESS_TOKEN_KEY);
    res.sendStatus(401);
  }

  async handleSignup(req, res) {
    const userCredentials = req.body.user;
    if (!userCredentials)
      return res
        .status(400)
        .json({ message: 'User credentials are required' })
        .send();

    if (!userCredentials.email)
      return res.status(400).json({ message: 'Email is required' }).send();

    if (!userCredentials.password)
      return res.status(400).json({ message: 'Password is required' }).send();

    if (await userRepository.findUserByEmail(userCredentials.email))
      return res
        .status(409)
        .json({
          message: 'User with this email already exists',
        })
        .send();

    const { password, ...rest } = userCredentials;

    const user = await userRepository.createUser({
      ...rest,
      hashedPassword: await hashPassword(password),
    });

    const token = createAccessToken(
      { sub: user.id, role: 'user' },
      this.MAX_AGE,
    );

    this.sendAuthCookie(res, token);
  }

  async handleValidateAccessToken(req, res) {
    if (!req.cookies.access_token) return res.sendStatus(401);

    const token = verifyAccessToken(req.cookies.access_token);

    if (!token) res.sendStatus(401);

    const card = await cardRepository.getCardByAuthorId(token.sub);

    res
      .json({
        success: true,
        user: { id: token.sub, role: token.role },
        cardId: card ? card.id : null,
      })
      .status(200);
  }

  async handleLogin(req, res) {
    const userCredentials = req.body.user;
    if (!userCredentials || !userCredentials.email || !userCredentials.password)
      return res.status(400).json({ message: 'User credentials are required' });

    const user = await userRepository.findUserByEmail(userCredentials.email);

    if (!user)
      return res
        .status(400)
        .json({ message: 'User with this email does not exist' });

    if (!(await comparePassword(userCredentials.password, user.hashedPassword)))
      return res.status(400).json({ message: 'Incorrect password' });

    const token = createAccessToken(
      { sub: user.id, role: 'user' },
      this.MAX_AGE,
    );

    this.sendAuthCookie(res, token);
  }
}

export const authController = new AuthController();
