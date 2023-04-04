import { Post } from '@common/modules/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findPosts() {
    return await this.postModel.find({});
  }

  async findPostByQuery(query: FilterQuery<Post>) {
    const hasPost = await this.postModel.findOne(query);
    if (!hasPost) {
      throw new NotFoundException('The post does not exists.');
    }

    return hasPost;
  }

  async createPost(dto: Partial<Post>) {
    const post = await this.postModel.create(dto);
    return post;
  }

  async updatePost(postId: string, dto: Partial<Post>) {
    const hasPost = await this.postModel.findById(postId);

    if (!hasPost) {
      throw new NotFoundException('The post does not exists.');
    }

    const post = await this.postModel.findByIdAndUpdate(postId, dto, {
      new: true,
    });

    return post;
  }

  async deletePost(postId: string) {
    const post = await this.postModel.findByIdAndDelete(postId, { new: true });

    if (!post) {
      throw new NotFoundException('The post does not exists.');
    }

    return post;
  }

  async checkPostAuthor(postId: string, authorId: string) {
    const hasPost = await this.postModel.findById(postId);

    if (!hasPost) {
      throw new NotFoundException('The post does not exists.');
    }

    if (hasPost.authorId !== authorId) {
      return false;
    }
    return true;
  }
}
