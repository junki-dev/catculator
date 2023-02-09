import { IGetFeedListResp } from './interface';

import axios from 'axios';

export const getFeedList = async (): Promise<IGetFeedListResp[]> => {
  return await axios.get(`${process.env.REACT_APP_API}/feed`).then(({ data }) => data.data.feedList);
};
