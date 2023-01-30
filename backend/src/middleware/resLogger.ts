import { Logger } from '@common/index';
import { NextFunction, Request, Response } from 'express';

const logger = Logger.getLogger({ moduleName: 'app' });

// Request,Response logging
const responseLogger = (req: Request, res: Response, next: NextFunction) => {
  let reqBody: any;

  // health check path 로깅 제외
  if (req.url === '/') {
    return next();
  }

  if (req.method === 'GET') {
    reqBody = req.query || req.params;
  } else {
    reqBody = req.body;
  }

  res.on('close', () => {
    logger.debug(
      `[${req.method}]${req.url} statusCode=${res.statusCode} ${
        !!reqBody && Object.keys(reqBody).length !== 0 ? 'body=' + JSON.stringify(reqBody) : ''
      }`,
    );
  });

  next();
};

export default responseLogger;
