import { LoggingMiddleware } from '@common/core';
import { initializeDatabase } from '@common/modules/mongoose/initialize';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
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
  @InjectConnection() private connection: Connection;

  async onModuleInit() {
    await initializeDatabase(this.connection);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
