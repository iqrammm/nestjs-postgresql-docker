import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Freelancer } from '../entity/freelancer.entitiy';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';

@Injectable()
export class FreelancersService {
  constructor(
    @InjectRepository(Freelancer) private repo: Repository<Freelancer>,
  ) {
    this.repo = repo;
  }

  create(data: CreateFreelanceDto): Promise<Freelancer> {
    // Importance of using save
    // incase there is usage of hooks from typeorm
    // like @AfterUpdate / AfterInsert
    // using .create / .update would trigger those hooks
    const freelancer = this.repo.create(data);

    return this.repo.save(freelancer);
  }

  async findOne(id: number): Promise<Freelancer> {
    const freelancer = await this.repo.findOne({ where: [{ id }] });

    if (!freelancer) {
      throw new NotFoundException(`Freelancer not found for id ${id}`);
    }

    return freelancer;
  }

  find(email?: string, username?: string): Promise<Freelancer[]> {
    // some notes on this,
    // if its a really big company with probably thousands/millions of
    // freelancers
    // using approach like elasticsearch would be better for scalability
    let freelancers = this.repo.createQueryBuilder('freelancer');

    freelancers = this.parseFilters(freelancers, { email, username });

    return freelancers.getMany();
  }

  parseFilters(queryBuilder, { email, username }) {
    // Would be nice if i can have .when but oh well
    // this works for now
    if (email && email !== '') {
      queryBuilder = queryBuilder.where('freelancer.email like :email', {
        email: `%${email}%`,
      });
    }

    if (username && username !== '') {
      queryBuilder = queryBuilder.where('freelancer.username like :username', {
        username: `%${username}%`,
      });
    }

    return queryBuilder;
  }

  async update(id: number, attrs: Partial<Freelancer>) {
    const freelancer = await this.findOne(id);

    Object.assign(freelancer, attrs);

    return this.repo.save(freelancer);
  }

  async remove(id: number): Promise<Freelancer> {
    const freelancer = await this.findOne(id);

    // .delete wont trigger hooks
    // but .remove does trigger it
    // similar to save vs insert/update
    return this.repo.remove(freelancer);
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const emailExists = await this.repo.find({ where: [{ email }] });

    return emailExists.length !== 0;
  }

  async throwErrorIfEmailExists(email: string): Promise<void> {
    const emailExists = await this.checkIfEmailExists(email);

    if (emailExists) throw new BadRequestException('Email already exists');
  }
}
