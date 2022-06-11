import { Router } from 'express';
import bloggersRepository from '../repositories/bloggers-repository';

const bloggersRoute = Router();

bloggersRoute.get('/bloggers', (_, res) => {
  res.send(bloggersRepository.getAllBloggers());
});

bloggersRoute.get('/bloggers/:id', (req, res) => {
  const blogger = bloggersRepository.getBloggerById(req.params.id);

  if (blogger) {
    res.send(blogger);
  } else {
    res.sendStatus(404);
  }
});

bloggersRoute.delete('/bloggers/:id', (req, res) => {
  const result = bloggersRepository.deleteBloggerById(req.params.id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default bloggersRoute;
