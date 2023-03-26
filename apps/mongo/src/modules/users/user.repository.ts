import { User } from '@common/modules/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUsers() {
    return await this.userModel.find({});
  }

  async findUserByQuery(query: FilterQuery<User>) {
    const hasUser = await this.userModel.findOne(query);
    if (!hasUser) {
      throw new NotFoundException('The user does not exists.');
    }

    return hasUser;
  }

  async createUser({ email, password, username, role }: CreateUserDto) {
    const hasUser = await this.userModel.findOne({ email });
    if (hasUser) {
      throw new NotFoundException('A user that exists.');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashPassword,
      username,
      role,
    });
    return user;
  }

  async updateUser(userId: string, dto: Partial<User>) {
    const user = await this.userModel.findByIdAndUpdate(userId, dto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('The user does not exists.');
    }

    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId, { new: true });

    if (!user) {
      throw new NotFoundException('The user does not exists.');
    }

    return user;
  }
}
