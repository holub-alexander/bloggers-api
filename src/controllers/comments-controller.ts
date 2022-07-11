import { RequestHandler } from 'express';
import errorsOccured from '../utils/errors-occured';
import { validationResult } from 'express-validator';
import commentsService from '../domain/comments-service';
import postsService from '../domain/posts-service';

export const addCommentForPost: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const newComment = await commentsService.addCommentForPost(req.params.postId, {
    content: req.body.content,
    userId: req.user.id,
    userLogin: req.user.login,
  });

  if (newComment) {
    res.status(201).send(newComment);
  } else {
    res.sendStatus(404);
  }
};

export const getAllCommentsForPost: RequestHandler = async (req, res) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const post = await postsService.getPostById(req.params.postId);

  if (!post) {
    res.sendStatus(404);
  }

  const comments = await commentsService.getAllCommentsForPost(
    req.params.postId,
    Number(req.query.PageNumber),
    Number(req.query.PageSize)
  );

  res.send(comments);
};

export const getCommentById: RequestHandler = async (req, res) => {
  const comment = await commentsService.getCommentById(req.params.id);

  if (comment) {
    res.send(comment);
  } else {
    res.sendStatus(404);
  }
};

export const deleteCommentById: RequestHandler = async (req, res) => {
  const result = await commentsService.deleteCommentById(req.params.commentId, req.user.id);

  switch (result) {
    case 1:
      res.sendStatus(204);
      break;
    case 0:
      res.sendStatus(404);
      break;
    default:
      res.sendStatus(403);
  }
};
