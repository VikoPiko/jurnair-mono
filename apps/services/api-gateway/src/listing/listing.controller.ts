import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('create')
  async createListing(@Body() listing: any) {
    console.log('API recieved: ', listing);
    return await this.listingService.createListing(listing);
  }

  @Get('all')
  async getListings() {
    return this.listingService.getListings();
  }
}
