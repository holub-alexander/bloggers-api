import { checkSchema } from 'express-validator';
import { nameValidation } from '../validations/bodyProperties/name-validation';
import { youtubeUrlValidation } from '../validations/bodyProperties/youtube-url-validation';

const bloggerCreateSchema = checkSchema({
  name: nameValidation,
  youtubeUrl: youtubeUrlValidation,
});

export default bloggerCreateSchema;
