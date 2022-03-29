import { Router } from 'express';
import swaggerUi from "swagger-ui-express";

import authRouter from './auth.routes';
import healthRouter from './health.routes';
import transactionRouter from './transaction.routes';
import swaggerFile from "../swagger.json";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes.use('/auth', authRouter);
routes.use('/healthz', healthRouter);
routes.use('/transactions', transactionRouter);

export default routes;
