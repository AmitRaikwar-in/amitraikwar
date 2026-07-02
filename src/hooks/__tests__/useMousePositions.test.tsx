import { renderHook, fireEvent } from '@testing-library/react';
import useMousePositions from '../useMousePositions';
import { act } from 'react';

describe('useMousePositions', () => {
  it('should track mouse position changes on mousemove', () => {
    const { result } = renderHook(() => useMousePositions());

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      fireEvent.mouseMove(window, { clientX: 150, clientY: 200 });
    });

    expect(result.current).toEqual({ x: 150, y: 200 });
  });
});
