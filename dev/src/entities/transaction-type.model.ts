import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import Transaction from './transation.model';

@Entity('transaction_types')
export class TransactionType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  type: number;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  kind: string;

  @Column({
    nullable: false,
  })
  operation: string;

  @OneToMany(() => Transaction, transaction => transaction.transaction_type)
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default TransactionType;
