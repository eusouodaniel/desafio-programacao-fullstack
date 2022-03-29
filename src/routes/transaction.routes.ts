import { Router } from 'express';

import TransactionController from '../controllers/transaction.controller';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get('/', transactionController.index);

export default transactionRouter;
