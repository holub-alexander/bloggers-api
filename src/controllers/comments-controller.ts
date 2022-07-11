import { RequestHandler } from 'express';
import errorsOccured from '../utils/errors-occured';
import { validationResult } from 'express-validator';
import commentsService from '../domain/comments-service';

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

  const comments = await commentsService.getAllCommentsForPost(
    req.params.postId,
    Number(req.query.PageNumber),
    Number(req.query.PageSize)
  );

  res.send(comments);
};
