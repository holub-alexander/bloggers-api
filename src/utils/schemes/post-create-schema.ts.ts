import { checkSchema } from 'express-validator';
import { bloggerIdValidation } from '../validations/bodyProperties/blogger-id-validation';
import { postContentValidation } from '../validations/bodyProperties/post-content-validation';
import { postShortDescriptionValidation } from '../validations/bodyProperties/post-short-description-validation';
import { postTitleValidation } from '../validations/bodyProperties/post-title-validation';

const postValidationSchema = checkSchema({
  title: postTitleValidation,
  shortDescription: postShortDescriptionValidation,
  content: postContentValidation,
  bloggerId: bloggerIdValidation,
});

export default postValidationSchema;
