import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { ListingModule } from '../listing/listing.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, PropertyModule, ListingModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
