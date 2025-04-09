import { verifyAccessToken } from '#utils/jwt.js';

const protectedRoutes = ['/protected-route'];

export function withAuthMiddleware(req, res, next) {
  if (!req.ctx) return res.sendStatus(401);
  next();
}

export function ctxMiddleware(req, res, next) {
  if (!req.cookies.access_token) return next();
  req.ctx = verifyAccessToken(req.cookies.access_token);
  console.info(req.ctx);
  next();
}

export function errorMiddleware(req, res, next) {
  try {
    next();
  } catch (e) {
    console.info(req.ctx);
    console.error(e);
    res.sendStatus(500);
  }
}
