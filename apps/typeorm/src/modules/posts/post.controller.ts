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
import { ApiTags } from '@nestjs/swagger';
import { AuthGurad } from '../auth/auth.guard';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../comments/dto/update-comment.dto';
import { UserInToken } from '../users/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('/posts')
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

  @Post('/:postId/comments')
  async createComments(
    @Param('postId', ParseIntPipe) postId: number,
    @UserInToken('userId') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.postService.createComments(postId, userId, dto);
  }

  @Get('/:postId/comments')
  async getCommentsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getCommentsByPostId(postId);
  }

  @Put('/:postId/comments/:commentId')
  async updateComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @UserInToken('userId') userId: number,
    @Body() dto: UpdateCommentDto,
  ) {
    return await this.postService.updateComments(
      postId,
      userId,
      commentId,
      dto,
    );
  }

  @Delete('/:postId/comments/:commentId')
  async deleteComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @UserInToken('userId') userId: number,
  ) {
    return await this.postService.deleteComments(postId, userId, commentId);
  }
}
