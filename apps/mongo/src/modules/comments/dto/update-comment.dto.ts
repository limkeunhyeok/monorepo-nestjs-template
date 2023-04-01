import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  authorId: string;

  @IsString()
  commentId: string;

  @IsString()
  contents: string;
}
