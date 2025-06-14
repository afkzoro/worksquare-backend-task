import { Injectable } from '@nestjs/common';
import * as listingsData from '../listings.json';
import { Listing } from './interfaces/listing.interface';
import { FilterListingsDto } from './dto/listing.dto';

@Injectable()
export class ListingService {
    private listings: Listing[] = listingsData;
    
    async findAll(query: FilterListingsDto) {
        const { location, type, page = '1', limit = '10', minPrice, maxPrice, rentalType } = query;
        let results = [...this.listings];
        
        if (location) {
            results = results.filter(listing =>
                listing.location.toLowerCase().includes(location.toLowerCase()),
            );
        }
        
        if (type) {
            results = results.filter(
                listing => listing.status[0]?.toLowerCase() === type.toLowerCase(),
            );
        }
        
        if (rentalType) {
            results = results.filter(listing => {
                const normalizedListingType = listing.status[1]?.toLowerCase().replace(/\s+/g, '');
                const normalizedQueryType = rentalType.toLowerCase().replace(/\s+/g, '');
                return normalizedListingType === normalizedQueryType;
            });
        }
        
        if (minPrice || maxPrice) {
            results = results.filter(listing => {
                const listingPrice = parseInt(listing.price.replace(/₦|,|\s\/\s(week|night)/g, ''));
                
                if (minPrice && maxPrice) {
                    return listingPrice >= parseInt(minPrice) && listingPrice <= parseInt(maxPrice);
                } else if (minPrice) {
                    return listingPrice >= parseInt(minPrice);
                } else if (maxPrice) {
                    return listingPrice <= parseInt(maxPrice);
                }
                return true;
            });
        }
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const start = (pageNum - 1) * limitNum;
        const paginated = results.slice(start, start + limitNum);
        
        return {
            page: pageNum,
            limit: limitNum,
            total: results.length,
            data: paginated,
        };
    }
    
    async findById(id: number): Promise<Listing | undefined> {
        return this.listings.find(listing => listing.id === id);
    }
}

