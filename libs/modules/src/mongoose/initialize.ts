import * as bcrypt from 'bcrypt';
import { Connection } from 'mongoose';
import { Role, UserSchema } from './schema';

export const initializeDatabase = async (connection: Connection) => {
  if (process.env.NODE_ENV !== 'prod') {
    await connection.dropDatabase();
  }

  connection.set('debug', true);

  const UserModel = connection.model('users', UserSchema);

  const hashPassword = bcrypt.hashSync('password', 10);

  await UserModel.create({
    email: 'admin@example.com',
    password: hashPassword,
    username: 'admin',
    role: Role.ADMIN,
  });
};
