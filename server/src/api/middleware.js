import { verifyAccessToken } from '#utils/jwt.js';

const protectedRoutes = ['/protected-route'];

export function withAuthMiddleware(req, res, next) {
	if (!protectedRoutes.includes(req.url)) return next();
	if (verifyAccessToken(req.cookies.access_token)) return next();

	res.redirect(301, process.env.CLIENT_URL || 'http://localhost:3030' + '/login');
}
