import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private prismaService: PrismaService) {}

  async createListing(data: any) {
    try {
      const newListing = await this.prismaService.listing.create({
        data,
      });
      if (!newListing) {
        console.log('Error creating listing');
      }
      console.log('Listing created: ', newListing);
      return newListing;
    } catch (error) {
      console.log('error catch: ', error);
      throw new Error(`${error}`);
    }
  }
}
