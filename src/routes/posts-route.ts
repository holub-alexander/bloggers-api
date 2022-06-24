import { Router } from 'express';
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/posts-controller';
import authMiddleware from '../middlewares/auth-middleware';
import postValidationParameters from '../utils/validations/post-validation-params';
import postValidationSchema from '../utils/validations/post-validation-schema.ts';

const postsRoute = Router();

postsRoute.get('/posts', postValidationParameters, getAllPosts);

postsRoute.get('/posts/:id', getPostById);

postsRoute.post('/posts', authMiddleware, postValidationSchema, addPost);

postsRoute.put('/posts/:id', authMiddleware, postValidationSchema, updatePostById);

postsRoute.delete('/posts/:id', authMiddleware, deletePostById);

export default postsRoute;
