import { Router } from 'express';
import { addCommentForPost, getAllCommentsForPost } from '../controllers/comments-controller';
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

export default commentsRouter;
