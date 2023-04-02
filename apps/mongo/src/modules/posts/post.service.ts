import { Post } from '@common/modules/mongoose';
import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CommentService } from '../comments/comment.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentService: CommentService,
  ) {}

  async getPosts() {
    return await this.postRepository.findPosts();
  }

  async getPostByQuery(query: FilterQuery<Post>) {
    return await this.postRepository.findPostByQuery(query);
  }

  async createPost(userId: string, dto: CreatePostDto) {
    return await this.postRepository.createPost(userId, dto);
  }

  async updatePost(postId: string, userId: string, dto: UpdatePostDto) {
    return await this.postRepository.updatePost(postId, userId, dto);
  }

  async deletePost(postId: string) {
    return await this.postRepository.deletePost(postId);
  }
}
