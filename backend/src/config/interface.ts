export interface IConfig {
  app: IApp;
  db: IMysql;
}

export interface IApp {
  port: string;
  logLevel: string;
}

export interface IMysql {
  host: string;
  port: string;
  name: string;
  userName: string;
  userPassword: string;
}
