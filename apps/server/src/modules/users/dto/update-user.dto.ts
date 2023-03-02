import { Role, UserInfo } from '@common/modules/typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto implements UserInfo {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsEnum(Role)
  role: Role;
}
