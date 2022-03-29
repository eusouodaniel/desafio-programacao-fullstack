import request from 'supertest';
import path from 'path';

import app from '../../app';
import { AppDataSource } from '../../database';

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
});
