import { RequestHandler } from 'express';
import bloggersService from '../domain/bloggers-service';
import { errorHandlingMiddleware } from '../middlewares/error-handling-middleware';

export const getAllBloggers: RequestHandler = async (req, res) => {
  errorHandlingMiddleware(req, res);

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
  errorHandlingMiddleware(req, res);

  const newBlogger = await bloggersService.addBlogger(req.body.name, req.body.youtubeUrl);

  res.status(201).send(newBlogger);
};

export const updateBloggerById: RequestHandler = async (req, res) => {
  errorHandlingMiddleware(req, res);

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
