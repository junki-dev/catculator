import * as feedService from './feed.service';

import errorResponse from '@common/errorResponse';
import { IResponse } from '@common/resultCode';
import { CommonResponse, ResultCode } from '@src/common';
import { Request, Response } from 'express';

export const getFeedList = async (_: Request, res: Response) => {
  try {
    const feedList = await feedService.getFeedList();

    CommonResponse(res, ResultCode.SUCCESS, { feedList });
  } catch (err) {
    errorResponse(res, err as IResponse);
  }
};
