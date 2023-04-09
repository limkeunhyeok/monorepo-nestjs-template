import { Post } from '@common/modules/mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CommentService } from '../comments/comment.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../comments/dto/update-comment.dto';
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

  async createComment(postId: string, authorId: string, dto: CreateCommentDto) {
    const hasPost = await this.postRepository.findPostByQuery({ _id: postId });

    const comment = await this.commentService.createComment({
      postId,
      authorId,
      ...dto,
    });

    hasPost.comments.push(comment._id);
    await hasPost.save();

    return comment;
  }

  async getCommentsByPostId(postId: string) {
    const comments = await this.commentService.getCommentByQuery({ postId });
    return comments;
  }

  async updateComment(
    postId: string,
    authorId: string,
    commentId: string,
    dto: UpdateCommentDto,
  ) {
    await this.postRepository.findPostByQuery({ _id: postId });

    const comment = await this.commentService.updateComment({
      authorId,
      commentId,
      ...dto,
    });

    return comment;
  }

  async deleteComment(postId: string, authorId: string, commentId: string) {
    const hasPost = await this.postRepository.findPostByQuery({ id: postId });

    const hasComment = await this.commentService.getCommentByQuery({
      id: commentId,
      authorId,
    });

    const comment = await this.commentService.deleteComment(hasComment.id);

    const deletedComments = hasPost.comments.filter(
      (comment) => comment._id.toString() !== commentId,
    );

    hasPost.comments = deletedComments;
    await hasPost.save();
    return comment;
  }
}
