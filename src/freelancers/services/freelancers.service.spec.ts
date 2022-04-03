import { Test, TestingModule } from '@nestjs/testing';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';
import { FreelancersService } from './freelancers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Freelancer } from '../entity/freelancer.entitiy';
import { UpdateFreelanceDto } from '../dtos/update-freelancer.dto';
import {
  exampleOfFreelancerEntity,
  updatedFreelancerEntity,
  mockedFreelancerRepository,
} from '../factories/freelancer-repository-mock.factory';

describe('FreelancersService', () => {
  let service: FreelancersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreelancersService,
        {
          provide: getRepositoryToken(Freelancer),
          useFactory: mockedFreelancerRepository,
        },
      ],
    }).compile();

    service = module.get<FreelancersService>(FreelancersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find freelancer based on id', async () => {
    const result = await service.findOne(1);

    expect(result).toStrictEqual(exampleOfFreelancerEntity);
  });

  it('should be able to create a freelancer', async () => {
    const paramsToCreateNewFreelancer: CreateFreelanceDto = {
      email: 'amirul+1@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    const result = await service.create(paramsToCreateNewFreelancer);

    expect(result).toStrictEqual(exampleOfFreelancerEntity);
  });

  it('should be able to update a freelancer', async () => {
    const paramsToUpdateNewFreelancer: UpdateFreelanceDto = {
      email: 'amirul+3@test.com',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    const result = await service.update(1, paramsToUpdateNewFreelancer);

    expect(result).toStrictEqual(updatedFreelancerEntity);
  });

  it('should be able to delete a freelancer', async () => {
    const result = await service.remove(1);

    expect(result).toStrictEqual(exampleOfFreelancerEntity);
  });
});
