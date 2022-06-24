import { checkSchema } from 'express-validator';
import { pageNumberParamValidation } from '../validations/queryParams/page-number-param-validation';
import { pageSizeParamValidation } from '../validations/queryParams/page-size-param-validation';

const postParamsSchema = checkSchema({
  PageNumber: pageNumberParamValidation,
  PageSize: pageSizeParamValidation,
});

export default postParamsSchema;
