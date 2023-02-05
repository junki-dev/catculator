import { getFeedAmount } from '../../api/calculator';
import { IGetFeedAmountReq } from '../../api/calculator/interface';

import { useQuery } from 'react-query';

export function useFeedAmount(
  weight: number,
  birthday: Date,
  energyRequirements: number,
  kcal?: number,
  feedId?: number,
) {
  return useQuery('feedAmount', () =>
    getFeedAmount({ weight, birthday, energyRequirements, kcal, feedId } as IGetFeedAmountReq),
  );
}
