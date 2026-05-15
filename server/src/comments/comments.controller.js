import { prisma } from '../db/prisma.js';

// CREATE COMMENT
export async function createComment(req, res) {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ message: 'postId and text are required' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId: req.user.id
      },
      include: {
        post: true
      }
    });

    return res.status(201).json(comment);

  } catch (error) {
    return res.status(500).json({ message: 'Create comment failed', error: error.message });
  }
}

// GET COMMENTS FOR POST
export async function getComments(req, res) {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: {
        post: true
      }
    });

    return res.json(comments);

  } catch (error) {
    return res.status(500).json({ message: 'Fetch comments failed', error: error.message });
  }
}