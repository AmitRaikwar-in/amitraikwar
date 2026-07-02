import { GetRequest, PostRequest } from '../../client/client';
import addArticle from '../addArticle';
import addComment from '../addComment';
import deleteArticle from '../deleteArticle';
import getAllArticlesData from '../getAllArticlesData';
import getArticleData from '../getArticleData';
import getComments from '../getComments';
import getEditorArticleData from '../getEditorArticleData';
import likePageArticleData from '../likePageArticleData';
import pingTest from '../pingTest';
import updateArticle from '../updateArticle';
import {
  ADD_ARTICLE_URL,
  ADD_COMMENT_URL,
  DELETE_ARTICLE_URL,
  ALL_ARTICLES_URL,
  ARTICLES_URL,
  GET_COMMENTS_URL,
  EDITOR_ARTICLES_URL,
  LIKE_ARTICLE_URL,
  PING_URL,
  UPDATE_ARTICLE_URL,
} from '../constants';

jest.mock('../../client/client', () => ({
  GetRequest: jest.fn(),
  PostRequest: jest.fn(),
}));

describe('Articles Backend Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('addArticle should make PostRequest', async () => {
    (PostRequest as jest.Mock).mockResolvedValueOnce('add-article-success');
    const result = await addArticle({ title: 'Test' });
    expect(PostRequest).toHaveBeenCalledWith(ADD_ARTICLE_URL, { title: 'Test' });
    expect(result).toBe('add-article-success');
  });

  it('addComment should make PostRequest', async () => {
    (PostRequest as jest.Mock).mockResolvedValueOnce('add-comment-success');
    const result = await addComment({ text: 'Test comment' });
    expect(PostRequest).toHaveBeenCalledWith(ADD_COMMENT_URL, { text: 'Test comment' });
    expect(result).toBe('add-comment-success');
  });

  it('deleteArticle should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('delete-article-success');
    const result = await deleteArticle({ articleKey: 'key1' });
    expect(GetRequest).toHaveBeenCalledWith(DELETE_ARTICLE_URL + '?articleKey=key1');
    expect(result).toBe('delete-article-success');
  });

  it('getAllArticlesData should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('get-all-success');
    const result = await getAllArticlesData();
    expect(GetRequest).toHaveBeenCalledWith(ALL_ARTICLES_URL);
    expect(result).toBe('get-all-success');
  });

  it('getArticleData should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('get-article-success');
    const result = await getArticleData('key1');
    expect(GetRequest).toHaveBeenCalledWith(ARTICLES_URL + '?articleKey=key1');
    expect(result).toBe('get-article-success');
  });

  it('getComments should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('get-comments-success');
    const result = await getComments('key1');
    expect(GetRequest).toHaveBeenCalledWith(GET_COMMENTS_URL + '?articleKey=key1');
    expect(result).toBe('get-comments-success');
  });

  it('getEditorArticleData should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('get-editor-success');
    const result = await getEditorArticleData('key1');
    expect(GetRequest).toHaveBeenCalledWith(EDITOR_ARTICLES_URL + '?articleKey=key1');
    expect(result).toBe('get-editor-success');
  });

  it('likePageArticleData should make PostRequest', async () => {
    (PostRequest as jest.Mock).mockResolvedValueOnce('like-success');
    const result = await likePageArticleData('key1');
    expect(PostRequest).toHaveBeenCalledWith(LIKE_ARTICLE_URL, 'key1');
    expect(result).toBe('like-success');
  });

  it('pingTest should make GetRequest', async () => {
    (GetRequest as jest.Mock).mockResolvedValueOnce('ping-success');
    const result = await pingTest();
    expect(GetRequest).toHaveBeenCalledWith(PING_URL);
    expect(result).toBe('ping-success');
  });

  it('updateArticle should make PostRequest', async () => {
    (PostRequest as jest.Mock).mockResolvedValueOnce('update-success');
    const result = await updateArticle({ title: 'New title' });
    expect(PostRequest).toHaveBeenCalledWith(UPDATE_ARTICLE_URL, { title: 'New title' });
    expect(result).toBe('update-success');
  });
});
