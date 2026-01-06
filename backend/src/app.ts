// The Gateway For Production Build On Vercel

import express from 'express';
import UserRouter from './routes/user.routes.js';

const app = express();

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/user', UserRouter);

export { app };
