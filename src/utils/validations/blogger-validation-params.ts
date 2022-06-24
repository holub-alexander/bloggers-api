import { checkSchema } from 'express-validator';

const bloggerValidationParams = checkSchema({
  SearchNameTerm: {
    in: ['query'],
    optional: true,
    isString: true,
    errorMessage: 'The SearchNameTerm parameter must be an string',
  },
  PageNumber: {
    in: ['query'],
    customSanitizer: {
      options: (value: string) => value || 1,
    },
    errorMessage: 'The PageNumber parameter must be an integer',
    isInt: true,
    toInt: true,
  },
  PageSize: {
    in: ['query'],
    customSanitizer: {
      options: (value: string) => value || 10,
    },
    errorMessage: 'The PageSize parameter must be an integer',
    isInt: true,
    toInt: true,
  },
});

export default bloggerValidationParams;
