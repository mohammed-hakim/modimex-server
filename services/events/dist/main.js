'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const microservices_1 = require('@nestjs/microservices');
const shared_1 = require('@commerce/shared');
async function bootstrap() {
  const app = await core_1.NestFactory.createMicroservice(
    app_module_1.AppModule,
    {
      transport: microservices_1.Transport.REDIS,
      options: {
        port: shared_1.parseInt(config.REDIS_HOST),
        host: shared_1.parseInt(config.REDIS_HOST),
        password: shared_1.config.REDIS_PASS,
      },
    },
  );
  await app.listen(() => console.log(`events module is listening `));
}
bootstrap();
//# sourceMappingURL=main.js.map
