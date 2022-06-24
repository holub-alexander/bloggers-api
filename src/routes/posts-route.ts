import { Router } from 'express';
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/posts-controller';
import authMiddleware from '../middlewares/auth-middleware';
import postParamsSchema from '../utils/schemes/posts-params-schema';
import postCreateSchema from '../utils/schemes/post-create-schema.ts';

const postsRoute = Router();

postsRoute.get('/posts', postParamsSchema, getAllPosts);

postsRoute.get('/posts/:id', getPostById);

postsRoute.post('/posts', authMiddleware, postCreateSchema, addPost);

postsRoute.put('/posts/:id', authMiddleware, postCreateSchema, updatePostById);

postsRoute.delete('/posts/:id', authMiddleware, deletePostById);

export default postsRoute;
