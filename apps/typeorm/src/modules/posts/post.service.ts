import { PostEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommentService } from '../comments/comment.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../comments/dto/update-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly commentService: CommentService,
  ) {}

  async getPosts() {
    const postEntities = await this.postRepository.find({});
    return postEntities;
  }

  async getPostByQuery(query: FindOptionsWhere<PostEntity>) {
    const postEntity = await this.postRepository.findOneByOrFail(query);
    return postEntity;
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const postEntity = await this.postRepository.create({
      ...dto,
      authorId: userId,
    });
    await this.postRepository.save(postEntity);
    return postEntity;
  }

  async updatePost(postId: number, dto: UpdatePostDto) {
    const hasPost = await this.postRepository.findOneByOrFail({
      id: postId,
    });

    const updatePost = await this.postRepository.create({
      ...hasPost,
      ...dto,
    });

    await this.postRepository.save({ ...updatePost });
    return updatePost;
  }

  async deletePost(postId: number) {
    const hasPost = await this.postRepository.findOneByOrFail({ id: postId });

    await this.postRepository.delete({ id: postId });
    return hasPost;
  }

  async createComments(
    postId: number,
    authorId: number,
    dto: CreateCommentDto,
  ) {
    await this.postRepository.findOneByOrFail({ id: postId });

    const comments = await this.commentService.createComment(
      postId,
      authorId,
      dto,
    );

    return comments;
  }

  async getCommentsByPostId(postId: number) {
    const comments = await this.commentService.getCommentByQuery({ postId });
    return comments;
  }

  async updateComments(
    postId: number,
    authorId: number,
    commentId: number,
    dto: UpdateCommentDto,
  ) {
    await this.postRepository.findOneByOrFail({ id: postId });

    const hasComment = await this.commentService.getCommentByQuery({
      id: commentId,
      authorId,
    });

    const comment = await this.commentService.updateComment(
      authorId,
      hasComment.id,
      dto,
    );
    return comment;
  }

  async deleteComments(postId: number, authorId: number, commentId: number) {
    await this.postRepository.findOneByOrFail({ id: postId });

    const hasComment = await this.commentService.getCommentByQuery({
      id: commentId,
      authorId,
    });

    const comment = await this.commentService.deleteComment(hasComment.id);
    return comment;
  }
}
