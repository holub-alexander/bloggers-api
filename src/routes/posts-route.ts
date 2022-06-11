import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bloggersRepository from '../repositories/bloggers-repository';
import postsRepository from '../repositories/posts-repository';
import errorsOccured from '../utils/errors-occured';
import postValidationSchema from '../utils/validations/post-validation-schema.ts';

const postsRoute = Router();

postsRoute.get('/posts', (_, res: Response) => {
  res.send(postsRepository.getAllPosts());
});

postsRoute.get('/posts/:id', (req: Request, res: Response) => {
  const post = postsRepository.getPostById(req.params.id);

  if (post) {
    res.send(post);
  } else {
    res.sendStatus(404);
  }
});

postsRoute.post('/posts', postValidationSchema, (req: Request, res: Response) => {
  const errors = errorsOccured(validationResult(req));
  const errorsMessages = errors.errorsMessages;
  const blogger = bloggersRepository.getBloggerById(req.body.bloggerId.toString());

  if (!blogger) {
    errorsMessages.push({ message: 'Blogger not found', field: 'bloggerName' });
  }

  if (errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const post = postsRepository.addPost(
    req.body.title,
    req.body.shortDescription,
    req.body.content,
    +req.body.bloggerId,
    blogger!.name
  );

  if (post) {
    res.status(201).send(post);
  } else {
    res.sendStatus(404);
  }
});

export default postsRoute;
