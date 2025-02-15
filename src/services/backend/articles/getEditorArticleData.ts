import { GetRequest } from '../client/client';
import { EDITOR_ARTICLES_URL } from './constants';
import { StandardResponse } from './types';

const getEditorArticleData = async (
  articleKey: string,
): Promise<StandardResponse> => {
  return await GetRequest(EDITOR_ARTICLES_URL + '?articleKey=' + articleKey);
};

export default getEditorArticleData;
