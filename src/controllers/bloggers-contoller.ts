import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bloggersService from '../domain/bloggers-service';
import errorsOccured from '../utils/errors-occured';

export const getAllBloggers: RequestHandler = async (_, res) => {
  const bloggers = await bloggersService.getAllBloggers();

  res.send(bloggers);
};

export const getBloggerById: RequestHandler = async (req, res) => {
  const blogger = await bloggersService.getBloggerById(req.params.id);

  if (blogger) {
    res.send(blogger);
  } else {
    res.sendStatus(404);
  }
};

export const addBlogger: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);
  } else {
    const newBlogger = await bloggersService.addBlogger(req.body.name, req.body.youtubeUrl);

    res.status(201).send(newBlogger);
  }
};

export const updateBloggerById: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const isUpdateBlogger = await bloggersService.updateBloggerById(
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

export const deleteBloggerById: RequestHandler = async (req, res) => {
  const result = await bloggersService.deleteBloggerById(req.params.id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
