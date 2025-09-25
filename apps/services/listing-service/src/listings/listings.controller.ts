import { Controller } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @MessagePattern('listing-created')
  createListing(@Payload() listing: any) {
    return this.listingsService.createListing(listing);
  }

  @MessagePattern('get-listings')
  getListings() {
    return this.listingsService.getListings();
  }
}
