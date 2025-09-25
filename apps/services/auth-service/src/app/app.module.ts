import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwksModule } from '../jwks/jwks.module';
import * as fs from 'fs';

import path from 'path';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwksModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.join(__dirname, '..', 'private.key'),
        'utf-8'
      ),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1h',
        keyid: 'auth-key-v1',
      },
    }),
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//secret:
//   process.env.JWT_SECRET ||
//   '4u189cru927838912349812h3ojASKDN9aifjaundasdASaf9t433ad1',
// signOptions: {
//   expiresIn: '1h',
// },
