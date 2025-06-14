import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express';
import { CustomHttpException } from 'src/filters/http-exception.filter';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    
    private admin = {
        email: 'admin@example.com',
        password: 'password123',
    }
    
    async validateUser(email: string, password: string): Promise<any> {
        if (email === this.admin.email && password === this.admin.password) {
            const { password, ...rest } = this.admin;
            return rest;
        }
        throw new CustomHttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    
    async login(user: any, response: Response) {
        const payload = { email: user.email };
        
        const expires = new Date(
            Date.now() + Number(this.configService.get('JWT_EXPIRATION')) * 1000,
        );
        const token = this.jwtService.sign(payload)
        
        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        });
        
        response.send();
        
    }
    
    logout(response: Response): void {
        response.cookie('Authentication', '', {
            httpOnly: true,
            expires: new Date(),
        });
        
        response.send();
    }
}
