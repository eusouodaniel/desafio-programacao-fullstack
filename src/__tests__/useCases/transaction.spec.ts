import request from 'supertest';
import path from 'path';

import app from '../../app';
import { AppDataSource } from '../../database';
import User from '../../entities/user.model';

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
});
