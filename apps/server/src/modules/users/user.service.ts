import { UserEntity, UserInfo } from '@common/modules/typeorm';
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

  async getUserById(userId: number) {
    const userEntity = await this.userRepository.findOneByOrFail({
      id: userId,
    });
    return userEntity.toJson();
  }

  async createdUser(dto: UserInfo) {
    const userEntity = await this.userRepository.save(dto);
    return userEntity.toJson();
  }

  async updateUser(userId: number, dto: UserInfo) {
    const userEntity = await this.userRepository.findOneByOrFail({
      id: userId,
    });
    const updatedUser = await this.userRepository.save({
      ...userEntity,
      ...dto,
    });
    return updatedUser.toJson();
  }

  async deleteUser(userId: number) {
    const userEntity = await this.userRepository.findOneByOrFail({
      id: userId,
    });
    await this.userRepository.delete({ id: userId });
    return userEntity.toJson();
  }
}
