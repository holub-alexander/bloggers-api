import { RequestHandler } from 'express';
import bloggersService from '../domain/bloggers-service';
import errorsOccured from '../utils/errors-occured';
import { validationResult } from 'express-validator';

export const getAllBloggers: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  if (!req.query.SearchNameTerm || typeof req.query.SearchNameTerm === 'string') {
    const bloggers = await bloggersService.getAllBloggers(
      Number(req.query.PageNumber),
      Number(req.query.PageSize),
      req.query.SearchNameTerm
    );

    res.send(bloggers);
  }
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
