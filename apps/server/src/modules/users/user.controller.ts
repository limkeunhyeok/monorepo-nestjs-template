import {
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Injectable()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  async getUserById(@Param(ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Post('/')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createdUser(dto);
  }

  @Put('/:userId')
  async updateUser(
    @Param(ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete('/:userId')
  async deleteUser(@Param(ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
