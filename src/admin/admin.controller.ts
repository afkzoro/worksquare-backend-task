import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateListingDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('listings')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new property listing' })
    @ApiResponse({ 
        status: 201, 
        description: 'The listing has been successfully created' 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Invalid input data' 
    })
    async createListing(
        @Body() createListingDto: CreateListingDto
    ) {
        return this.adminService.createListing(createListingDto);
    }
}