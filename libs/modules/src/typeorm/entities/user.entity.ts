import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { CommentEntity } from './comment.entity';
import { PostEntity } from './post.entity';

export const Role = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface UserJson {
  id: number;
  email: string;
  username: string;
  role: Role;
  posts?: PostEntity[];
  comments?: CommentEntity[];
}

export interface User extends UserJson {
  password: string;
}

export type UserInfo = Omit<User, 'id'>;

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'enum', enum: Role, default: Role.MEMBER })
  role: Role;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  comparedPassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password);
  }

  toJson() {
    const { id, email, username, role } = this;
    const userJson: UserJson = { id, email, username, role };

    if (this.posts) {
      userJson.posts = this.posts;
    }

    if (this.comments) {
      userJson.comments = this.comments;
    }

    return userJson;
  }
}
