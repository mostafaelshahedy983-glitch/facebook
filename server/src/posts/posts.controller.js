import { prisma } from '../db/prisma.js';

// CREATE POST
export async function createPost(req, res) {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = await prisma.post.create({
      data: {
        content,
        userId: req.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return res.status(201).json(post);

  } catch (error) {
    return res.status(500).json({ message: 'Create post failed', error: error.message });
  }
}

// GET FEED (all posts)
export async function getFeed(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return res.json(posts);

  } catch (error) {
    return res.status(500).json({ message: 'Fetch feed failed', error: error.message });
  }
}

// GET USER POSTS
export async function getUserPosts(req, res) {
  try {
    const { userId } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return res.json(posts);

  } catch (error) {
    return res.status(500).json({ message: 'Fetch user posts failed', error: error.message });
  }
}