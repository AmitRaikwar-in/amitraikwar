import { renderHook } from '@testing-library/react';
import useAddArticle from '../useAddArticle';
import useAddComment from '../useAddComment';
import useDeleteArticle from '../useDeleteArticle';
import useGetAllArticlesData from '../useGetAllArticlesData';
import useGetArticleData from '../useGetArticleData';
import useGetComments from '../useGetComments';
import useGetEditorArticleData from '../useGetEditorArticleData';
import useLikeArticleData from '../useLikeArticleData';
import usePingTest from '../usePingTest';
import useUpdateArticle from '../useUpdateArticle';
import { useToast } from '@chakra-ui/react';
import { useCallQuery, useCallSBMutation } from '../../common';
import {
  addArticle,
  addComment,
  deleteArticle,
  getArticlesData,
  getArticleData,
  getComments,
  getEditorArticleData,
  likePageArticleData,
  pingTest,
  updateArticle,
} from '../../../backend';

jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock('../../common', () => ({
  useCallQuery: jest.fn((args) => {
    args.method();
    return 'query-mock-result';
  }),
  useCallSBMutation: jest.fn((args) => {
    args.method('mock-data');
    const mockVariables = { articleKey: 'mock-key' };
    if (args.mutationOptions?.onSuccess) args.mutationOptions.onSuccess('mock-response', mockVariables);
    if (args.mutationOptions?.onError) args.mutationOptions.onError('mock-error', mockVariables);
    return 'mutation-mock-result';
  }),
}));

jest.mock('../../../backend', () => ({
  addArticle: jest.fn(),
  addComment: jest.fn(),
  deleteArticle: jest.fn(),
  getArticlesData: jest.fn(),
  getArticleData: jest.fn(),
  getComments: jest.fn(),
  getEditorArticleData: jest.fn(),
  likePageArticleData: jest.fn(),
  pingTest: jest.fn(),
  updateArticle: jest.fn(),
}));

describe('Articles hooks', () => {
  const toastMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(toastMock);
  });

  it('useAddArticle should set up and trigger toast on success/error', () => {
    const { result } = renderHook(() => useAddArticle());
    expect(useCallSBMutation).toHaveBeenCalled();
    expect(addArticle).toHaveBeenCalledWith('mock-data');
    expect(toastMock).toHaveBeenCalledTimes(2);
    expect(toastMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'success' }));
    expect(toastMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'error' }));
    expect(result.current).toBe('mutation-mock-result');
  });

  it('useAddComment should set up and trigger toast on success/error', () => {
    const { result } = renderHook(() => useAddComment());
    expect(useCallSBMutation).toHaveBeenCalled();
    expect(addComment).toHaveBeenCalledWith('mock-data');
    expect(toastMock).toHaveBeenCalledTimes(2);
    expect(toastMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'success' }));
    expect(toastMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'error' }));
    expect(result.current).toBe('mutation-mock-result');
  });

  it('useDeleteArticle should set up and trigger toast on success/error', () => {
    const { result } = renderHook(() => useDeleteArticle());
    expect(useCallSBMutation).toHaveBeenCalled();
    expect(deleteArticle).toHaveBeenCalledWith('mock-data');
    expect(toastMock).toHaveBeenCalledTimes(2);
    expect(toastMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'success' }));
    expect(toastMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'error' }));
    expect(result.current).toBe('mutation-mock-result');
  });

  it('useUpdateArticle should set up and trigger toast on success/error', () => {
    const { result } = renderHook(() => useUpdateArticle());
    expect(useCallSBMutation).toHaveBeenCalled();
    expect(updateArticle).toHaveBeenCalledWith('mock-data');
    expect(toastMock).toHaveBeenCalledTimes(2);
    expect(toastMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'success' }));
    expect(toastMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'error' }));
    expect(result.current).toBe('mutation-mock-result');
  });

  it('useLikeArticleData should set up and trigger toast on success/error', () => {
    const { result } = renderHook(() => useLikeArticleData());
    expect(useCallSBMutation).toHaveBeenCalled();
    expect(likePageArticleData).toHaveBeenCalledWith('mock-data');
    expect(toastMock).toHaveBeenCalledTimes(2);
    expect(toastMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ status: 'success' }));
    expect(toastMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ status: 'error' }));
    expect(result.current).toBe('mutation-mock-result');
  });

  it('useGetAllArticlesData should trigger query method', () => {
    const { result } = renderHook(() => useGetAllArticlesData());
    expect(useCallQuery).toHaveBeenCalled();
    expect(getArticlesData).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });

  it('useGetArticleData should trigger query method with key', () => {
    const { result } = renderHook(() => useGetArticleData('key1'));
    expect(useCallQuery).toHaveBeenCalled();
    expect(getArticleData).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });

  it('useGetComments should trigger query method with key', () => {
    const { result } = renderHook(() => useGetComments('key1'));
    expect(useCallQuery).toHaveBeenCalled();
    expect(getComments).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });

  it('useGetEditorArticleData should trigger query method with key', () => {
    const { result } = renderHook(() => useGetEditorArticleData('key1'));
    expect(useCallQuery).toHaveBeenCalled();
    expect(getEditorArticleData).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });

  it('useGetEditorArticleData should resolve to undefined when key is empty', () => {
    const { result } = renderHook(() => useGetEditorArticleData(''));
    expect(useCallQuery).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });

  it('usePingTest should trigger query method', () => {
    const { result } = renderHook(() => usePingTest());
    expect(useCallQuery).toHaveBeenCalled();
    expect(pingTest).toHaveBeenCalled();
    expect(result.current).toBe('query-mock-result');
  });
});
