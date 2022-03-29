import { AppDataSource } from '../database';
import TransactionType from '../entities/transaction-type.model';
import IProductFields from '../interfaces/IProductFields';

class TransactionTypeService {

  public async execute(transactions: IProductFields[]) {
    const transactionTypeRepository = AppDataSource.getRepository(TransactionType);
    return "";
  }

}

export default TransactionTypeService;
