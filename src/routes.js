import { Router } from 'express';

import authMiddleware from './app/middleware/auth';

import PostsController from './app/controllers/PostsController';

const routes = new Router();

routes.use(authMiddleware);

routes.put('/posts', PostsController.update);
routes.get('/posts', PostsController.index);

export default routes;
