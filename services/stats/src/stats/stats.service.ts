import { InjectRepository } from '@nestjs/typeorm';
import { StatsEntity } from './stats.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';

import { config } from '@commerce/shared';

const UP_STATS = (x , x2) => {
  let y = {
    en:{ title: x, sentence: `${x} Updated Successfully` },
    ar:{title: x2, sentence: `بنجاح ${x2} نم تحديث` }
  };
  return y;
};
@Injectable()
export class StatsService {
  @Client({
    transport: Transport.REDIS,
    options: {
      host: config.REDIS_HOST,
      url: `redis://${config.REDIS_HOST}:${config.REDIS_PORTE}`,
      port: config.REDIS_PORTE,
      password: config.REDIS_PASS,
    },
  })
  private client: ClientProxy;
  constructor(
    @InjectRepository(StatsEntity)
    private readonly stats: Repository<StatsEntity>,
  ) {}
  async get() {
    let data = await this.stats.findOne();
    if (!data) {
      let x = await this.stats.save({});
      return x;
    }
    //console.log({ data: data.max_price });

    return data;
  }
  async setCurrency({ name }) {
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET currency = '${name}'
      `,
      [],
    );

    return {
      currency: name,
      success: UP_STATS('currency' , 'العملة'),
    };
  }
  async setMark(mark) {
    mark = JSON.stringify(mark);
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET marks = marks || '[${mark}]'::jsonb
      `,
      [],
    );

    return {
      mark: JSON.parse(mark),
      success: UP_STATS('mark' , 'العلامة'),
    };
  }
  async setCat(category) {
    category = JSON.stringify(category);
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET categories = categories || '[${category}]'::jsonb
      `,
      [],
    );

    return {
      category: JSON.parse(category),
      success: UP_STATS('category','الفئة'),
    };
  }
  async setPromo(promo) {
    if (this.isJson(promo.name)) {
      promo.name = JSON.parse(promo.name);
      promo = {
        code: promo.name.code,
        reduction: promo.name.reduction,
        price: promo.name.price,
        images: promo.images,
      };
    }

    promo = JSON.stringify(promo);
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET promos = promos || '[${promo}]'::jsonb
      `,
      [],
    );
    return {
      promo: JSON.parse(promo),
      success: UP_STATS('promo','التخفيض'),
    };
  }
  async setShips(shipping) {
    // await this.resetPromos();
    if (this.isJson(shipping.name)) {
      shipping.name = JSON.parse(shipping.name);
      shipping = {
        name: shipping.name.name,
        images: shipping.images,
        price: shipping.name.price,
        time: shipping.name.time,
        id: this.create_UUID(),
      };
    }

    shipping = JSON.stringify(shipping);
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET shippings = shippings || '[${shipping}]'::jsonb
      `,
      [],
    );

    return {
      shipping: JSON.parse(shipping),
      success: UP_STATS('shipping','الشحن'),
    };
  }
  async setEvent(event) {
    event.link = event.name;
    delete event.name;
    event = JSON.stringify(event);
    let products = await this.stats.query(
      `
      UPDATE stats 
      SET events = events || '[${event}]'::jsonb

      `,
      [],
    );

    return {
      event: JSON.parse(event),
      success: UP_STATS('event','الحدث'),
    };
  }
  async resetEvents(events) {
    await this.stats.update({}, { events });

    return {
      success: UP_STATS('event','الحدث'),
    };
  }

  async resetCat(categories) {
    await this.stats.update({}, { categories });

    return {
      success: UP_STATS('category','الفئة'),
    };
  }
  async resetMark(marks) {
    this.stats.update({}, { marks });
    return {
      success: UP_STATS('mark', 'العلامة'),
    };
  }
  async resetPromos(promos = []) {
    this.stats.update({}, { promos });
    return {
      success: UP_STATS('promo','التخفيض'),
    };
  }
  async resetShips(shippings) {
    this.stats.update({}, { shippings });
    return {
      success: UP_STATS('shipping','الشحن'),
    };
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    return uuid;
  }
  async findPromoCode(code) {
    let statss = await this.stats.findOne();
    let promos = statss.promos;
    let valid = null;
    promos.forEach((x, i) => {
      if (x.code == code) {
        promos = promos.filter((x, i2) => {
          return i2 !== i;
        });

        this.resetPromos(promos);

        valid = x;
      }
    });

    return valid;
  }
  async upMaxPrice(price) {
    let prods = await this.client.send('getByPrice', price).toPromise();

    if (!prods) {
      let datos = await this.stats.query(
        `
      UPDATE stats
        SET max_price = $1 
        RETURNING *;
      `,
        [price],
      );
    }

    return {};
  }
  async upMaxPriceOffer(price) {
    let prods = await this.client.send('getOfferByPrice', price).toPromise();

    if (!prods) {
      let datos = await this.stats.query(
        `
      UPDATE stats
        SET max_price_offer = $1 
        RETURNING *;
      `,
        [price],
      );
    }

    return {};
  }
}
