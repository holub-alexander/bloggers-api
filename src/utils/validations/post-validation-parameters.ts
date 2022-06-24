import { checkSchema } from 'express-validator';

const postValidationParameters = checkSchema({
  PageNumber: {
    in: ['query'],
    customSanitizer: {
      options: (value: string) => value || 1,
    },
    errorMessage: 'The pageNumber parameter must be an integer',
    isInt: true,
    toInt: true,
  },
  PageSize: {
    in: ['query'],
    customSanitizer: {
      options: (value: string) => value || 10,
    },
    errorMessage: 'The pageSize parameter must be an integer',
    isInt: true,
    toInt: true,
  },
});

export default postValidationParameters;
