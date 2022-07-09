import { Request, Response } from 'express';
import errorsOccured from '../utils/errors-occured';
import { validationResult } from 'express-validator';

export const errorHandlingMiddleware = (req: Request, res: Response) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }
};
