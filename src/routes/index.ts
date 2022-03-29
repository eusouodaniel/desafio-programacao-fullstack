import { Router } from 'express';

import healthRouter from './health.routes';
import transactionRouter from './transaction.routes';

const routes = Router();

routes.use('/healthz', healthRouter);
routes.use('/transactions', transactionRouter);

export default routes;
