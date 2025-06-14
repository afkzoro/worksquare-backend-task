import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ListingModule } from './listing/listing.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60 * 60,
          limit: 100
        }
      ]
    }),
    AuthModule,
    AdminModule,
    ListingModule],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
