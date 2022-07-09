import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('statistics')
export class StatisticsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  month: number;
  @Column('integer')
  day: number;
  @Column('integer')
  year: number;

  @Column('integer')
  sells_quantity: number;
  @Column('float')
  sells_price: number;

  @Column('jsonb')
  sells_data: {
    products: {
      id: string;
      price: number;
      quantity: number;
      isOffer: boolean;
    }[];
  };
}
