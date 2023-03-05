import { Role } from '@common/modules/typeorm';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGurad } from '../auth/auth.guard';
import { UserInToken } from '../users/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('/posts')
@UseGuards(AuthGurad([Role.ADMIN, Role.MEMBER]))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/:postId')
  async getPostById(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPostById(postId);
  }

  @Post('/')
  async createPost(
    @UserInToken('userId') userId: number,
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.createPost(userId, dto);
  }
}
