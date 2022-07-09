import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
export const roleTransformer = {
  to: (value: string[]): string =>
    '{' + value.filter((role) => role).join(',') + '}',
  from: (value: string): string[] =>
    value
      .replace(/\{|\}/g, '')
      .split(',')
      .filter((role) => role),
};
@Entity('offers')
export class OfferEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('uuid', { array: true })
  products_ids: string[];

  @Column('text', { unique: true })
  title: string;
  @Column('float', { nullable: true })
  price: number;
  // @Column('float', { default: 0 })
  // original_price2: number;
  @Column('float', { default: 0 })
  original_price: number;
  @Column('integer', { default: 1 })
  quantity: number;
  @Column('integer', { default: 0, nullable: true })
  sells: number;

  @Column('text', { nullable: true, default: '' })
  category: string;
  @Column('text', { nullable: true, default: '' })
  mark: string;

  @Column('text', { array: true, nullable: true, default: '{}' })
  features: string[];
  @Column('text')
  description: string;
  @Column('boolean', { nullable: true })
  hide: boolean;

  @Column('text', { array: true })
  images: string[];
  @Column('text', { array: true })
  blured_images: string[];

  @Column('tsvector', { nullable: true })
  document: string;
  @Column('tsvector', { nullable: true })
  document_with_idx: string;
  @Column('tsvector', { nullable: true })
  document_with_weights: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;
  @Column('jsonb', {
    nullable: true,
    default: {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    },
  })
  reviewsavg: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
  @Column('text', { nullable: true })
  reviews: string;
}
