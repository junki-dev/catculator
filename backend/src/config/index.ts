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
  } as IConfig;
};

export { config, getConfig };
