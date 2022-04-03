import { MockType } from 'src/types/testing.types';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';
import { UpdateFreelanceDto } from '../dtos/update-freelancer.dto';
import { FreelancersService } from '../services/freelancers.service';

const exampleOfFreelancerEntity = {
  id: 1,
  email: 'amirul+1@test.com',
  username: 'amirul',
  phone_number: '+60123456789',
  skillsets: 'Drawing, cooking',
  hobby: 'Sleeping',
};

const updatedFreelancerEntity = {
  id: 1,
  email: 'amirul+3@test.com',
  username: 'amirul',
  phone_number: '+60123456789',
  skillsets: 'Drawing, cooking',
  hobby: 'Sleeping',
};

const mockedFreelancerService: () => MockType<FreelancersService> = jest.fn(
  () => ({
    findOne: jest.fn(async (id: number) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    create: jest.fn(async (data: CreateFreelanceDto) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    update: jest.fn(async (data: UpdateFreelanceDto) =>
      Promise.resolve(updatedFreelancerEntity),
    ),
    remove: jest.fn(async (id: number) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    checkIfEmailExists: jest.fn(async (email: string) =>
      Promise.resolve(false),
    ),
    throwErrorIfEmailExists: jest.fn(async (email: string) =>
      Promise.resolve(),
    ),
  }),
);

export {
  exampleOfFreelancerEntity,
  updatedFreelancerEntity,
  mockedFreelancerService,
};
