import { GetRequest } from '../client/client';
import { ARTICLES_URL } from './constants';

const getArticlesData = async () => {
  return await GetRequest(ARTICLES_URL);
};

export default getArticlesData;
