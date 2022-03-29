import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import TransactionController from '../controllers/transaction.controller';
import AuthJWT from "../middlewares/auth.jwt";
import AuthRole from "../middlewares/auth.role";

const transactionRouter = Router();
const transactionController = new TransactionController();

const upload = multer(uploadConfig);

transactionRouter.use(AuthJWT);
transactionRouter.get('/', AuthRole(["PRODUCER"]), transactionController.index);
transactionRouter.post('/import', AuthRole(["PRODUCER"]), upload.single('file'), transactionController.import);

export default transactionRouter;
