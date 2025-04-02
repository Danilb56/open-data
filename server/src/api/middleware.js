import { verifyAccessToken } from '#utils/jwt.js';

const protectedRoutes = ['/protected-route'];

export function withAuthMiddleware(req, res, next) {
  try {
    if (!protectedRoutes.includes(req.url)) return next();
    if (!req.cookies.access_token) return res.sendStatus(401);
    if (verifyAccessToken(req.cookies.access_token)) return next();

    res.sendStatus(401);
  } catch (e) {
    res.sendStatus(500);
  }
}
