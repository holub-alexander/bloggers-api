import { checkSchema } from 'express-validator';

const postValidationParameters = checkSchema({
  pageNumber: {
    in: ['query'],
    errorMessage: 'The pageNumber parameter must be an integer',
    isInt: true,
    toInt: true,
  },
  pageSize: {
    in: ['query'],

    errorMessage: 'The pageSize parameter must be an integer',
    isInt: true,
    toInt: true,
  },
});

export default postValidationParameters;
