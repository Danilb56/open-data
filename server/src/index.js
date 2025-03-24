import express from 'express';
import authRouter from '#api/routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json({ type: '*/json' }));
app.use('/auth', authRouter);
app.get('/', (req, res) => {
	res.send('Hello World from the server!');
});

app.get('/info', (req, res) => {
	res.send(process.env);
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
