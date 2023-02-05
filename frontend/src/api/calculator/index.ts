import { IGetFeedAmountReq, IGetFeedAmountResp } from './interface';

import axios from 'axios';

export const getFeedAmount = async (req: IGetFeedAmountReq): Promise<IGetFeedAmountResp> => {
  return axios.get(`${process.env.REACT_APP_API}/calc`, { params: req }).then(({ data }) => data.data.info);
};
