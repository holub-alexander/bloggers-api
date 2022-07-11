import express from 'express';

import bloggersRoute from './routes/bloggers-router';
import postsRoute from './routes/posts-router';
import { PORT } from './utils/constants';
import { runDb } from './db/db';
import usersRouter from './routes/users-router';
import authRouter from './routes/auth-router';
import commentsRouter from './routes/comments-router';

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
app.use(authRouter);
app.use(commentsRouter);

const startApp = async () => {
  await runDb();

  app.listen(PORT);
};

startApp();
