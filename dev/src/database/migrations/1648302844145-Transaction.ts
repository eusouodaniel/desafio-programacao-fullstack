import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Transaction1610584820929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'transaction_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
          },
          {
            type: 'uuid',
            name: 'transaction_type_id',
            isNullable: false,
          },
          {
            type: 'uuid',
            name: 'affiliate_id',
            isNullable: false,
          },
          {
            type: 'uuid',
            name: 'product_id',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
