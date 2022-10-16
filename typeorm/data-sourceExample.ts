import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sql',
  host: 'yourHost',
  port: 0000,
  username: 'youruserName',
  password: 'yourpasword',
  database: 'hcode',
  synchronize: true,
  logging: true,
  migrations: ['typeorm/migrations/*.ts'],
})