import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancersService } from './services/freelancers.service';
import { AuthService } from './services/auth.service';
import { FreelancersController } from './freelancers.controller';
import { Freelancer } from './entity/freelancer.entitiy';
import { ClassSerializerInterceptor } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Freelancer])],
  providers: [
    FreelancersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [FreelancersController],
})
export class FreelancersModule {}
