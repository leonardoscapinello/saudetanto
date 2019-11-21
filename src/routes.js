import { Router } from 'express';

import authMiddleware from './app/middleware/auth';

import PostsController from './app/controllers/PostsController';
import PostsPaginationController from './app/controllers/PostsPaginationController';

const routes = new Router();

routes.use(authMiddleware);

routes.post('/posts', PostsController.store);
routes.get('/posts', PostsController.index);
routes.get('/posts/:page/:size', PostsPaginationController.show);

export default routes;
