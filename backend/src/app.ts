// The Gateway For Production Build On Vercel

import cors from 'cors';
import express from 'express';
import AccountRouter from './routes/account.routes.js';
import UserRouter from './routes/user.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/user', UserRouter);
app.use('/api/account', AccountRouter);

export { app };
