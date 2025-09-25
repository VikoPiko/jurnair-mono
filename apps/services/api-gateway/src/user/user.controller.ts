import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getProtected(@Req() req: any) {
    console.log('GATEWAY Verifying: ', req.user.sub);
    return this.userService.getUserInfo(req.user.sub);
    // return req.user;
  }
}
