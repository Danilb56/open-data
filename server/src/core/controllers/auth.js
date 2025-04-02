import { verifyAccessToken } from '#utils/jwt.js';
import { createAccessToken } from '#utils/jwt.js';
import { userRepository } from '#core/repositories/user.js';
import { hashPassword, comparePassword } from '#utils/security.js';

const ACCESS_TOKEN_KEY = 'access_token';
const MAX_AGE = 24 * 60 * 60 * 1000;

function sendAuthCookie(res, token) {
  res.cookie(ACCESS_TOKEN_KEY, token, {
    maxAge: MAX_AGE,
    httpOnly: true,
  });
  res.status(200).json({ success: true });
}

function handleLogout(req, res) {
  res.clearCookie(ACCESS_TOKEN_KEY);
  res.sendStatus(401);
}

async function handleSignup(req, res) {
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
      .status(400)
      .json({
        message: 'User with this email already exists',
      })
      .send();

  const { password, ...rest } = userCredentials;

  const user = await userRepository.createUser({
    ...rest,
    hashedPassword: await hashPassword(password),
  });

  const token = createAccessToken({ sub: user.id, role: 'user' }, MAX_AGE);

  sendAuthCookie(res, token);
}

async function handleValidateAccessToken(req, res) {
  if (!req.cookies.access_token) return res.sendStatus(401);

  const token = verifyAccessToken(req.cookies.access_token);

  if (!token) res.sendStatus(401);

  res
    .json({
      success: true,
      user: { id: token.sub, role: token.role },
    })
    .status(200);
}

async function handleLogin(req, res) {
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

  const token = createAccessToken({ sub: user.id, role: 'user' }, MAX_AGE);

  sendAuthCookie(res, token);
}

export { handleSignup, handleLogin, handleLogout, handleValidateAccessToken };
