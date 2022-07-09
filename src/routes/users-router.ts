import { Router } from 'express';
import { addUser, deleteUserById, getAllUsers } from '../controllers/users-controller';
import authMiddleware from '../middlewares/auth-middleware';
import postParamsSchema from '../utils/schemes/posts-params-schema';
import userCreateSchema from '../utils/schemes/user-create-schema';

const usersRouter = Router();

usersRouter.get('/users', postParamsSchema, getAllUsers);

usersRouter.post('/users', authMiddleware, userCreateSchema, addUser);

usersRouter.delete('/users/:id', authMiddleware, deleteUserById);

export default usersRouter;
