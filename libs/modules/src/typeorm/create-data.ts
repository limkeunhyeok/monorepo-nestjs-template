import { DataSource } from 'typeorm';
import { CommentEntity, PostEntity, Role, UserEntity } from './entities';

export const createData = async (instance: DataSource, nodeEnv: string) => {
  if (nodeEnv === 'dev') {
    await instance.dropDatabase();
    await instance.destroy();
    await instance.initialize();

    await instance.manager.transaction(async (manager) => {
      const users = await manager.create(UserEntity, [
        {
          email: 'admin@example.com',
          password: 'password',
          username: 'admin',
          role: Role.ADMIN,
        },
        {
          email: 'member@example.com',
          password: 'password',
          username: 'member',
          role: Role.MEMBER,
        },
      ]);
      await manager.save(users);
      // const users = await manager.save(UserEntity, [
      //   {
      //     email: 'admin@example.com',
      //     password: 'password',
      //     username: 'admin',
      //     role: Role.ADMIN,
      //   },
      //   {
      //     email: 'member@example.com',
      //     password: 'password',
      //     username: 'member',
      //     role: Role.MEMBER,
      //   },
      // ]);

      const [admin, member] = users;

      const posts = await manager.save(PostEntity, [
        {
          title: 'admin post tilte',
          contents: 'admin post contents',
          authorId: admin.id,
        },
        {
          title: 'member post tilte',
          contents: 'member post contents',
          authorId: member.id,
        },
      ]);

      const [adminPost, memberPost] = posts;

      await manager.save(CommentEntity, [
        {
          contents: 'admin comment contents',
          authorId: admin.id,
          postId: adminPost.id,
        },
        {
          contents: 'member comment contents',
          authorId: member.id,
          postId: memberPost.id,
        },
      ]);
    });
  }
};
