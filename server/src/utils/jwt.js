import jwt from 'jsonwebtoken';

export function createAccessToken(payload, expires) {
  const token = jwt.sign(
    { expires, ...payload },
    process.env.ACCESS_TOKEN_SECRET,
  );
  return token;
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
