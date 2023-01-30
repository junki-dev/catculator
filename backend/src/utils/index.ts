import { ResultCode, Logger } from '@common/index';
import { ILogger } from '@common/logger';
import { Big } from 'big.js';

const CommonLogger: ILogger = {
  moduleName: 'utils',
};

export const getRer = async (weight: number): Promise<number> => {
  const logger = Logger.getLogger(Object.assign(CommonLogger, { functionName: 'getRer' }));

  try {
    if (weight > 2) {
      return Big(Math.pow(weight, 0.75)).mul(70).round().toNumber();
    } else {
      return Big(30).mul(weight).plus(70).toNumber();
    }
  } catch (err) {
    logger.error(`failed to calculate RER. error=${err}`);
    throw ResultCode.CALC_RER_ERROR;
  }
};
