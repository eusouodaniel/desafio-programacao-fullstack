import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddTransactionTypeToTransaction1648306905533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['transaction_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transaction_types',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'TransactionTypeTransaction',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionTypeTransaction');
  }
}
