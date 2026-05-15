import express from 'express';
import cors from 'cors';

import authRoutes from './auth/auth.routes.js';
import postsRoutes from './posts/posts.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'facebook-backend' });
});

// API routes
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

export default app;