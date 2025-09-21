import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async signup(user: any) {
    try {
      console.log(
        `Reached rabbitmq signup with: ${user.username} and ${user.password}`
      );
      const hash = await bcrypt.hash(user.password, 10);
      const newUser = await this.prismaService.user.create({
        data: {
          email: user.username,
          password: hash,
        },
      });
      if (!newUser) {
        console.log('Failed creating user');
      }
      console.log(`Created user ${newUser.email} with id: ${newUser.id}`);
      return newUser;
      // return { user: { username: user.username, password: user.password } };
    } catch (error) {
      console.log('Prisma error: ', error);
      return new Error('Error in sign up.');
    }
  }

  async login(user: any) {
    console.log(`User received - login: ${user.username}; ${user.password}`);
    try {
      const dbUser = await this.prismaService.user.findUnique({
        where: {
          email: user.username,
        },
      });
      if (!dbUser) {
        return 'no db user found...';
      }

      const passwordMatch = await bcrypt.compare(
        user.password,
        dbUser.password
      );
      if (!passwordMatch) {
        console.log('password mismatch');
        return null;
      }

      const payload = { sub: dbUser.id, email: dbUser.email };
      const token = this.jwtService.sign(payload);
      if (!token) {
        console.log(`Error generating token...`);
      }

      console.log(token);
      console.log({ token });
      return { token };
    } catch (error) {
      console.log(`[AUTH_SERVICE] Error logging in...`);
      return null;
    }
    // return user;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
