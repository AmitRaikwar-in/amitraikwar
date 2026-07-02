import { renderHook } from '@testing-library/react';
import useMoveToTop from '../useMoveToTop';

describe('useMoveToTop', () => {
  it('should call window.scrollTo with top 0 and smooth behavior', () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    const { result } = renderHook(() => useMoveToTop());
    result.current();

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
