import * as bcrypt from 'bcrypt';
import { Connection } from 'mongoose';
import { PostSchema, Role, UserSchema } from './schema';
import { CommentSchema } from './schema/comment.schema';

export const initializeDatabase = async (connection: Connection) => {
  if (process.env.NODE_ENV !== 'prod') {
    await connection.dropDatabase();
  }

  connection.set('debug', true);

  const UserModel = connection.model('users', UserSchema);
  const PostModel = connection.model('posts', PostSchema);
  const CommentModel = connection.model('comments', CommentSchema);

  const hashPassword = bcrypt.hashSync('password', 10);

  const admin = await UserModel.create({
    email: 'admin@example.com',
    password: hashPassword,
    username: 'admin',
    role: Role.ADMIN,
  });

  const post = await PostModel.create({
    title: 'example post title',
    contents: 'example post contents',
    authorId: admin.id,
  });

  const comment = await CommentModel.create({
    contents: 'example contents',
    authorId: admin.id,
    postId: post.id,
  });

  await PostModel.findByIdAndUpdate(
    post.id,
    { comments: [comment] },
    { new: true },
  );
};
