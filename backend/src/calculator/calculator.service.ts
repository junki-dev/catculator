import { GetFeedAmountReqDto } from './dto/request/get-feed-amount.dto';
import { GetFeedAmountResDto } from './dto/response/get-feed-amount.dto';

import { ResultCode, Logger } from '@common/index';
import { ILogger } from '@common/logger';
import FeedRepository from '@feed/repository/feed.repository';
import { getRer } from '@utils/index';
import { Big } from 'big.js';

const CommonLogger: ILogger = {
  moduleName: 'calculator.service',
};

const feedRepository = new FeedRepository();

export const getFeedAmount = async (reqDto: GetFeedAmountReqDto): Promise<GetFeedAmountResDto> => {
  const logger = Logger.getLogger(Object.assign(CommonLogger, { functionName: 'getFeedAmount' }));

  let kcal = 0;
  if (reqDto.feedId) {
    kcal = await feedRepository
      .findOneKcal(reqDto.feedId)
      .then((feed) => {
        if (!feed) {
          logger.error(`cannot found feed. feed_id=${reqDto.feedId}`);
          throw ResultCode.NOT_FOUND;
        }

        return feed.kcal;
      })
      .catch((err) => {
        if (err.code === ResultCode.NOT_FOUND.code) {
          throw err;
        } else {
          logger.error(`findOneKcal query failed. error=${JSON.stringify(err)}`);
          throw ResultCode.DB_ERROR;
        }
      });
  } else {
    kcal = reqDto.kcal;
  }

  const rer = await getRer(reqDto.weight);
  const der = Big(rer).mul(reqDto.energyRequirements).toNumber();
  const amount = Big(der).div(kcal).mul(1000).round().toNumber();

  return { rer, der, amount } as GetFeedAmountResDto;
};
