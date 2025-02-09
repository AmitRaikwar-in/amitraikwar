import { PostRequest } from '../client/client';
import { ADD_ARTICLE_URL } from './constants';

const addArticle = async (data: unknown) => PostRequest(ADD_ARTICLE_URL, data);

export default addArticle;
