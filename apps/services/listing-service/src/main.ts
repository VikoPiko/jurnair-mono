/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // if running rabbitmq with docker setup environment vars in docker-compose and replace localhost: amqp://user:password@localhost:5672
  const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${url}`],
        queue: 'property_queue',
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  await app.listen();
  Logger.log(`Listing_Service is running...`);
}

bootstrap();
