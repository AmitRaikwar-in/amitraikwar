import { useQuery, useMutation } from '@tanstack/react-query';
import useCallQuery from '../useCallQuery';
import useCallSBMutation from '../useCallSBMutation';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn((options) => {
    options.queryFn('test-request');
    return 'query-result';
  }),
  useMutation: jest.fn((options) => {
    options.mutationFn('test-request');
    return 'mutation-result';
  }),
}));

describe('Common React Query Hooks', () => {
  const methodMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCallQuery', () => {
    it('should invoke useQuery with correct args and trigger queryFn', () => {
      const result = useCallQuery({
        method: methodMock,
        queryOptions: { queryKey: ['test-key'] },
      });

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ['test-key'],
          queryFn: expect.any(Function),
        }),
      );
      expect(methodMock).toHaveBeenCalledWith('test-request');
      expect(result).toBe('query-result');
    });
  });

  describe('useCallSBMutation', () => {
    it('should invoke useMutation with correct args and trigger mutationFn', () => {
      const result = useCallSBMutation({
        method: methodMock,
        mutationOptions: { mutationKey: ['test-mut'] },
      });

      expect(useMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          mutationKey: ['test-mut'],
          mutationFn: expect.any(Function),
        }),
      );
      expect(methodMock).toHaveBeenCalledWith('test-request');
      expect(result).toBe('mutation-result');
    });
  });
});
