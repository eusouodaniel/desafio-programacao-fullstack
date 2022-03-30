import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddProductTransaction1648306001545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'TransactionProduct',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionProduct');
  }
}
