import { RequestHandler } from 'express';
import jwtUtility from '../application/jwt-utility';
import authService from '../domain/auth-service';

export const loginUser: RequestHandler = async (req, res) => {
  const user = await authService.checkCredentials(req.body.login, req.body.password);

  if (user) {
    const token = await jwtUtility.createJWT({ id: user.id, login: user.login });

    res.status(200).send({ token });
  } else {
    res.sendStatus(401);
  }
};
