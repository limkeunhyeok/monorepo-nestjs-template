import { User } from '@common/modules/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUsers() {
    return await this.userModel.find({});
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user;
  }
}
