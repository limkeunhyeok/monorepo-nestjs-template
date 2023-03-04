import { UserEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async createdUser(dto: CreateUserDto) {
    const userEntity = await this.userRepository.create({ ...dto });
    await this.userRepository.save(userEntity);
    return userEntity.toJson();
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    const hasUser = await this.userRepository.findOneByOrFail({
      id: userId,
    });

    const updatedUser = await this.userRepository.create({
      ...hasUser,
      ...dto,
    });

    await this.userRepository.save(updatedUser);
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
