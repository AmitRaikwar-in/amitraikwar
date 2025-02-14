import { PostRequest } from '../client/client';
import { ADD_COMMENT_URL } from './constants';

const addComment = async (data: unknown) => PostRequest(ADD_COMMENT_URL, data);

export default addComment;
