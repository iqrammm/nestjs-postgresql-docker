import { AuthService } from '../services/auth.service';
import { CreateFreelanceDto } from '../dtos/create-freelancer-dto';
import { MockType } from 'src/types/testing.types';

const exampleOfFreelancerEntity = {
  id: 1,
  email: 'amirul+1@test.com',
  username: 'amirul',
  phone_number: '+60123456789',
  skillsets: 'Drawing, cooking',
  hobby: 'Sleeping',
};

const mockedAuthService: () => MockType<AuthService> = jest.fn(() => ({
  signUp: jest.fn(async (CreateFreelanceDto) =>
    Promise.resolve(exampleOfFreelancerEntity),
  ),
  hashPassword: jest.fn(async (password: string) => {
    return `test1213.${password}`;
  }),
}));

export { mockedAuthService };
