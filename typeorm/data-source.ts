import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'devc++wingpc',
  database: 'hcode',
  synchronize: true,
  logging: true,
  migrations: ['typeorm/migrations/*.ts'],
});
