import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TransactionType1648303958251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'transaction_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar(30)',
            isNullable: false
          },
          {
            name: 'kind',
            type: 'varchar(15)',
            isNullable: false
          },
          {
            name: 'operation',
            type: 'char',
            isNullable: false
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('transaction_types');
  }
}
