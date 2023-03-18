import { CommentEntity } from '@common/modules/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async getComments(query?: FindOptionsWhere<CommentEntity>) {
    const commentEntities = await this.commentRepository.findBy(query);
    return commentEntities;
  }

  async getCommentByQuery(query: FindOptionsWhere<CommentEntity>) {
    const commentEntity = await this.commentRepository.findOneByOrFail(query);
    return commentEntity;
  }

  async createComment(postId: number, authorId: number, dto: CreateCommentDto) {
    const commentEntity = await this.commentRepository.create({
      postId,
      authorId,
      ...dto,
    });
    await this.commentRepository.save(commentEntity);
    return commentEntity;
  }

  async updateComment(
    authorId: number,
    commentId: number,
    dto: UpdateCommentDto,
  ) {
    const hasComment = await this.commentRepository.findOneByOrFail({
      id: commentId,
    });

    if (authorId !== hasComment.authorId) {
      throw new ForbiddenException('Access is denied.');
    }

    const updatedComment = await this.commentRepository.create({
      ...hasComment,
      ...dto,
    });

    await this.commentRepository.save(updatedComment);
    return updatedComment;
  }

  async deleteComment(commentId: number) {
    const hasComment = await this.commentRepository.findOneByOrFail({
      id: commentId,
    });
    await this.commentRepository.delete({ id: commentId });
    return hasComment;
  }
}
