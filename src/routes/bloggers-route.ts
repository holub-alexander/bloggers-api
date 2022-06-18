import { Router } from 'express';
import {
  addBlogger,
  deleteBloggerById,
  getAllBloggers,
  getBloggerById,
  updateBloggerById,
} from '../controllers/bloggers-contoller';
import bloggerValidationSchema from '../utils/validations/blogger-validation-schema';

const bloggersRoute = Router();

bloggersRoute.get('/bloggers', getAllBloggers);

bloggersRoute.get('/bloggers/:id', getBloggerById);

bloggersRoute.post('/bloggers', bloggerValidationSchema, addBlogger);

bloggersRoute.put('/bloggers/:id', bloggerValidationSchema, updateBloggerById);

bloggersRoute.delete('/bloggers/:id', deleteBloggerById);

export default bloggersRoute;
