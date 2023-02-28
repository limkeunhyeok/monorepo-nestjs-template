import { User, UserEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const userEntities = await this.userRepository.find({});
    return userEntities.map((userEntity) => userEntity.toJson());
  }

  async getUserById(id: number) {
    const userEntity = await this.userRepository.findOneByOrFail({ id });
    return userEntity.toJson();
  }

  async createdUser(user: User) {
    const userEntity = await this.userRepository.save(user);
    return userEntity.toJson();
  }
}
