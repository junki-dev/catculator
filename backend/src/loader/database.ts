import { getConfig } from '@config/index';
import { IConfig } from '@config/interface';
import { Logger } from '@src/common';
import { DataSource } from 'typeorm';

const {
  db: { host, port, name, userName, userPassword },
}: IConfig = getConfig();

const logger = Logger.getLogger({ moduleName: 'database' });

export class Database {
  static #datasource: DataSource;

  static generate() {
    this.#datasource = new DataSource({
      type: 'mysql',
      host,
      port: Number(port),
      database: name,
      username: userName,
      password: userPassword,
      entities: ['src/**/model/*.ts'],
    });
  }

  static init() {
    if (!this.#datasource) this.generate();

    this.#datasource
      .initialize()
      .then(() => {
        logger.info('Data Source has been initialized.');
      })
      .catch((err) => {
        throw `failed to data source initalized. error=${err}`;
      });
  }

  static getDatasource() {
    if (!this.#datasource) this.generate();

    return this.#datasource;
  }

  static destroy() {
    this.#datasource
      .destroy()
      .then(() => {
        logger.index('Data Source has been destroyed.');
      })
      .catch((err) => {
        throw `failed to data source initialized. error=${err}`;
      });
  }
}

export default Database;
