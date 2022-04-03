import { IsEmail, IsString } from 'class-validator';

export class CreateFreelanceDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  phone_number: string;

  @IsString()
  skillsets: string;

  @IsString()
  hobby: string;
}
