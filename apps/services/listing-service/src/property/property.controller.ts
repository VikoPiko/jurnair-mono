import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @MessagePattern('property-created')
  async createProperty(@Payload() data: any) {
    console.log('data to property: ', data);
    return await this.propertyService.createProperty(data);
  }

  @MessagePattern('host-created')
  async createHost(@Payload() data: any) {
    console.log('data recieved by listing: ', data);
    return await this.propertyService.updateHost(data);
  }

  @MessagePattern('get-properties')
  async getProperties(@Payload() data: any) {
    return await this.propertyService.getProperties();
  }
}
