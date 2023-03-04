import { LogContext, winstonLogger } from '@common/modules';
import { config } from 'dotenv';
import * as path from 'path';

const { error } = config({
  path: path.resolve(
    process.cwd(), // __dirname을 사용하면 실행하는 파일의 절대경로인 /dist/apps...를 나타낸다
    `./apps/server/.env.${process.env.SERVER_STAGE || 'dev'}`,
  ),
});

if (error) {
  // 배포 방법에 따라 환경 변수를 설정할 수 있어, throw 처리 안함 -> ex: pm2로 실행하면 env 설정 가능함
  winstonLogger.error({
    message: `Not found .env file for ${process.env.SERVER_STAGE}`,
    category: LogContext.Initializer,
  });
}

class ServerConfig {
  nodeEnv = process.env.NODE_ENV || 'dev';
  port = Number(process.env.PORT) || 3000;

  serverName = process.env.SERVER_NAME || 'typeorm-template';
  serverVersion = process.env.SERVER_VERSION || '1.0.0';
  serverDesc =
    process.env.SERVER_DESC || 'This server is a template using typeorm.';

  typeormDb = process.env.TYPEORM_DB || 'typeorm-template';
  typeormPort = Number(process.env.TYPEORM_PORT) || 5432;
  typeormHost = process.env.TYPEORM_HOST || '127.0.0.1';
  typeormUser = process.env.TYPEORM_USER || 'admin';
  typeormPass = process.env.TYPEORM_PASS || 'password';

  jwtSecret = process.env.JWT_SECRET || 'keyboardCat';
}

export const serverConfig = new ServerConfig();
