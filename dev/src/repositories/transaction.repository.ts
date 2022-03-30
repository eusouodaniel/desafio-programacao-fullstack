import { AppDataSource } from '../database';
import Transaction from '../entities/transation.model';

export default AppDataSource.getRepository(
  Transaction,
).extend({
  async getBalance() {
    const { income, outcome } = (await this.find()).reduce(
      (accumulator, currentTransaction) => {
        if (currentTransaction.transaction_type.operation === '+') {
          accumulator.income += Number(currentTransaction.price);
        } else {
          accumulator.outcome += Number(currentTransaction.price);
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  },
})
