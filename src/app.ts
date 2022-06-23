import express from 'express';

import bloggersRoute from './routes/bloggers-route';
import postsRoute from './routes/posts-route';
import { PORT } from './utils/constants';
import { runDb } from './db/db';

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

const startApp = async () => {
  await runDb();

  app.listen(PORT);
};

startApp();
