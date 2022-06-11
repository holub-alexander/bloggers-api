import { Result, ValidationError } from 'express-validator';
import { IFieldErrors } from '../types/field-errors';

const errorsOccured = (errors: Result<ValidationError>): IFieldErrors => {
  const err = errors.array({ onlyFirstError: true }).map((e) => ({
    message: e.msg,
    field: e.param,
  }));

  return {
    errorsMessages: err,
  };
};

export default errorsOccured;
