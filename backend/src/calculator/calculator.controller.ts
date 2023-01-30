import * as catculatorService from './calculator.service';
import { GetFeedAmountReqDto } from './dto/request/get-feed-amount.dto';
import { GetFeedAmountResDto } from './dto/response/get-feed-amount.dto';

import commonResponse from '@common/commonResponse';
import errorResponse from '@common/errorResponse';
import { ResultCode } from '@common/index';
import { IResponse } from '@common/resultCode';
import { Validator } from '@src/middleware';
import { Request, Response } from 'express';

export const getFeedAmount = async (req: Request, res: Response) => {
  try {
    const dto = await Validator.factory(GetFeedAmountReqDto, req.query as Partial<GetFeedAmountReqDto>);

    const resDto: GetFeedAmountResDto = await catculatorService.getFeedAmount(dto);

    commonResponse(res, ResultCode.SUCCESS, resDto);
  } catch (err) {
    errorResponse(res, err as IResponse);
  }
};
