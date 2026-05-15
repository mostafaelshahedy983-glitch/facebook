import express from 'express';
import { createPost, getFeed, getUserPosts } from './posts.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create post (protected)
router.post('/', authMiddleware, createPost);

// Get feed (protected)
router.get('/feed', authMiddleware, getFeed);

// Get user posts (protected)
router.get('/user/:userId', authMiddleware, getUserPosts);

export default router;