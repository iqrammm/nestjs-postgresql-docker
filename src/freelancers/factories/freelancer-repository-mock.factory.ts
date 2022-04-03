import { MockType } from 'src/types/testing.types';
import { Repository } from 'typeorm';
import { Freelancer } from '../entity/freelancer.entitiy';

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

const mockedFreelancerRepository: () => MockType<Repository<Freelancer>> =
  jest.fn(() => ({
    findOne: jest.fn(async (id: number) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    create: jest.fn(async (CreateFreelanceDto) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    save: jest.fn(async (CreateFreelanceDto) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
    update: jest.fn(async (UpdateFreelanceDto) =>
      Promise.resolve(updatedFreelancerEntity),
    ),
    remove: jest.fn(async (id: number) =>
      Promise.resolve(exampleOfFreelancerEntity),
    ),
  }));

export {
  exampleOfFreelancerEntity,
  updatedFreelancerEntity,
  mockedFreelancerRepository,
};
