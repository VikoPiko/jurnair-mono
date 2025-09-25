import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('PROPERTY_SERVICE') private propertyService: ClientProxy
  ) {}
  async createNewProperty(data: any) {
    console.log('data recieved in Gateway: ', data);
    return await lastValueFrom(
      this.propertyService.send('property-created', data)
    );
  }

  async getAllProperties() {
    return await lastValueFrom(this.propertyService.send('get-properties', {}));
  }
}
