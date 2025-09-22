import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy // private jwtService: JwtService
  ) {}

  sendHello() {
    this.client.emit('hello', { message: 'helloworld' });
  }

  async sendTest() {
    return await lastValueFrom(
      this.client.send('test', { username: 'viko', password: '1234' })
    );
  }

  async signup(user: any) {
    return await lastValueFrom(
      this.client.send('sign-up', {
        username: user.email,
        password: user.password,
      })
    );
  }

  async login(user: any) {
    try {
      const res = await lastValueFrom(this.client.send('logging', user));
      if (!res) {
        return null;
      }

      //   const payload = { sub: res.username, password: res.password };
      //   const token = this.jwtService.sign(payload);

      console.log(res.token);
      if (!res.token) {
        console.log('ERROR MAKING TOKEN');
        return;
      }
      const token = res.token;

      return { token };
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async getUsers() {
    return await lastValueFrom(this.client.send('get-users', {}));
  }
}
