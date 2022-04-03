import { Test } from '@nestjs/testing';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';
import { AuthService } from './auth.service';
import { FreelancersService } from './freelancers.service';
import {
  exampleOfFreelancerEntity,
  mockedFreelancerService,
} from '../factories/freelancer-service-mock.factory';

let service: AuthService;

describe('AuthService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: FreelancersService,
          useFactory: mockedFreelancerService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    expect(service).toBeDefined();
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Password are hashed before saving', async () => {
    const testPassword = 'testing123';

    const result = await service.hashPassword(testPassword);

    expect(result).not.toEqual(testPassword);
  });

  it('Can register a freelancer', async () => {
    const params: CreateFreelanceDto = {
      email: 'amirul+1@test.com',
      password: 'test123',
      username: 'amirul',
      phone_number: '+60123456789',
      skillsets: 'Drawing, cooking',
      hobby: 'Sleeping',
    };

    const createFreelancer = await service.signUp(params);

    delete params.password;

    expect(createFreelancer).toEqual(exampleOfFreelancerEntity);
  });
});
