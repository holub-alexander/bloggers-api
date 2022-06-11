import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bloggersRepository from '../repositories/bloggers-repository';
import errorsOccured from '../utils/errors-occured';
import bloggerValidationSchema from '../utils/validations/blogger-validation-schema';

const bloggersRoute = Router();

bloggersRoute.get('/bloggers', (_, res: Response) => {
  res.send(bloggersRepository.getAllBloggers());
});

bloggersRoute.get('/bloggers/:id', (req: Request, res: Response) => {
  const blogger = bloggersRepository.getBloggerById(req.params.id);

  if (blogger) {
    res.send(blogger);
  } else {
    res.sendStatus(404);
  }
});

bloggersRoute.post('/bloggers', bloggerValidationSchema, (req: Request, res: Response) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);
  } else {
    res.status(201).send(bloggersRepository.addBlogger(req.body.name, req.body.youtubeUrl));
  }
});

bloggersRoute.put('/bloggers/:id', bloggerValidationSchema, (req: Request, res: Response) => {
  const errors = errorsOccured(validationResult(req));

  if (errors.errorsMessages.length > 0) {
    res.status(400).send(errors);

    return;
  }

  const isUpdateBlogger = bloggersRepository.updateBloggerById(
    req.params.id,
    req.body.name,
    req.body.youtubeUrl
  );

  if (isUpdateBlogger) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
});

bloggersRoute.delete('/bloggers/:id', (req: Request, res: Response) => {
  const result = bloggersRepository.deleteBloggerById(req.params.id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default bloggersRoute;
