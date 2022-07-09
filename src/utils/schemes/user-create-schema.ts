import { checkSchema } from 'express-validator';
import { userLoginValidation } from '../validations/bodyProperties/user-login-validation';
import { userPasswordValidation } from '../validations/bodyProperties/user-password-validation';

const userCreateSchema = checkSchema({
  login: userLoginValidation,
  password: userPasswordValidation,
});

export default userCreateSchema;
