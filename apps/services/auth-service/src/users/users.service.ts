import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUser(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return 'User doesnt exist';
      }
      console.log('USER found in db: ', user);
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
