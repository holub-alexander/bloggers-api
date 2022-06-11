import express from 'express';

import bloggersRoute from './routes/bloggers-route';
import postsRoute from './routes/posts-route';
import { PORT } from './utils/constants';

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

app.listen(PORT);
