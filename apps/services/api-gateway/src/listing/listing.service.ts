import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListingService {
  constructor(@Inject('PROPERTY_SERVICE') private client: ClientProxy) {}

  async createListing(listing: any) {
    return await lastValueFrom(this.client.send('listing-created', listing));
  }

  async getListings() {
    return await lastValueFrom(this.client.send('get-listings', {}));
  }
}
