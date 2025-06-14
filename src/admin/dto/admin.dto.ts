import { IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
    @ApiProperty({
        description: 'Title of the property',
        example: 'Brand New 4 Bedroom Fully Detached Duplex'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Price of the property',
        example: '2500000'
    })
    @IsString()
    price: string;

    @ApiProperty({
        description: 'Number of bedrooms',
        example: 4
    })
    @IsNumber()
    bedrooms: number;

    @ApiProperty({
        description: 'Number of bathrooms',
        example: 4
    })
    @IsNumber()
    bathrooms: number;

    @ApiProperty({
        description: 'Location of the property',
        example: 'Lekki, Lagos'
    })
    @IsString()
    location: string;

    @ApiProperty({
        description: 'Property status',
        example: ['House', 'For Rent']
    })
    @IsArray()
    status: string[];

    @ApiProperty({
        description: 'Image URL',
        example: 'property1.jpg'
    })
    @IsString()
    image: string;
}