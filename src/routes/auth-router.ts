import { Router } from 'express';
import { loginUser } from '../controllers/auth-controller';
import userCreateSchema from '../utils/schemes/user-create-schema';

const authRouter = Router();

authRouter.post('/auth/login', userCreateSchema, loginUser);

export default authRouter;
