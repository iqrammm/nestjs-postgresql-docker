import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateFreelanceDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  skillsets: string;

  @IsString()
  @IsOptional()
  hobby: string;
}
