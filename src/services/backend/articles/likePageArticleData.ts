import { PostRequest } from '../client/client';
import { LIKE_ARTICLE_URL } from './constants';

const getArticlesData = async () => PostRequest(LIKE_ARTICLE_URL, {});

export default getArticlesData;
