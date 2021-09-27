import { delayCall } from '../utils';

describe('utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('delayCall', async () => {
    const fn = jest.fn();
    const timer = delayCall(() => {
      fn();
    }, 1000);
    jest.advanceTimersByTime(1000);
    expect(timer).toBeTruthy();
    expect(fn).toHaveBeenCalled();
    const timer2 = delayCall(() => {
      fn();
    });
    jest.advanceTimersByTime(3000);
    expect(timer2).toBeTruthy();
    expect(fn).toBeCalledTimes(2);
  });
});
