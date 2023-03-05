import { PostEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

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

  async getPostById(id: number) {
    const postEntity = await this.postRepository.findOneByOrFail({ id });
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
}
