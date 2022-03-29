import { Router } from 'express';
import swaggerUi from "swagger-ui-express";
import RateLimit from "express-rate-limit";

import authRouter from './auth.routes';
import healthRouter from './health.routes';
import transactionRouter from './transaction.routes';
import swaggerFile from "../swagger.json";

let limiter = RateLimit({
  windowMs: 1*60*1000, //1 minute
  max: 50 //10 requests per minute
});

const routes = Router();

routes.use(limiter);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes.use('/auth', authRouter);
routes.use('/healthz', healthRouter);
routes.use('/transactions', transactionRouter);

export default routes;
