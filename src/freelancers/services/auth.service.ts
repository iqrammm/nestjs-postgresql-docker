import { Injectable } from '@nestjs/common';
import { FreelancersService } from './freelancers.service';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Freelancer } from '../entity/freelancer.entitiy';

const scrypt = promisify(_scrypt); // so we dont have to deal with callbacks

@Injectable()
export class AuthService {
  constructor(private freelancerService: FreelancersService) {}

  async signUp(data: CreateFreelanceDto): Promise<Freelancer> {
    // check for freelancer Existence
    // might migrate this to validator class
    await this.freelancerService.throwErrorIfEmailExists(data.email);

    data.password = await this.hashPassword(data.password);

    return await this.freelancerService.create(data);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 8)) as Buffer;

    // Join the hashed result and the salt together
    return salt + '.' + hash.toString('hex');
  }
}
