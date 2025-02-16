import { GetRequest } from '../client/client';
import { DELETE_ARTICLE_URL } from './constants';
import { StandardResponse } from './types';

const deleteArticle = async (data: any): Promise<StandardResponse> => {
  return await GetRequest(
    DELETE_ARTICLE_URL + '?articleKey=' + data.articleKey,
  );
};

export default deleteArticle;
