import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import usersService from '../domain/users-service';
import errorsOccured from '../utils/errors-occured';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const newUser = await usersService.addUser(req.body.login, req.body.password);

  res.status(201).send(newUser);
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const users = await usersService.getAllUsers(
    Number(req.query.PageNumber),
    Number(req.query.PageSize)
  );

  res.send(users);
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const isDeleteUser = await usersService.deleteUserById(req.params.id);

  if (isDeleteUser) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};
