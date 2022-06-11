import express from 'express';

import bloggersRoute from './routes/bloggers-route';
import { PORT } from './utils/constants';

const app = express();

app.use(bloggersRoute);

app.listen(PORT);
