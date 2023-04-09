import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../comments/dto/update-comment.dto';
import { UserInToken } from '../users/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('/posts')
@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/:postId')
  async getPostById(@Param('postId') postId: string) {
    return this.postService.getPostByQuery({ _id: postId });
  }

  @Post('/')
  async createPost(
    @UserInToken('userId') userId: string,
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.createPost(userId, dto);
  }

  @Put('/:postId')
  async updatePost(
    @UserInToken('userId') userId: string,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.updatePost(postId, userId, dto);
  }

  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }

  @Post('/:postId/comments')
  async createComment(
    @Param('postId') postId: string,
    @UserInToken('userId') userId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.postService.createComment(postId, userId, dto);
  }

  @Get('/:postId/comments')
  async getCommentsByPostId(@Param('postId') postId: string) {
    return await this.postService.getCommentsByPostId(postId);
  }

  @Put('/:postId/comments/:commentId')
  async updateComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @UserInToken('userId') userId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return await this.postService.updateComment(postId, userId, commentId, dto);
  }

  @Delete('/:postId/comments/:commentId')
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @UserInToken('userId') userId: string,
  ) {
    return await this.postService.deleteComment(postId, userId, commentId);
  }
}
