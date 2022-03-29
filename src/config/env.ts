import dotenv from "dotenv";
import { IEnv, IConfig } from "../interfaces/IEnv";

dotenv.config({
  path: process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test" ?
    ".env.dev" :
    ".env",
});

const getVariables = (): IEnv => {
  return {
    TYPEORM_HOST: process.env.TYPEORM_HOST,
    TYPEORM_HOST_TEST: process.env.TYPEORM_HOST_TEST,
    TYPEORM_PORT: Number(process.env.TYPEORM_PORT),
    TYPEORM_PORT_TEST: Number(process.env.TYPEORM_PORT_TEST),
    TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
    TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
    TYPE_ORM_DATABASE: process.env.TYPE_ORM_DATABASE,
    TYPE_ORM_DATABASE_TEST: process.env.TYPE_ORM_DATABASE_TEST,
    TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
    TYPEORM_MODELS: process.env.TYPEORM_MODELS
  };
};

const getSanitizedConfig = (config: IEnv): IConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  return config as IConfig;
};

const config = getVariables();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
