import RhythmFormatter from '../index';
import defaultData from '../default';

describe('rhythmFormatter class', () => {
  const Obj = new RhythmFormatter(null, null, true);
  const Obj2 = new RhythmFormatter(null, null, true);
  jest.spyOn(Obj, 'parse');
  jest.spyOn(Obj2, 'parse');
  jest.spyOn(Obj, 'format');

  it('parse', () => {
    expect(
      Obj.parse(
        '0000007f0601060000000000006401061e000000006432010b1e00000000646401110000000000463201141e000000004632011500000000000000'
      )
    ).toEqual(defaultData);
    expect(Obj.parse).toHaveBeenCalledTimes(1);
  });
  it('parse', () => {
    expect(Obj2.parse('')).toEqual(defaultData);
    expect(Obj2.parse).toHaveBeenCalledTimes(1);
  });
  it('format', () => {
    expect(Obj.format(defaultData)).toEqual(
      '0000007f0601060000000000006401061e000000006432010b1e00000000646401110000000000463201141e000000004632011500000000000000'
    );
    expect(Obj.format).toHaveBeenCalledTimes(1);
  });
});
