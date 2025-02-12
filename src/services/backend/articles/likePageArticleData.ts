import { GetRequest } from '../client/client';
import { LIKE_ARTICLE_URL } from './constants';

const getArticlesData = async () => {
  return await GetRequest(LIKE_ARTICLE_URL);
};

export default getArticlesData;
