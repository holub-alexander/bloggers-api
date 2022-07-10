import { RequestHandler } from 'express';
import jwtUtility from '../application/jwt-utility';
import usersRepository from '../repositories/users-db-repository';

const authBearerMiddleware: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.sendStatus(401);

    return;
  }

  const formatAuthToken = authorizationHeader.replace('Bearer ', '');
  const decodeToken = await jwtUtility.extractAdminIdFromToken(formatAuthToken);

  if (decodeToken) {
    const findUser = await usersRepository.getUserById(decodeToken.id);

    if (findUser) {
      req.user = { id: findUser.id, login: findUser.login };
      next();

      return;
    }
  }

  res.sendStatus(401);

  return;
};

export default authBearerMiddleware;
