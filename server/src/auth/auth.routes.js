import express from 'express';
import { register, login, me } from './auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

export default router;