import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { schemaOptions } from './schema-options';

export const Role = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

@Schema(schemaOptions)
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: String, enum: Role, default: Role.MEMBER })
  role: Role;

  @Prop({ default: 0 })
  loginFailCount?: number;

  @Prop({ default: new Date() })
  latestTryLoginDate?: Date;

  @Prop({ default: false })
  isLock?: boolean;

  toJson: () => Omit<User, 'password'>;

  comparedPassword: (attempt: string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJson = function (this: User) {
  const json = { ...this.toJSON() };

  delete json.password;

  return json;
};

UserSchema.methods.comparedPassword = function (this: User, attempt: string) {
  return bcrypt.compareSync(attempt, this.password);
};
