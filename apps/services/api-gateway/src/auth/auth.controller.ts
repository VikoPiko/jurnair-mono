import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  handleGet() {
    this.authService.sendHello();
  }

  @Get('test')
  async handleTest() {
    const result = await this.authService.sendTest();
    return result;
  }

  @Post('signup')
  async signUp(@Body() user: any) {
    return await this.authService.signup(user);
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  async getProtected(@Req() req: any) {
    console.log(req.user);
    return { message: 'Authorized!', user: req.user };
  }

  @Post('login')
  async login(@Res() res: Response, @Body() user: any) {
    const result = await this.authService.login(user);

    if (!result) {
      return res.status(401).send({ message: 'invalid' });
    }
    const token = result.token;

    res.cookie('test_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    return res.send({ message: 'login successful', token });
  }

  @Get('get-users')
  async handleGetUsers() {
    return this.authService.getUsers();
  }

  @Post('create-host')
  async handleUpdateToHost(@Body() userData: any) {
    console.log(`GW recieved: ${userData}`);
    return await this.authService.updateToHost(userData);
  }
}
