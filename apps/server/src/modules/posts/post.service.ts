import { PostEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
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
}
