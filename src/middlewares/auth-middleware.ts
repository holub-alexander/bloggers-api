import { RequestHandler } from 'express';
import { LOGIN, PASSWORD } from '../utils/constants';

const authMiddleware: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const authorizationHeaderValue = authorizationHeader.replace('Basic ', '');
    const decodeValue = Buffer.from(authorizationHeaderValue, 'base64').toString('ascii');

    if (decodeValue === `${LOGIN}:${PASSWORD}`) {
      next();

      return;
    }
  }

  res.sendStatus(401);

  return;
};

export default authMiddleware;
