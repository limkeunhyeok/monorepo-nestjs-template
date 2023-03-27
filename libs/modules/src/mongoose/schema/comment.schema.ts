import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { schemaOptions } from './schema-options';

@Schema(schemaOptions)
export class Comment extends Document {
  @Prop({ required: true })
  contents: string;

  @Prop({ type: Boolean, default: true })
  published: boolean;

  @Prop({ required: true, type: Types.ObjectId })
  authorId: number;

  @Prop({ required: true, type: Types.ObjectId })
  postId: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
