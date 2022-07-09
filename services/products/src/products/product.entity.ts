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
@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { nullable: true })
  user_id: string;
  // @PrimaryGeneratedColumn('uuid' )
  // user_id: string;
  @Column('text', { unique: true })
  title: string;
  @Column('float', { nullable: true })
  price: number;
  @Column('float', { default: 0 })
  oldprice: number;
  @Column('integer', { default: 1 })
  quantity: number;
  @Column('float', { default: 0, nullable: true })
  sells: number;
  @Column('boolean', { nullable: true, default: false })
  hide: boolean;
  @Column('text')
  category: string;
  @Column('text')
  mark: string;
  @Column('text')
  description: string;
  @Column('text', { array: true })
  features: string[];
  @Column('text', { array: true })
  colors: string[];
  @Column('text', { array: true })
  sizes: string[];
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
// @Column('enum', {
//   isArray: true,
//   enum: userRoles,
//   transformer: roleTransformer
// })

/*    @ManyToOne(() => UserEntity, (user) => user.posts)
    creator: User; */

// @Column({
//   array: true,
//   default: [],
//   nullable: false,
// })
// images: string[];
// @Column('simple-array')
// images: string[];
