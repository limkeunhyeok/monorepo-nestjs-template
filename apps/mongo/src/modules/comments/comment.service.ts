import { Comment } from '@common/modules/mongoose/schema/comment.schema';
import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAll() {
    const comments = await this.commentRepository.findComments();
    return comments;
  }

  async getCommentByQuery(query: FilterQuery<Comment>) {
    return await this.commentRepository.findCommentByQuery(query);
  }

  async createComment(dto: CreateCommentDto) {
    return await this.commentRepository.createComment(dto);
  }

  async updateComment(dto: UpdateCommentDto) {
    return await this.commentRepository.updateComment(dto);
  }

  async deleteComment(dto: DeleteCommentDto) {
    return await this.commentRepository.deleteComment(dto);
  }
}
