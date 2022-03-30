import "reflect-metadata"
import { DataSource } from "typeorm"
import env from "../config/env";

export const AppDataSource = new DataSource({
  "type": "postgres",
  "host": process.env.NODE_ENV != 'test' ? env.TYPEORM_HOST : env.TYPEORM_HOST_TEST,
  "port": process.env.NODE_ENV != 'test' ? Number(env.TYPEORM_PORT) : Number(env.TYPEORM_PORT_TEST),
  "username": env.TYPEORM_USERNAME,
  "password": env.TYPEORM_PASSWORD,
  "database": process.env.NODE_ENV != 'test' ? env.TYPE_ORM_DATABASE : env.TYPE_ORM_DATABASE_TEST,
  "entities": [__dirname+env.TYPEORM_MODELS!],
  "migrations": [__dirname+env.TYPEORM_MIGRATIONS!],
  "synchronize": false,
  "logging": false,
});
