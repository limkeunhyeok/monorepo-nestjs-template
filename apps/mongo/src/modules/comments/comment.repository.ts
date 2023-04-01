import { Comment } from '@common/modules/mongoose/schema/comment.schema';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async findComments() {
    return await this.commentModel.find({});
  }

  async findCommentByQuery(query: FilterQuery<Comment>) {
    const hasComment = await this.commentModel.findOne(query);
    if (!hasComment) {
      throw new NotFoundException('The comment does not exists.');
    }

    return hasComment;
  }

  async createComment({ contents, authorId, postId }: CreateCommentDto) {
    const comment = await this.commentModel.create({
      authorId,
      postId,
      contents,
    });
    return comment;
  }

  async updateComment({ authorId, commentId, contents }: UpdateCommentDto) {
    const hasComment = await this.commentModel.findById(commentId);
    if (!hasComment) {
      throw new NotFoundException('The comment does not exists.');
    }

    if (authorId !== hasComment.authorId) {
      throw new ForbiddenException('Access is denied.');
    }

    return await this.commentModel.findByIdAndUpdate(
      commentId,
      {
        contents,
      },
      { new: true },
    );
  }

  async deleteComment({ authorId, commentId }: DeleteCommentDto) {
    const hasComment = await this.commentModel.findById(commentId);
    if (!hasComment) {
      throw new NotFoundException('The comment does not exists.');
    }

    if (authorId !== hasComment.authorId) {
      throw new ForbiddenException('Access is denied.');
    }

    return await this.commentModel.findByIdAndDelete(commentId, { new: true });
  }
}
