import { RequestHandler } from 'express';
import jwtUtility from '../application/jwt-utility';
import authService from '../domain/auth-service';
import { errorHandlingMiddleware } from '../middlewares/error-handling-middleware';

export const loginUser: RequestHandler = async (req, res) => {
  errorHandlingMiddleware(req, res);

  const user = await authService.checkCredentials(req.body.login, req.body.password);

  if (user) {
    const token = await jwtUtility.createJWT({ id: user.id, login: user.login });

    res.status(201).send({ token });
  } else {
    res.sendStatus(401);
  }
};
