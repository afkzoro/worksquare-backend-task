import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterListingsDto {
    @ApiProperty({
        description: 'Location of the property',
        example: 'Lagos',
        required: false
    })
    @IsOptional()
    @IsString()
    location?: string;
    
    @ApiProperty({
        description: 'Type of property (House, Flat, Terrace)',
        example: 'House',
        required: false
    })
    @IsOptional()
    @IsString()
    type?: string;
    
    @ApiProperty({
        description: 'Rental type (For Rent, For Lease, Shortlet)',
        example: 'For Rent',
        required: false
    })
    @IsOptional()
    @IsString()
    rentalType?: string;
    
    @ApiProperty({
        description: 'Page number for pagination',
        example: '1',
        default: '1',
        required: false
    })
    @IsOptional()
    @IsNumberString()
    page?: string;
    
    @ApiProperty({
        description: 'Number of items per page',
        example: '10',
        default: '10',
        required: false
    })
    @IsOptional()
    @IsNumberString()
    limit?: string;
    
    @ApiProperty({
        description: 'Minimum price for filtering',
        example: '1000000',
        required: false
    })
    @IsOptional()
    @IsNumberString()
    minPrice?: string;
    
    @ApiProperty({
        description: 'Maximum price for filtering',
        example: '5000000',
        required: false
    })
    @IsOptional()
    @IsNumberString()
    maxPrice?: string;
}