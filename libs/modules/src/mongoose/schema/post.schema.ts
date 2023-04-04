import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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
  authorId: string;

  @Prop({ type: [Types.ObjectId] })
  comments: [Types.ObjectId];
}

export const PostSchema = SchemaFactory.createForClass(Post);
