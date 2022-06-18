import { Router } from 'express';
import {
  addBlogger,
  deleteBloggerById,
  getAllBloggers,
  getBloggerById,
  updateBloggerById,
} from '../controllers/bloggers-contoller';
import authMiddleware from '../middlewares/auth-middleware';
import bloggerValidationSchema from '../utils/validations/blogger-validation-schema';

const bloggersRoute = Router();

bloggersRoute.get('/bloggers', getAllBloggers);

bloggersRoute.get('/bloggers/:id', getBloggerById);

bloggersRoute.post('/bloggers', authMiddleware, bloggerValidationSchema, addBlogger);

bloggersRoute.put('/bloggers/:id', authMiddleware, bloggerValidationSchema, updateBloggerById);

bloggersRoute.delete('/bloggers/:id', authMiddleware, deleteBloggerById);

export default bloggersRoute;
