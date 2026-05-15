import { prisma } from '../db/prisma.js';

// TOGGLE LIKE (like / unlike)
export async function toggleLike(req, res) {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: 'postId is required' });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.user.id,
          postId
        }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: req.user.id,
            postId
          }
        }
      });

      return res.json({ liked: false });
    }

    await prisma.like.create({
      data: {
        userId: req.user.id,
        postId
      }
    });

    return res.json({ liked: true });

  } catch (error) {
    return res.status(500).json({ message: 'Toggle like failed', error: error.message });
  }
}

// GET LIKES COUNT
export async function getLikes(req, res) {
  try {
    const { postId } = req.params;

    const count = await prisma.like.count({
      where: { postId }
    });

    return res.json({ postId, likes: count });

  } catch (error) {
    return res.status(500).json({ message: 'Fetch likes failed', error: error.message });
  }
}