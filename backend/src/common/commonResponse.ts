import { IResponse } from './resultCode';

import { Response } from 'express';

const commonResponse = (res: Response, resultCode: IResponse, data?: any) => {
  res.status(200).json({
    data,
  });
};

export default commonResponse;
