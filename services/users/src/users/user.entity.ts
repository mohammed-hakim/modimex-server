import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { sign } from 'jsonwebtoken';
import { config } from '@commerce/shared';
// import { hash } from 'bcryptjs';
import { hash } from 'argon2';
@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true })
  gateway_customer_id: string;
  ///
  ///
  ///
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'boolean' })
  seller: boolean;
  @Column({ type: 'boolean', nullable: true, default: false })
  is_admin: boolean;

  @Column('text')
  name: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { unique: true, nullable: true })
  phone: string;
  @Column('text')
  password: string;
  @Column('text', { nullable: true })
  adress: string;
  @Column({ type: 'jsonb', nullable: true, default: [] })
  purshases: {
    id: string;
    offerId: string;
    quantity: number;
    date: number;
  }[];
  @Column('float', { nullable: true, default: 0 })
  money: number;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  promos: {
    code: string;
    price: number;
    reduction: number;
    used: boolean;
  }[];
  @Column('float', { nullable: true, default: 0 })
  moneyreal: number;

  @Column('integer', { nullable: true, default: 0 })
  bought_items: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @Column('tsvector', { nullable: true })
  document: string;
  @Column('tsvector', { nullable: true })
  document_with_idx: string;
  @Column('tsvector', { nullable: true })
  document_with_weights: string;

  // @OneToOne(() => AddressEntity, (address) => address.user)
  // address: AddressEntity;

  @BeforeInsert()
  async hashPassword() {
    let hashpass = await hash(this.password);
    this.password = hashpass; //await hash(this.password, 12);
  }
  private get token() {
    const { id, seller, is_admin } = this;
    return sign({ id, seller, is_admin }, config.JWT_TOKEN, {
      expiresIn: config.JWT_TOKEN_EXPIRATION,
    });
  }
  toResponseObject(showToken: boolean = true) {
    const {
      id,
      created_at,
      name,
      email,
      token,
      updated_at,
      seller,
      bought_items,
      phone,
      adress,
      // address,
      is_admin,
      purshases,
      money,
      gateway_customer_id,
    } = this;
    let responseObject: any = {
      id,
      name,
      email,
      created_at,
      updated_at,
      seller,
      is_admin,
      purshases,
      money,
      bought_items,
      phone,
      adress,
      gateway_customer_id,
    };
    // if (address) {
    // responseObject.address = address;
    // }
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }
}
