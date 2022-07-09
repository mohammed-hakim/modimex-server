import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('stats')
export class StatsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('jsonb', { default: [], nullable: true })
  marks: { name: string; images: string[] }[];
  @Column('jsonb', { default: [], nullable: true })
  categories: { name: string; images: string[] }[];
  @Column('jsonb', { default: [], nullable: true })
  shippings: {
    id: string;
    name: string;
    images: string[];
    price: number;
    time: number;
  }[];
  @Column('jsonb', { default: [], nullable: true })
  promos: {
    code: string;
    images: string[];
    price: number;
    reduction: number;
  }[];
  @Column('jsonb', { default: [], nullable: true })
  events: {
    images: string[];
    link: number;
    name: string;
  }[];
  @Column('integer', { default: 0, nullable: true })
  max_price: number;
  @Column('integer', { default: 0, nullable: true })
  max_price_offer: number;
  @Column('text', { default: 'DZD', nullable: true })
  currency: string;
}
