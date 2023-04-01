import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  authorId: string;

  @IsString()
  postId: string;

  @IsString()
  contents: string;
}
