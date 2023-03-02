import { PostEntity } from '@common/modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPosts() {
    const postEntities = await this.postRepository.find({});
    return postEntities.map((postEntity) => postEntity.toJson());
  }

  async getPostById(id: number) {
    const postEntity = await this.postRepository.findOneByOrFail({ id });
    return postEntity.toJson();
  }
}
