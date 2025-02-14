import { GetRequest } from '../client/client';
import { GET_COMMENTS_URL } from './constants';
import { StandardResponse } from './types';

const getComments = async (articleKey: string): Promise<StandardResponse> => {
  return await GetRequest(GET_COMMENTS_URL + '?articleKey=' + articleKey);
};

export default getComments;
