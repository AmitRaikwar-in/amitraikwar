import React from 'react';
import { renderHook } from '@testing-library/react';
import useIsIntersecting from '../useIsIntersecting';
import { act } from 'react';

class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
  constructor(public callback: any) {
    MockIntersectionObserver.lastInstance = this;
  }
  static lastInstance: MockIntersectionObserver | null = null;
}
global.IntersectionObserver = MockIntersectionObserver as any;

describe('useIsIntersecting', () => {
  beforeEach(() => {
    MockIntersectionObserver.lastInstance = null;
  });

  it('should register observer and return value on intersection change', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useIsIntersecting(ref));

    expect(MockIntersectionObserver.lastInstance).not.toBeNull();
    expect(MockIntersectionObserver.lastInstance?.observe).toHaveBeenCalledWith(ref.current);

    expect(result.current).toBe(false);

    // Trigger callback
    act(() => {
      MockIntersectionObserver.lastInstance?.callback([{ isIntersecting: true }]);
    });

    expect(result.current).toBe(true);
  });
});
