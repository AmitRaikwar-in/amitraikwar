import { PostRequest } from '../client/client';
import { LIKE_ARTICLE_URL } from './constants';

const getArticlesData = async (articleKey: unknown) =>
  PostRequest(LIKE_ARTICLE_URL, articleKey);

export default getArticlesData;
