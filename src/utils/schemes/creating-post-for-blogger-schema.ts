import { checkSchema } from 'express-validator';
import { postContentValidation } from '../validations/bodyProperties/post-content-validation';
import { postShortDescriptionValidation } from '../validations/bodyProperties/post-short-description-validation';
import { postTitleValidation } from '../validations/bodyProperties/post-title-validation';

const creatingPostForBloggerSchema = checkSchema({
  title: postTitleValidation,
  shortDescription: postShortDescriptionValidation,
  content: postContentValidation,
});

export default creatingPostForBloggerSchema;
