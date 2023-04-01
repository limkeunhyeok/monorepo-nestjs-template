import {
  Comment,
  CommentSchema,
} from '@common/modules/mongoose/schema/comment.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  exports: [CommentService, CommentRepository],
  controllers: [],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
