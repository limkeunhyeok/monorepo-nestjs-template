import { Role } from '@common/modules/mongoose';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
