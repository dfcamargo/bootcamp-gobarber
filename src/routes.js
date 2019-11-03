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
import AvaliableController from './app/controllers/AvaliableController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// detalhe: só vai valer para as rotas que estiverem depois do middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/avaliables', AvaliableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// rota para carregamento de avatar
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
