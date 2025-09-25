import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PrismaModule } from '../prisma/prisma.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'HOST_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://guest:guest@localhost:5672'],
    //       queue: 'auth_queue',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     },
    //   },
    // ]),
    PrismaModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
