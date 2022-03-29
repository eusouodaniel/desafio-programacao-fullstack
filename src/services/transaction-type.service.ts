import { In } from 'typeorm';

import { AppDataSource } from '../database';
import TransactionType from '../entities/transaction-type.model';
import IProductFields from '../interfaces/IProductFields';

class TransactionTypeService {

  public async execute(transactions: IProductFields[]): Promise<TransactionType[]> {
    const transactionTypeRepository = AppDataSource.getRepository(TransactionType);

    let transactionTypes = await transactionTypeRepository.findBy({
      type: In(transactions.map(transaction => transaction.type)),
    });

    return transactionTypes;
  }

}

export default TransactionTypeService;
