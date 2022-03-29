import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import TransactionController from '../controllers/transaction.controller';

const transactionRouter = Router();
const transactionController = new TransactionController();

const upload = multer(uploadConfig);

transactionRouter.get('/', transactionController.index);
transactionRouter.post('/import', upload.single('file'), transactionController.import);

export default transactionRouter;
