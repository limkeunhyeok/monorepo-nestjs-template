import { createToken } from '@common/modules/lib/token';
import { UserEntity } from '@common/modules/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { serverConfig } from '../../config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login({ email, password }: LoginDto) {
    const userEntity = await this.userRepository.findOneByOrFail({ email });
    if (userEntity.isLock) {
      throw new BadRequestException('This user is locked out.');
    }

    if (!userEntity.comparedPassword(password)) {
      const loginFailCount = userEntity.loginFailCount + 1;
      const isLock = loginFailCount === 5 ? true : false;
      await this.userRepository.save({
        ...userEntity,
        loginFailCount,
        isLock,
      });

      throw new BadRequestException('Incorrect email or password');
    }

    await this.userRepository.save({
      ...userEntity,
      loginFailCount: 0,
      latestTryLoginDate: new Date(),
    });

    const accessToken = createToken(
      {
        userId: userEntity.id,
        role: userEntity.role,
      },
      serverConfig.jwtSecret,
    );
    return { accessToken };
  }
}
