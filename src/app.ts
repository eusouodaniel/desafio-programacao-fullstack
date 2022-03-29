import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from "helmet";
import 'reflect-metadata';
import './config/env';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
