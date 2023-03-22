import { Role } from '@common/modules/mongoose';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsEnum(Role)
  role?: Role;
}
