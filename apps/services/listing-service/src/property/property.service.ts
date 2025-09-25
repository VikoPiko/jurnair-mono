import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertyService {
  constructor(private prismaService: PrismaService) {}

  async updateHost(data: any) {
    try {
      const host = await this.prismaService.host.upsert({
        where: { hostId: data.id },
        update: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatarUrl: data.avatarUrl,
        },
        create: {
          hostId: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatarUrl: data.avatarUrl,
        },
      });
      console.log('updated host: ', host);
      return host;
    } catch (error) {
      console.error('Error upserting host:', error);
      throw error;
    }
  }

  async getProperties() {
    const properties = await this.prismaService.property.findMany();
    console.log('properties from db: ', properties);
    return properties;
  }

  async createProperty(data: any) {
    try {
      const host = await this.prismaService.host.findUnique({
        where: { hostId: data.hostId },
      });

      if (!host) throw new Error('Host does not exist!');

      const property = await this.prismaService.property.create({
        data: {
          title: data.title,
          description: data.description,
          location: data.location,
          lat: data.lat,
          lng: data.lng,
          images: data.images,
          hostId: host.id,
        },
      });

      console.log('created: ', property);
      return property;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
