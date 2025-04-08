import express from 'express';
import authRouter from '#api/routes/auth.js';
import geoRouter from '#api/routes/geo.js';
import cookieParser from 'cookie-parser';
import { withAuthMiddleware } from '#api/middleware.js';
import helmet from 'helmet';
import cors from 'cors';

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
app.use(withAuthMiddleware);

app.use('/auth', authRouter);
app.use('/geo', geoRouter);
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World from the server!',
  });
});

app.get('/info', (req, res) => {
  res.send(process.env);
});

app.get('/protected-route', (req, res) =>
  res.status(200).json({ message: 'Protected route' }),
);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
