import { Post } from '@common/modules/mongoose';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async createPost(userId: string, dto: CreatePostDto) {
    const post = await this.postModel.create({
      ...dto,
      authorId: userId,
    });
    return post;
  }

  async updatePost(postId: string, userId: string, dto: UpdatePostDto) {
    const hasPost = await this.postModel.findById(postId);

    if (!hasPost) {
      throw new NotFoundException('The post does not exists.');
    }

    if (hasPost.authorId !== userId) {
      throw new ForbiddenException('Access is denied.');
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
}
