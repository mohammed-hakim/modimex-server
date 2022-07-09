import {
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  user_id: string;

  @Column('text', { nullable: true })
  shipping: string;
  @Column('simple-json', { nullable: true })
  code: {
    price: number;
    reduction: number;
    images: string;
    code: string;
  };

  @Column('text', { nullable: true })
  shipping_id: string;
  @Column('float', { default: 0 })
  total_price: number;
  @Column('float', { default: 0 })
  total_price2: number;
  @Column('text', { nullable: true })
  color: string;
  @Column('text', { nullable: true })
  size: string;
  @Column('text', { nullable: true })
  failedReason: string;
  @Column('boolean', { nullable: true, default: false })
  hide: boolean;
  @Column({ type: 'simple-json', nullable: true })
  products: {
    id: string;
    offerId: string;
    children: {
      id: string;
      color: string;
      size: number;
    }[];
    quantity: number;
    color: string;
    size: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  vals: {
    products: {
      id: string;
      offerId: string;
      children: {
        id: string;
        color: string;
        size: number;
      }[];
      quantity: number;
      color: string;
      size: string;
    };
  };
  @Column({
    enum: ['pending', 'failed', 'succeeded'],
    default: 'pending',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
