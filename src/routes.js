import { Router } from 'express';
import multer from 'multer';

// "import" locais
import multerConfig from './config/multer';

// "middlewares"
import authMiddleware from './app/middleware/auth';

// "controllers"
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// detalhe: só vai valer para as rotas que estiverem depois do middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

// rota para carregamento de avatar
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
