import CycleTimerFormatter from '../index';

describe('CycleTimerFormatter class', () => {
  const data = {
    version: 0,
    length: 16,
    nodes: [
      {
        channel: 1,
        closeTime: 1,
        color: { hue: 0, saturation: 100, value: 100, brightness: 0, temperature: 0 },
        endTime: 1380,
        openTime: 1,
        power: true,
        startTime: 1080,
        weeks: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const CycleTimerFormatterA = new CycleTimerFormatter();
  const CycleTimerFormatterB = new CycleTimerFormatter('', data);

  jest.spyOn(CycleTimerFormatterA, 'parse');
  jest.spyOn(CycleTimerFormatterA, 'format');
  jest.spyOn(CycleTimerFormatterB, 'parse');

  it('parse correct', () => {
    expect(CycleTimerFormatterA.parse('001003000438056400010001000064640000')).toEqual(data);
    expect(CycleTimerFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(CycleTimerFormatterB.parse('00')).toEqual(data);
    expect(CycleTimerFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(CycleTimerFormatterA.format(data)).toEqual('001003000438056400010001000064640000');
    expect(CycleTimerFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
