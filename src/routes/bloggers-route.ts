import { Router } from 'express';
import {
  addBlogger,
  deleteBloggerById,
  getAllBloggers,
  getBloggerById,
  updateBloggerById,
} from '../controllers/bloggers-contoller';
import { addPost, getAllBloggerPosts } from '../controllers/posts-controller';
import authMiddleware from '../middlewares/auth-middleware';
import bloggerParamsSchema from '../utils/schemes/blogger-params-schema';
import bloggerCreateSchema from '../utils/schemes/blogger-create-schema';
import postParamsSchema from '../utils/schemes/posts-params-schema';
import creatingPostForBloggerSchema from '../utils/schemes/creating-post-for-blogger-schema';

const bloggersRoute = Router();

bloggersRoute.get('/bloggers', bloggerParamsSchema, getAllBloggers);

bloggersRoute.get('/bloggers/:id', getBloggerById);

bloggersRoute.post('/bloggers', authMiddleware, bloggerCreateSchema, addBlogger);

bloggersRoute.put('/bloggers/:id', authMiddleware, bloggerCreateSchema, updateBloggerById);

bloggersRoute.delete('/bloggers/:id', authMiddleware, deleteBloggerById);

bloggersRoute.get('/bloggers/:bloggerId/posts', postParamsSchema, getAllBloggerPosts);

bloggersRoute.post(
  '/bloggers/:bloggerId/posts',
  authMiddleware,
  creatingPostForBloggerSchema,
  addPost
);

export default bloggersRoute;
