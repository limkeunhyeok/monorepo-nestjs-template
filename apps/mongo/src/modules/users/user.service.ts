import { User } from '@common/modules/mongoose';
import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.findUsers();
    return users.map((user) => user.toJson());
  }

  async getUserByQuery(query: FilterQuery<User>) {
    const user = await this.userRepository.findUserByQuery(query);
    return user;
  }

  async createUser({ email, password, username, role }: CreateUserDto) {
    const user = await this.userRepository.createUser({
      email,
      password,
      username,
      role,
    });
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.updateUser(userId, dto);
    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.deleteUser(userId);
    return user;
  }
}
