import { Test, TestingModule } from '@nestjs/testing';
import { FreelancersController } from './freelancers.controller';
import { mockedFreelancerService } from './factories/freelancer-service-mock.factory';
import { mockedAuthService } from './factories/auth-service-mock.factory';
import { FreelancersService } from './services/freelancers.service';
import { AuthService } from './services/auth.service';

describe('FreelancersController', () => {
  let controller: FreelancersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreelancersController],
      providers: [
        {
          provide: FreelancersService,
          useFactory: mockedFreelancerService,
        },
        {
          provide: AuthService,
          useFactory: mockedAuthService,
        },
      ],
    }).compile();

    controller = module.get<FreelancersController>(FreelancersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
