import { Router } from 'express';
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../controllers/posts-controller';
import postValidationSchema from '../utils/validations/post-validation-schema.ts';

const postsRoute = Router();

postsRoute.get('/posts', getAllPosts);

postsRoute.get('/posts/:id', getPostById);

postsRoute.post('/posts', postValidationSchema, addPost);

postsRoute.put('/posts/:id', postValidationSchema, updatePostById);

postsRoute.delete('/posts/:id', deletePostById);

export default postsRoute;
