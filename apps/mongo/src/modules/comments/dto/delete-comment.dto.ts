import { IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsString()
  authorId: string;

  @IsString()
  commentId: string;
}
