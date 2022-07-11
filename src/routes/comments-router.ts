import { Router } from 'express';
import {
  addCommentForPost,
  deleteCommentById,
  getAllCommentsForPost,
  getCommentById,
} from '../controllers/comments-controller';
import authBearerMiddleware from '../middlewares/auth-bearer-middleware';
import commentCreateSchema from '../utils/schemes/comment-create-schema';
import postParamsSchema from '../utils/schemes/posts-params-schema';

const commentsRouter = Router();

commentsRouter.post(
  '/posts/:postId/comments',
  authBearerMiddleware,
  commentCreateSchema,
  addCommentForPost
);

commentsRouter.get('/posts/:postId/comments', postParamsSchema, getAllCommentsForPost);

commentsRouter.get('/comments/:id', getCommentById);

commentsRouter.delete('/comments/:commentId', authBearerMiddleware, deleteCommentById);

export default commentsRouter;
