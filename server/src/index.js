import {
  ctxMiddleware,
  errorMiddleware,
  withAuthMiddleware,
} from '#api/middleware.js';
import authRouter from '#api/routes/auth.js';
import geoRouter from '#api/routes/geo.js';
import likeRouter from '#api/routes/like.js';
import userRouter from '#api/routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ type: '*/json' }));

// Middleware
app.use(ctxMiddleware);
app.use(errorMiddleware);

app.use('/auth', authRouter);
app.use('/geo', geoRouter);
app.use('/user', userRouter);
app.use('/likes', likeRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World from the server!',
  });
});

app.get('/info', (req, res) => {
  res.send(process.env);
});

app.get('/protected-route', withAuthMiddleware, (req, res) =>
  res.status(200).json({ message: 'Protected route' }),
);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
