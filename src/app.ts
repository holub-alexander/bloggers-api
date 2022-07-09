import express from 'express';

import bloggersRoute from './routes/bloggers-route';
import postsRoute from './routes/posts-route';
import { PORT } from './utils/constants';
import { runDb } from './db/db';
import usersRouter from './routes/users-route';

const app = express();

/*
 * Middleware
 */

app.use(express.json());

/*
 * Routes
 */

app.use(bloggersRoute);
app.use(postsRoute);
app.use(usersRouter);

const startApp = async () => {
  await runDb();

  app.listen(PORT);
};

startApp();
