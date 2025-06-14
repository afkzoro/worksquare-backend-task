import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @ApiOperation({ summary: 'Login admin user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'admin@example.com',
          description: 'Admin email address'
        },
        password: {
          type: 'string',
          example: '********',
          description: 'Admin password'
        }
      },
      required: ['email', 'password']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully logged in',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT access token'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user, response);
  }
  
  @Get('logout')
  @ApiOperation({ summary: 'Logout admin user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  async logout(@Res() response: Response): Promise<any> {
    return this.authService.logout(response);
  }
}