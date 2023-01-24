import { getConfig } from '@config/index';
import { IConfig } from '@config/interface';
import { format, createLogger, transports } from 'winston';

const {
  app: { logLevel },
}: IConfig = getConfig();

export interface ILogger {
  moduleName?: string;
  functionName?: string;
}

export class Logger {
  static getLogger(flag: ILogger): any {
    const { combine, timestamp, printf } = format;

    // Define log format
    const logFormat = printf(({ level, message, timestamp }) => {
      let format = `${timestamp} [${level.toUpperCase()}] `;

      // 모듈 이름
      if (flag.moduleName) {
        format += flag.moduleName;
      }

      // 함수 이름
      if (flag.functionName) {
        format += `_${flag.functionName}`;
      }

      return `${format} - ${message}`;
    });

    /*
     * Log Level
     * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
     */
    const logger = createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      transports: [
        new transports.Console({
          level: logLevel,
        }),
      ],
    });

    return logger;
  }
}

export default Logger;
