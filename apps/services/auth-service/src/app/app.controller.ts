import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern('hello')
  handleHello(@Payload() data: any) {
    console.log(`Received: ${data.message}`);
  }

  @MessagePattern('test')
  handleTest(@Payload() data: any) {
    console.log(`Received data: ${data.username}; ${data.password}`);
    return { message: 'success' };
  }

  @MessagePattern('sign-up')
  async handleSignUp(@Payload() user: any) {
    return await this.appService.signup(user);
  }

  @MessagePattern('logging')
  async handleLogin(@Payload() user: any) {
    return await this.appService.login(user);
  }

  @MessagePattern('get-users')
  async getUsers(@Payload() data: any) {
    return await this.appService.getUsers();
  }
}
