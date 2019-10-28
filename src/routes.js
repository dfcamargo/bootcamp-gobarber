import { Router } from 'express';

import authMiddleware from './app/middleware/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// detalhe: só vai valer para as rotas que estiverem depois do middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
