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
import { UserInToken } from '../users/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
    return await this.postService.getPostByQuery({ id: postId });
  }

  @Post('/')
  async createPost(
    @UserInToken('userId') userId: number,
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.createPost(userId, dto);
  }

  @Put('/:postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return await this.postService.updatePost(postId, dto);
  }

  @Delete('/:postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.deletePost(postId);
  }
}
