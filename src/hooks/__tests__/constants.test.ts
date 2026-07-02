import { SPRING_SETTING } from '../constants';

describe('hooks constants', () => {
  it('should export SPRING_SETTING correctly', () => {
    expect(SPRING_SETTING).toEqual({
      damping: 40,
      stiffness: 1000,
      restDelta: 0.001,
    });
  });
});
