import { valueToPosition, positionToValue, createArray, closest, roundFun } from '../converters';

describe('converters', () => {
  it('test valueToPosition', () => {
    const result = valueToPosition(1, [1, 10], 100, 2);
    expect(result).not.toBeUndefined();
  });
  it('test closest', () => {
    const index = closest([0, 1, 2, 3, 4, 5, 6], 6);
    const index1 = closest([0, 1, 2, 3, 4, 5, 6], -1);
    const index2 = closest([0, 1, 2, 3, 4, 5, 6], 7);
    expect(index).toBe(6);
    expect(closest([0, 1, 2, 3, 4, 5, 6])).toBe(-1);
    // expect(index()).toBeNull();
    expect(index1).toBe(0);
    expect(index2).toBe(6);
  });
  it('test positionToValue', () => {
    const result1 = positionToValue(-1, [1, 2, 3, 4, 5, 6], 280);
    const result2 = positionToValue(20, [1, 2, 3, 4, 5, 6], 280);
    // expect(result1).not.toBeNull();
    expect(result2).not.toBeUndefined();
  });

  it('test createArray', () => {
    const result = createArray(0, 1, 0.1);
    expect(result).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });

  it('test roundFun', () => {
    const result1 = roundFun(7, 0);
    const result2 = roundFun(7, 1);
    expect(result1).toBe(7);
    expect(result2).toBe(7.0);
    expect(result1).not.toBeUndefined();
    expect(result1).not.toBeNull();
  });
});
