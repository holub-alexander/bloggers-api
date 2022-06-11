import { checkSchema } from 'express-validator';

const postValidationSchema = checkSchema({
  title: {
    customSanitizer: {
      options: (value: string) => value?.trim(),
    },
    isLength: {
      errorMessage: 'Title length cannot exceed 30 characters',
      options: { max: 30, min: 1 },
    },
  },
  shortDescription: {
    customSanitizer: {
      options: (value: string) => value?.trim(),
    },
    isLength: {
      errorMessage: 'Short description length cannot exceed 100 characters',
      options: { max: 100, min: 1 },
    },
  },
  content: {
    customSanitizer: {
      options: (value: string) => value?.trim(),
    },
    isLength: {
      errorMessage: 'Content length cannot exceed 1000 characters',
      options: { max: 100, min: 1 },
    },
  },
  bloggerId: {
    isInt: {
      errorMessage: 'The field must contain an integer',
    },
  },
});

export default postValidationSchema;
