import { Request, Response } from 'express';

import TransactionService from '../services/transaction.service';
import FileUtil from '../utils/file.util';
import TransactionUtil from '../utils/transaction.util';
import AppError from '../errors/AppError';

const fileUtil = new FileUtil();
const transactionService = new TransactionService();

class TransactionController {
  async index(req: Request, res: Response) {
    try {
      const balance = await transactionService.balance();

      return res.status(200).json({
        balance
      });
    } catch (e) {
      //log info
      console.log(e);
    }

    throw new AppError("Internal server error", 500);
  }

  async import(req: Request, res: Response)  {
    try {
      if (req.file) {
        const transactionFields = fileUtil.processFile(req.file.filename);
        const transactions = await transactionUtil.processImportTransaction(
          transactionFields
        );
      }
      throw new AppError("File is required", 403);
    } catch (e) {
      //log info
      console.log(e);
    }

    throw new AppError("Internal server error", 500);
  }

}

export default TransactionController;
