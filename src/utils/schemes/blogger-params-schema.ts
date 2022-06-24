import { checkSchema } from 'express-validator';
import { pageNumberParamValidation } from '../validations/queryParams/page-number-param-validation';
import { pageSizeParamValidation } from '../validations/queryParams/page-size-param-validation';
import { searchNameParamValidation } from '../validations/queryParams/search-name-param-validation';

const bloggerParamsSchema = checkSchema({
  SearchNameTerm: searchNameParamValidation,
  PageNumber: pageNumberParamValidation,
  PageSize: pageSizeParamValidation,
});

export default bloggerParamsSchema;
