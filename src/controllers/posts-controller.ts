import { RequestHandler } from 'express';
import postsService from '../domain/posts-service';
import errorsOccured from '../utils/errors-occured';
import { validationResult } from 'express-validator';
import bloggersService from '../domain/bloggers-service';

export const getAllPosts: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const posts = await postsService.getAllPosts(
    Number(req.query.PageNumber),
    Number(req.query.PageSize)
  );

  res.send(posts);
};

export const getPostById: RequestHandler = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);

  if (post) {
    res.send(post);
  } else {
    res.sendStatus(404);
  }
};

export const addPost: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;
  const currentBloggerId = req.params.bloggerId
    ? req.params.bloggerId
    : req.body.bloggerId?.toString();

  const blogger = await bloggersService.getBloggerById(currentBloggerId);

  if (req.params.bloggerId && !blogger) {
    res.sendStatus(404);
  }

  if (!currentBloggerId || !blogger) {
    errorsMessages.push({ message: 'Blogger not found', field: 'bloggerId' });
  }

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const post = await postsService.addPost(
    {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      bloggerId: +currentBloggerId,
    },
    blogger!.name
  );

  if (post) {
    res.status(201).send(post);
  } else {
    res.sendStatus(404);
  }
};

export const updatePostById: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  const blogger = await bloggersService.getBloggerById(req.body.bloggerId?.toString());

  if (!req.body.bloggerId || !blogger) {
    errorsMessages.push({ message: 'Blogger not found', field: 'bloggerId' });
  }

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const isUpdatePost = await postsService.updatePostById(
    req.params.id,
    {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      bloggerId: +req.body.bloggerId,
    },
    blogger!.name
  );

  if (isUpdatePost) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

export const deletePostById: RequestHandler = async (req, res) => {
  const result = await postsService.deletePostById(req.params.id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

export const getAllBloggerPosts: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  const blogger = await bloggersService.getBloggerById(req.body.bloggerId?.toString());

  if (!blogger) {
    res.sendStatus(404);
  }

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const posts = await postsService.getAllBloggerPosts(
    +req.params.bloggerId,
    Number(req.query.PageNumber),
    Number(req.query.PageSize)
  );

  res.send(posts);
};

export const addPostForBlogger: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  const blogger = await bloggersService.getBloggerById(req.body.bloggerId?.toString());

  if (!req.body.bloggerId || !blogger) {
    errorsMessages.push({ message: 'Blogger not found', field: 'bloggerId' });
  }

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const post = await postsService.addPost(
    {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      bloggerId: +req.params.bloggerId,
    },
    blogger!.name
  );

  if (post) {
    res.status(201).send(post);
  } else {
    res.sendStatus(404);
  }
};
