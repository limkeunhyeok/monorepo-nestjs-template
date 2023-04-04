import { Post } from '@common/modules/mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
    return await this.postRepository.createPost({ ...dto, authorId: userId });
  }

  async updatePost(postId: string, userId: string, dto: UpdatePostDto) {
    const isPostAuthor = await this.postRepository.checkPostAuthor(
      postId,
      userId,
    );

    if (!isPostAuthor) {
      throw new ForbiddenException('Access is denied');
    }
    return await this.postRepository.updatePost(postId, dto);
  }

  async deletePost(postId: string) {
    return await this.postRepository.deletePost(postId);
  }

  async createComment(postId: string, authorId: string, contents: string) {
    const hasPost = await this.postRepository.findPostByQuery({ _id: postId });

    const comment = await this.commentService.createComment({
      postId,
      authorId,
      contents,
    });

    hasPost.comments.push(comment._id);
    await hasPost.save();

    return comment;
  }
}
