import { checkSchema } from 'express-validator';
import { commeentContentValidation } from '../validations/bodyProperties/comment-content-validation';

const commentCreateSchema = checkSchema({
  content: commeentContentValidation,
});

export default commentCreateSchema;
