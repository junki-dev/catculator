import { getFeedList } from '../../api/feed';

import { useQuery } from 'react-query';


export function useFeedList() {
  return useQuery('feeds', getFeedList);
}
