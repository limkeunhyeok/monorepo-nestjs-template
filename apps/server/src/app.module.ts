import {
  CommentEntity,
  getTypeormConfig,
  PostEntity,
  UserEntity,
} from '@common/modules/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { serverConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      getTypeormConfig([UserEntity, PostEntity, CommentEntity], serverConfig),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
