import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { schemaOptions } from './schema-options';

@Schema(schemaOptions)
export class Post extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  contents: string;

  @Prop({ type: Boolean, default: true })
  published: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'user' })
  authorId: number;

  @Prop({ type: [CommentSchema] })
  comments: [Comment];
}

export const PostSchema = SchemaFactory.createForClass(Post);
