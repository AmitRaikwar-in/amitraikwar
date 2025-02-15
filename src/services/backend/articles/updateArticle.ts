import { PostRequest } from '../client/client';
import { UPDATE_ARTICLE_URL } from './constants';

const updateArticle = async (data: unknown) =>
  PostRequest(UPDATE_ARTICLE_URL, data);

export default updateArticle;
