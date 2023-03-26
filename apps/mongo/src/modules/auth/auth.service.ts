import { createToken } from '@common/modules/lib/token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { serverConfig } from '../../config';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.getUserByQuery({ email });
    if (user.isLock) {
      throw new BadRequestException('This user is locked out.');
    }

    if (!user.comparedPassword(password)) {
      const loginFailCount = user.loginFailCount + 1;
      const isLock = loginFailCount === 5 ? true : false;
      await this.userService.updateUser(user.id, {
        ...user,
        loginFailCount,
        isLock,
      });

      throw new BadRequestException('Incorrect email or password');
    }

    await this.userService.updateUser(user.id, {
      ...user,
      loginFailCount: 0,
      latestTryLoginDate: new Date(),
    });

    const accessToken = createToken(
      {
        userId: user.id,
        role: user.role,
      },
      serverConfig.jwtSecret,
    );
    return { accessToken };
  }
}
