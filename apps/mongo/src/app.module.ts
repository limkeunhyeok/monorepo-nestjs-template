import { LoggingMiddleware } from '@common/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { serverConfig } from './config';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${serverConfig.mongoHost}:${serverConfig.mongoPort}/${serverConfig.mongoDb}`,
      {
        authSource: 'admin',
        user: serverConfig.mongoUser,
        pass: serverConfig.mongoPass,
      },
    ),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
