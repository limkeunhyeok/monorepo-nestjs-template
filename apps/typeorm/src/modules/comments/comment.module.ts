import { CommentEntity } from '@common/modules/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  exports: [CommentService],
  providers: [CommentService],
})
export class CommentModule {}
