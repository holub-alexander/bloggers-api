import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bloggersService from '../domain/bloggers-service';
import errorsOccured from '../utils/errors-occured';

export const getAllBloggers: RequestHandler = (_, res) => {
  res.send(bloggersService.getAllBloggers());
};

export const getBloggerById: RequestHandler = (req, res) => {
  const blogger = bloggersService.getBloggerById(req.params.id);

  if (blogger) {
    res.send(blogger);
  } else {
    res.sendStatus(404);
  }
};

export const addBlogger: RequestHandler = (req, res) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);
  } else {
    res.status(201).send(bloggersService.addBlogger(req.body.name, req.body.youtubeUrl));
  }
};

export const updateBloggerById: RequestHandler = (req, res) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const isUpdateBlogger = bloggersService.updateBloggerById(
    req.params.id,
    req.body.name,
    req.body.youtubeUrl
  );

  if (isUpdateBlogger) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

export const deleteBloggerById: RequestHandler = (req, res) => {
  const result = bloggersService.deleteBloggerById(req.params.id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
