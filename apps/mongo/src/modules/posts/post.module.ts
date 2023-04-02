import { Post, PostSchema } from '@common/modules/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  exports: [PostService, PostRepository],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
