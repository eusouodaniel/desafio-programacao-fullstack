import Transaction from '../entities/transation.model';
import Affiliate from '../entities/affiliate.model';
import Product from '../entities/product.model';
import TransactionType from '../entities/transaction-type.model';
import ITransactionFields from '../interfaces/ITransactionFields';
import IProductFields from '../interfaces/IProductFields';
import TransactionRepository from '../repositories/transaction.repository';
import { AppDataSource } from '../database';

class TransactionService {

  public async balance() {
    return await TransactionRepository.getBalance();
  }

  public async executeImport(transactionFields: IProductFields[], affiliates: Affiliate[], products: Product[], transaction_types: TransactionType[]): Promise<Transaction[]> {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const createTransactions = this.mapTransactions(transactionFields, affiliates, products, transaction_types)

    const transactions = transactionRepository.create(createTransactions);
    await transactionRepository.save(transactions);

    return transactions;
  }

  private mapTransactions(transactionFields: IProductFields[], affiliates: Affiliate[], products: Product[], transaction_types: TransactionType[]): ITransactionFields[] {
    return transactionFields.map(transaction => {
      return {
        transaction_date: transaction.date,
        price: transaction.price,
        transaction_type_id: transaction_types.find(
          transaction_type => transaction_type.type === transaction.type,
        )?.id as string,
        product_id: products.find(
          product => product.name === transaction.product
        )?.id as string,
        affiliate_id: affiliates.find(
          affiliate => affiliate.name === transaction.affiliate,
        )?.id as string
      };
    });
  }

}

export default TransactionService;
