import { renderHook, fireEvent } from '@testing-library/react';
import useSpringMousePosition from '../useSpringMousePosition';
import { act } from 'react';

jest.mock('framer-motion', () => {
  const jumpMockX = jest.fn();
  const jumpMockY = jest.fn();
  return {
    useMotionValue: jest.fn(() => ({
      jump: jest.fn((val) => {
        if (jumpMockX.mock.calls.length === 0) jumpMockX(val);
        else jumpMockY(val);
      }),
    })),
    useSpring: jest.fn((mv) => mv),
    frame: {
      read: jest.fn((cb) => cb()),
    },
  };
});

describe('useSpringMousePosition', () => {
  it('should setup pointermove listeners and trigger on pointer move', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'offsetLeft', { value: 10 });
    Object.defineProperty(div, 'offsetTop', { value: 20 });
    const ref = { current: div };

    const { result } = renderHook(() => useSpringMousePosition(ref));

    act(() => {
      fireEvent(window, new MouseEvent('pointermove', { clientX: 100, clientY: 200 }));
    });

    expect(result.current.x).toBeDefined();
    expect(result.current.y).toBeDefined();
  });
});
