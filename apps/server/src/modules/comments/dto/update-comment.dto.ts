import { IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  commentId: number;

  @IsString()
  contents: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  postId: number;
}
