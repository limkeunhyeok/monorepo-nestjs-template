import { CommentEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
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

  async createComment(dto: CreateCommentDto) {
    const commentEntity = await this.commentRepository.create({ ...dto });
    await this.commentRepository.save(commentEntity);
    return commentEntity;
  }

  async updateComment(dto: UpdateCommentDto) {
    const hasComment = await this.commentRepository.findOneByOrFail({
      id: dto.commentId,
    });

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
