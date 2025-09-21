/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: true,
        },
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 AUTH is listening on RMQ`);
}

bootstrap();
