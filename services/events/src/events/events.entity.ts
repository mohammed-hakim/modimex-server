import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('events')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @PrimaryGeneratedColumn('uuid')
  creator: string;
  @Column('text', { nullable: true })
  title: string;
  @Column('text', { nullable: true })
  description: string;
  @Column('text', { nullable: true })
  link: string;
  @Column('text', { array: true })
  images: string[];
  @Column('text', { array: true, nullable: true })
  blured_images: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;
}
