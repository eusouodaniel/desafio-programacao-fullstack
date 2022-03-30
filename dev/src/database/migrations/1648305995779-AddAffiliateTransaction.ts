import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddAffiliateTransaction1648305995779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['affiliate_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'affiliates',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'TransactionAffiliate',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionAffiliate');
  }
}
