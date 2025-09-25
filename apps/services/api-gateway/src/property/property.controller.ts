import { Body, Controller, Get, Post } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('create')
  async createNewProperty(@Body() data: any) {
    return await this.propertyService.createNewProperty(data);
  }

  @Get('get-all')
  async getAllProperties() {
    return await this.propertyService.getAllProperties();
  }
}
