import { Body, Controller, Post } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post('create')
  createListing(@Body() listing: any) {
    console.log('API recieved: ', listing);
    return this.listingService.createListing(listing);
  }
}
