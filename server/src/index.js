import express from 'express';
import authRouter from '#api/routes/auth.js';
import cookieParser from 'cookie-parser';
import { withAuthMiddleware } from '#api/middleware.js';

const app = express();

app.use(cookieParser());
app.use(express.json({ type: '*/json' }));

app.use(withAuthMiddleware);

app.use('/auth', authRouter);
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World from the server!', uri: req.url.includes('/') });
});

app.get('/info', (req, res) => {
	res.send(process.env);
});

app.get('/protected-route', (req, res) => res.status(200).json({ message: 'Protected route' }));

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
