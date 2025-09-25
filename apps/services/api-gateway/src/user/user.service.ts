import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async getUserInfo(userId: string) {
    return await lastValueFrom(this.client.send('get-user', userId));
  }
}
