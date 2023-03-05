import { Role } from '@common/modules/typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGurad } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/users')
@UseGuards(AuthGurad([Role.ADMIN]))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserByQuery({ id: userId });
  }

  @Post('/')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createdUser(dto);
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
