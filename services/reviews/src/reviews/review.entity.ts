import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  productId: string;
  @Column('boolean', { default: false })
  isOffer: string;
  @Column('text')
  description: string;
  @Column('int')
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;
}
