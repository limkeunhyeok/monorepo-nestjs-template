import { PostEntity, UserEntity } from '@common/modules/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from '../comments/comment.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), CommentModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
