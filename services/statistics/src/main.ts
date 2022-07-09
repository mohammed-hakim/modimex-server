import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { config } from '@commerce/shared';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: config.REDIS_HOST,
      url: `redis://${config.REDIS_HOST}:${config.REDIS_PORTE}`,
      port: config.REDIS_PORTE,
      password: config.REDIS_PASS,
    },
  });
  await app.listen(() => console.log(`statistics module is listening `));
}
bootstrap();
