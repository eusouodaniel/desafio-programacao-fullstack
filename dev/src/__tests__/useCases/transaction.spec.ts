import request from 'supertest';
import path from 'path';

import app from '../../app';
import { AppDataSource } from '../../database';
import TransactionType from '../../entities/transaction-type.model';
import User from '../../entities/user.model';
import Transaction from '../../entities/transation.model';
import Affiliate from '../../entities/affiliate.model';
import Product from '../../entities/product.model';

describe('Transaction', () => {
  let token = "";

  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.manager.query('DROP TABLE IF EXISTS transactions');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS affiliates');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS products');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS transaction_types');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS users');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS migrations');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS typeorm_metadata');

    await AppDataSource.runMigrations();
  });

  afterAll(async () => {
    await AppDataSource.manager.query('DROP TABLE IF EXISTS transactions');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS affiliates');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS products');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS transaction_types');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS users');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS migrations');
    await AppDataSource.manager.query('DROP TABLE IF EXISTS typeorm_metadata');

    await AppDataSource.destroy();
  });

  it('should be able to create user', async () => {
    const userRepository = AppDataSource.getRepository(User);

    let user = new User();
    user.email = "producer-test";
    user.password = "producer-test";
    user.hashPassword();
    user.role = "PRODUCER";

    const saveUser = await userRepository.save(user);

    expect(saveUser).toEqual(
      expect.objectContaining({
        email: 'producer-test',
        role: 'PRODUCER',
      })
    );
  });

  it('should be able to create session', async () => {
    const createSession = await request(app).post("/auth/login").send({
      email: "producer-test",
      password: "producer-test",
    });
    expect(createSession.body).toHaveProperty('token');
    token = createSession.body.token;
  });

  it('should be able to create transaction types', async () => {
    const transactionTypeRepository = AppDataSource.getRepository(TransactionType);

    let transactionType = new TransactionType();
    transactionType.type = 1;
    transactionType.description = "Venda produtor";
    transactionType.kind = "Entrada";
    transactionType.operation = "+";

    const saveTransactionType = await transactionTypeRepository.save(transactionType);

    expect(saveTransactionType).toEqual(
      expect.objectContaining({
        type: 1,
        description: 'Venda produtor',
        kind: 'Entrada',
        operation: '+'
      })
    );
  });

  it('should be able to import transactions', async () => {
    const transactionsRepository = AppDataSource.getRepository(Transaction);
    const affiliatesRepository = AppDataSource.getRepository(Affiliate);
    const productsRepository = AppDataSource.getRepository(Product);

    const importTXT = path.resolve(__dirname, './mock/products.txt');
    await request(app).post('/transactions/import')
      .set('Authorization', 'Bearer '+token)
      .attach('file', importTXT);

    const transactions = await transactionsRepository.find();
    const affiliates = await affiliatesRepository.find();
    const products = await productsRepository.find();

    expect(affiliates).toHaveLength(2);
    expect(affiliates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'JOSE CARLOS',
        }),
        expect.objectContaining({
          name: 'MARIA CANDIDA',
        })
      ]),
    );

    expect(products).toHaveLength(2);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'CURSO DE BEM-ESTAR',
        }),
        expect.objectContaining({
          name: 'DOMINANDO INVESTIMENTOS',
        })
      ]),
    );

    expect(transactions).toHaveLength(2);
  });

  it('should be able to check balance transactions', async () => {
    const response = await request(app)
      .get('/transactions')
      .set('Authorization', 'Bearer '+token)

    expect(response.body.balance).toMatchObject({
      income: 627.5,
      outcome: 0,
      total: 627.5,
    });
  });
});
