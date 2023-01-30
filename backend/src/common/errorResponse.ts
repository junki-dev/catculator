// import { IResponse, ResultCode } from './resultCode';

import { IResponse } from './resultCode';

import { ResultCode } from '@common/index';
import { Response } from 'express';

const errorResponse = (res: Response, errorCode: IResponse) => {
  res.status(errorCode.status || 500).json({
    error: {
      code: errorCode.code || ResultCode.UNKNOWN.code,
      message: errorCode.message || ResultCode.UNKNOWN.message,
    },
  });
};

export default errorResponse;
