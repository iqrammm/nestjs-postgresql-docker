import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { Freelancer } from './freelancers/entity/freelancer.entitiy';

const dbConfig = config.get('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  entities: [Freelancer],
  migrationsRun: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  cli: {
    migrationsDir: 'src/migration',
  },
};

switch (process.env.NODE_ENV) {
  case 'testing':
    Object.assign(typeOrmConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
    });
    break;
  default:
    Object.assign(typeOrmConfig, {
      type: process.env.DB_TYPE || dbConfig.type,
      host: process.env.POSTGRES_HOST || dbConfig.host,
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.DB_USERNAME || dbConfig.username,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: process.env.POSTGRES_DB || dbConfig.database,
    });
}
export = typeOrmConfig;
