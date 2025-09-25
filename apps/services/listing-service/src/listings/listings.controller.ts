import { Controller } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @MessagePattern('create-listing')
  createListing(@Payload() listing: any) {
    return this.listingsService.createListing(listing);
  }
}
