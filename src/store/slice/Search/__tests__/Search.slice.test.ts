import { appStore } from '@store';
import { act, renderHook } from '@testing-library/react';

describe('Search slice', () => {
  it('should return search selector state and actions', () => {
    const appStoreState = renderHook(() => appStore()).result.current;

    expect(appStoreState.Search).toMatchSnapshot();
  });

  it('should return search state with initial value', () => {
    const { result } = renderHook(() => appStore());

    expect(result.current.Search).toMatchSnapshot();
  });

  it('should return search state on search data set setSearchText', () => {
    const { result } = renderHook(() => appStore());

    act(() => {
      result.current.Search.setSearchText('search text');
      jest.runAllTimers();
    });

    expect(result.current.Search).toMatchSnapshot();
  });

  it('should reset search state on search data using ', () => {
    const { result } = renderHook(() => appStore());

    act(() => {
      result.current.Search.resetSearchText();
      jest.runAllTimers();
    });

    expect(result.current.Search.searchText).toEqual('');
  });
});
