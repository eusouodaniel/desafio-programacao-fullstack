import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Affiliate from './affiliate.model';
import Product from './product.model';
import TransactionType from './transaction-type.model';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  transaction_date: Date;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    nullable: false
  })
  price: number;

  @Column({
    nullable: false,
  })
  affiliate_id: string;

  @Column({
    nullable: false,
  })
  product_id: string;

  @Column({
    nullable: false,
  })
  transaction_type_id: string;

  @ManyToOne(() => Affiliate, affiliate => affiliate.transaction, { eager: true })
  @JoinColumn({ name: 'affiliate_id' })
  affiliate: Affiliate;

  @ManyToOne(() => Product, product => product.transaction, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => TransactionType, transaction_type => transaction_type.transaction, { eager: true })
  @JoinColumn({ name: 'transaction_type_id' })
  transaction_type: TransactionType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Transaction;
