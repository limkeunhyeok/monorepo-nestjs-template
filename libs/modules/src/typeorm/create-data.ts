import { DataSource } from 'typeorm';
import { CommentEntity, PostEntity, Role, UserEntity } from './entities';

export const createData = async (instance: DataSource, nodeEnv: string) => {
  if (nodeEnv === 'dev') {
    await instance.dropDatabase();
    await instance.destroy();
    await instance.initialize();

    await instance.manager.transaction(async (manager) => {
      const userRepository = manager.getRepository(UserEntity);
      const postRepository = manager.getRepository(PostEntity);
      const commentRepository = manager.getRepository(CommentEntity);

      const users = await userRepository.create([
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
      await userRepository.save(users);

      const [admin, member] = users;

      const posts = await postRepository.save([
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

      await commentRepository.save([
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
