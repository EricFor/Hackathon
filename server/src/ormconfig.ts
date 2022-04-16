import dotenv from 'dotenv';
import path from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import User from './entities/User';

dotenv.config();
const config = {
  type: 'sqlite',
  database: `./database/data.sqlite`,
  entities: [User],
  synchronize: true,
  logging: false,
  // cli: {
  //   entitiesDir: path.join(__dirname, `/entities/`),
  // },
} as SqliteConnectionOptions;

export default config;
