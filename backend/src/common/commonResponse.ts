import { IResponse } from './resultCode';

import { Response } from 'express';

const commonResponse = (res: Response, resultCode: IResponse, data?: any) => {
  res.status(resultCode.status).json({
    data,
  });
};

export default commonResponse;
