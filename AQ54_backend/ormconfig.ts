
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres', 
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'], 
  synchronize: true, 
});

export default AppDataSource.initialize();
