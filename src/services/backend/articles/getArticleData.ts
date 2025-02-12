import { GetRequest } from '../client/client';
import { ARTICLES_URL } from './constants';
import { StandardResponse } from './types';

const getArticleData = async (
  articleKey: string,
): Promise<StandardResponse> => {
  return await GetRequest(ARTICLES_URL + '?articleKey=' + articleKey);
};

export default getArticleData;
