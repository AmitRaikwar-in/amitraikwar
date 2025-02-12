import { GetRequest } from '../client/client';
import { ALL_ARTICLES_URL } from './constants';
import { StandardResponse } from './types';

const getArticlesData = async (): Promise<StandardResponse> => {
  return await GetRequest(ALL_ARTICLES_URL);
};

export default getArticlesData;
