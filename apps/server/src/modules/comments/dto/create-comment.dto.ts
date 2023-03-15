import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  contents: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  postId: number;
}
