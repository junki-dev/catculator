import FeedRepository from './repository/feed.repository';

const repo = new FeedRepository();

export const getFeedList = async () => {
  return repo.findAll();
};
