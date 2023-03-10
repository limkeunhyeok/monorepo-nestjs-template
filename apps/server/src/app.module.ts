import { LoggingMiddleware } from '@common/core';
import {
  CommentEntity,
  createData,
  getTypeormConfig,
  PostEntity,
  UserEntity,
} from '@common/modules/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { serverConfig } from './config';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      getTypeormConfig([UserEntity, PostEntity, CommentEntity], serverConfig),
    ),
    UserModule,
    AuthModule,
    PostModule,
  ],
})
export class AppModule implements NestModule {
  constructor(datasource: DataSource) {
    createData(datasource, serverConfig.nodeEnv);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthMiddleware)
      .exclude({ path: '/auth/login', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
