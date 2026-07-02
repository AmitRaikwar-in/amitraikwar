import { appStore } from '@store';
import { act, renderHook } from '@testing-library/react';
import {
  selectSearchText,
  setSearchTextSelector,
  resetSearchTextSelector,
} from '../Search.selector';

describe('Search selector', () => {
  it('should select search text, set search text, and reset search text', () => {
    const { result: textResult } = renderHook(() => appStore(selectSearchText));
    const { result: setResult } = renderHook(() => appStore(setSearchTextSelector));
    const { result: resetResult } = renderHook(() => appStore(resetSearchTextSelector));

    expect(textResult.current).toBe('');

    act(() => {
      setResult.current('test search');
    });

    // Re-render hook or re-read state to see update
    const { result: updatedTextResult } = renderHook(() => appStore(selectSearchText));
    expect(updatedTextResult.current).toBe('test search');

    act(() => {
      resetResult.current();
    });

    const { result: resetTextResult } = renderHook(() => appStore(selectSearchText));
    expect(resetTextResult.current).toBe('');
  });
});
