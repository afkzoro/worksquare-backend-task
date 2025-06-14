import { Injectable } from '@nestjs/common';
import * as listingsData from '../listings.json';
import { Listing } from '../listing/interfaces/listing.interface';

@Injectable()
export class AdminService {
    private listings: Listing[] = listingsData;

    async createListing(listing: Omit<Listing, 'id'>): Promise<Listing> {
        const maxId = Math.max(...this.listings.map(l => l.id || 0));
        
        const newListing: Listing = {
            id: maxId + 1,
            ...listing
        };

        this.listings.push(newListing);

        return newListing;
    }
}