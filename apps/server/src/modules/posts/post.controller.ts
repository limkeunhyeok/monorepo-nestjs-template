import { Get, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';

@Injectable()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get('/:postId')
  async getPostById(@Param(ParseIntPipe) postId: number) {
    return this.postService.getPostById(postId);
  }
}
