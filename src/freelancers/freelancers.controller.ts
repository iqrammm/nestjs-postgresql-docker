import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Get,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { FreelancersService } from './services/freelancers.service';
import { CreateFreelanceDto } from './dtos/create-freelancer-dto';
import { UpdateFreelanceDto } from './dtos/update-freelancer.dto';
import { AuthService } from './services/auth.service';
import { Freelancer } from './entity/freelancer.entitiy';

@Controller('freelancers')
export class FreelancersController {
  constructor(
    private freelancerService: FreelancersService,
    private authService: AuthService,
  ) {}

  @Get()
  findAllFreelancers(
    @Query('email') email: string,
    @Query('username') username: string,
  ): Promise<Freelancer[]> {
    return this.freelancerService.find(email, username);
  }

  @Get('/:id')
  findOneFreelancer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Freelancer> {
    return this.freelancerService.findOne(id);
  }

  @Post('/register')
  registerFreelancer(@Body() body: CreateFreelanceDto): Promise<Freelancer> {
    return this.authService.signUp(body);
  }

  @Patch('/:id')
  updateFreelancer(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFreelanceDto,
  ): Promise<Freelancer> {
    return this.freelancerService.update(id, body);
  }

  @Delete('/:id')
  async deleteOneFreelancer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    const deletedFreelancer = await this.freelancerService.remove(id);
    return `Successfully deleted Freelancer with email ${deletedFreelancer.email}`;
  }
}
