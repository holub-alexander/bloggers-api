import { Router, Request, Response } from 'express';
import postsRepository from '../repositories/posts-repository';

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

export default postsRoute;
