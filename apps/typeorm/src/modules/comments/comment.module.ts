import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  exports: [CommentService],
  providers: [CommentService],
})
export class CommentModule {}
