import { IConfig } from './interface';

import dotenv from 'dotenv';

let config: IConfig;

const getConfig = (): IConfig => {
  if (config) {
    return config;
  }

  dotenv.config();

  return loadConfig();
};

const loadConfig = (): IConfig => {
  return {
    app: {
      port: process.env.PORT,
      logLevel: process.env.LOG_LEVEL,
    },
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      userName: process.env.DB_USER_NAME,
      userPassword: process.env.DB_USER_PASSWORD,
    },
  } as IConfig;
};

export { config, getConfig };
