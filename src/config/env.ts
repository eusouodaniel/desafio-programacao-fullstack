import dotenv from "dotenv";
import { IEnv, IConfig } from "../interfaces/IEnv";

dotenv.config({
  path: process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test" ?
    ".env.dev" :
    ".env",
});

const getVariables = (): IEnv => {
  return {

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
