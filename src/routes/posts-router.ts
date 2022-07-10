import { Router } from 'express';
import {
  addCommentForPost,
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/posts-controller';
import authMiddleware from '../middlewares/auth-middleware';
import postParamsSchema from '../utils/schemes/posts-params-schema';
import postCreateSchema from '../utils/schemes/post-create-schema.ts';
import commentCreateSchema from '../utils/schemes/comment-create-schema';
import authBearerMiddleware from '../middlewares/auth-bearer-middleware';

const postsRoute = Router();

postsRoute.get('/posts', postParamsSchema, getAllPosts);

postsRoute.get('/posts/:id', getPostById);

postsRoute.post('/posts', authMiddleware, postCreateSchema, addPost);

postsRoute.post(
  '/posts/:postId/comments',
  authBearerMiddleware,
  commentCreateSchema,
  addCommentForPost
);

postsRoute.put('/posts/:id', authMiddleware, postCreateSchema, updatePostById);

postsRoute.delete('/posts/:id', authMiddleware, deletePostById);

export default postsRoute;
