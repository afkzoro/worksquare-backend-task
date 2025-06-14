import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FilterListingsDto } from './dto/listing.dto';
import { ListingService } from './listing.service';
import { CustomHttpException } from '../filters/http-exception.filter';

@ApiTags('Listings')
@Controller('listing')
export class ListingController {
    constructor(private readonly listingsService: ListingService) {}

    @ApiOperation({ summary: 'Get all listings with filters' })
    @ApiResponse({ 
        status: 200, 
        description: 'Returns paginated list of properties with applied filters' 
    })
    @Get()
    async getAllListings(@Query() query: FilterListingsDto) {
        return this.listingsService.findAll(query);
    }

    @ApiOperation({ summary: 'Get a listing by ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Returns a single property listing' 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Listing not found' 
    })
    @Get(':id')
    async getListingById(@Param('id', ParseIntPipe) id: number) {
        const listing = await this.listingsService.findById(id);
        if (!listing) {
            throw new CustomHttpException(
                `Listing with ID = ${id} not found`,
                HttpStatus.NOT_FOUND
            );
        }
        return listing;
    }
}