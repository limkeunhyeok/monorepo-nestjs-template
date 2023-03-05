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
  GUEST: 'guest',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface UserJson {
  id: number;
  email: string;
  username: string;
  role: Role;
  loginFailCount?: number;
  latestTryLoginDate?: Date | string;
  isLock?: boolean;
  posts?: PostEntity[];
  comments?: CommentEntity[];
}

export interface User extends UserJson {
  password: string;
}

export type UserInfo = Omit<User, 'id'>;

@Entity('user')
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

  @Column({ type: 'int', default: 0 })
  loginFailCount: number;

  @Column({ type: 'timestamptz', default: new Date() })
  latestTryLoginDate: Date;

  @Column({ type: 'bool', default: false })
  isLock: boolean;

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

  toJson(): UserJson {
    const userJson: User = {
      ...this,
    };

    delete userJson.password;

    return userJson;
  }
}
