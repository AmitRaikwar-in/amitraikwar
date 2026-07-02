const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: mockGet,
    post: mockPost,
  })),
}));

// Require after mocks are initialized to prevent ES6 hoisting issues
const { GetRequest, PostRequest } = require('../client');

describe('backend client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GetRequest', () => {
    it('should return data on successful request', async () => {
      mockGet.mockResolvedValueOnce({ data: 'success-get' });
      const result = await GetRequest('/test-url');
      expect(mockGet).toHaveBeenCalledWith('/test-url');
      expect(result).toBe('success-get');
    });

    it('should log error and return undefined on failure', async () => {
      const error = new Error('get-failed');
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(jest.fn());
      mockGet.mockRejectedValueOnce(error);

      const result = await GetRequest('/test-url');
      expect(consoleSpy).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();

      consoleSpy.mockRestore();
    });
  });

  describe('PostRequest', () => {
    it('should return data on successful post', async () => {
      mockPost.mockResolvedValueOnce({ data: 'success-post' });
      const result = await PostRequest('/test-post-url', { payload: 'data' });
      expect(mockPost).toHaveBeenCalledWith(
        '/test-post-url',
        { payload: 'data' },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      expect(result).toBe('success-post');
    });
  });
});
