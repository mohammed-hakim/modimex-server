import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { COOKI_NAME, __prod__, URL2, URL3 } from '@commerce/shared';
import { redis } from './utils/redis';
import { graphqlUploadExpress } from 'graphql-upload';
import * as bodyParser from 'body-parser';
import { ValidationPipeEr } from 'pipes/validation.pipe';
import express from 'express';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
const mung = require('express-mung');

const helmet = require('helmet');
const xXssProtection = require('x-xss-protection');const hpp = require('hpp');
// import * as xssFilter from 'x-xss-protection';
// import * as hpp from 'hpp';
// import Redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const RedisStore = connectRedis(session);

console.log({URL2});

  // const redis = new Redis();
  let PORT = process.env.PORT || 8080;
  console.log({PORT});
  
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4555',
      'http://localhost:8080',
      'http://localhost:4233',
      'http://localhost:4888',
      'http://127.0.0.1:8080',
      URL2,
      URL3,
    ],
    credentials: true,
  });
  app.use('/images', express.static(path.join(__dirname, 'images')));
  // app.set("trust proxy", 1);
  app.use(graphqlUploadExpress({ /*  maxFileSize: 200000, */ maxFiles: 10 }));
  app.use(
    session({
      // store: new RedisStore({ client: redis, disableTouch: true }),
      // secret: 'jakfsjdhkahsdsajhjfkhsh',
      // name: COOKI_NAME,
      // proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
      // cookie: {
      //   maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
      //   httpOnly: true, //not access in browser
      //   sameSite: 'lax', //'lax', //csrf
      //   secure: false //__prod__, //https
      // },
      // saveUninitialized: false,
      // resave: false,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: 'jakfsjdhkahsdsajhjfkhsh',
      name: COOKI_NAME,
      proxy:true,
      saveUninitialized: false,
      resave: false,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
          httpOnly: true, //not access in browser
          sameSite: 'none', //'lax', //csrf
          secure: true //__prod__, //https
      }
    }),
  );

app.set('trust proxy', 1)
// app.enable('trust proxy')


  console.log({__prod__  },'what a time btro !! 2');
  

  // app.use(helmet());
  // app.use(helmet.noSniff());
  // app.use(helmet.ieNoOpen());
  // app.use(xXssProtection());
  // app.use(hpp());


  app.use(bodyParser.urlencoded({ extended: true }));

  //app.use(xXssProtection());
  // app.use(
  //   helmet.contentSecurityPolicy({
  //     directives: {
  //       defaultSrc: ["'self'"],
  //       imgSrc: ["'self'"],
  //     },
  //     disableAndroid: true,
  //     setAllHeaders: true,
  //   }),
  // );

  // app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipeEr(),
    // new ValidationPipe({
    //   skipMissingProperties: true,
    //   exceptionFactory: (errs: ValidationError[]) => {

    //     const messages = errs.map(
    //       (e) => `
    //   ${e.property} has wrong value  ${e.value}  ,
    //   ${Object.values(e.constraints).join(', ')}
    //   `,
    //     );

    //     return new ValidationException(messages);
    //   },
    // }),
  );

  app.use(
    mung.json(function transform(body, req, res) {
      console.log({ body }); // or whatever logger you use
      return body;
    }),
  );

  // app.use('*', function(req:Request, res:Response , next){
  //   console.log(req.url   , '4' , res);
    
  //  // res.status(404).send('what???');
  //   next()
  // });

  await app.listen(PORT);
  console.log('http://localhostttt:' + PORT);
}
bootstrap();
