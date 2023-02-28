import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface TypeormConfig {
  nodeEnv: string;
  typeormHost: string;
  typeormUser: string;
  typeormPass: string;
  typeormDb: string;
  typeormPort: number;
}

export const getTypeormConfig = (
  entities: any[], // EntitySchema는 타입에러남
  config: TypeormConfig,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.typeormHost,
    username: config.typeormUser,
    password: config.typeormPass,
    database: config.typeormDb,
    port: config.typeormPort,
    synchronize: config.nodeEnv === 'dev' ? true : false,
    logging: config.nodeEnv === 'dev' ? true : false,
    entities,
    migrations: [],
    subscribers: [],
  };
};
