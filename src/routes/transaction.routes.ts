import { Router } from 'express';

import TransactionController from '../controllers/transaction.controller';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get('/', transactionController.index);
transactionRouter.get('/import', transactionController.import);

export default transactionRouter;
