import { DataSource } from 'typeorm';
import config from './ormconfig';

export default function connect() {
  const ds = new DataSource(config);
  return ds.initialize();
}
