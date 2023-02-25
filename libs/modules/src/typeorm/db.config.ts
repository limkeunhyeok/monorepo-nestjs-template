import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';

export interface TypeormConfig {
  nodeEnv: string;
  typeormHost: string;
  typeormUser: string;
  typeormPass: string;
  typeormDb: string;
  typeormPort: number;
}

export const getTypeormConfig = (
  entities: EntitySchema[],
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
