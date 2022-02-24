import SleepFormatter from '../index';

describe('SleepFormatter class', () => {
  const data = {
    version: 0,
    number: 1,
    nodes: [
      {
        brightness: 50,
        delay: 6,
        hour: 23,
        hue: 0,
        minute: 0,
        power: true,
        saturation: 0,
        temperature: 30,
        value: 0,
        weeks: [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  const defaultData = {
    version: 0,
    number: 0,
    nodes: [],
  };
  const SleepFormatterA = new SleepFormatter();
  const SleepFormatterB = new SleepFormatter('', defaultData);

  jest.spyOn(SleepFormatterA, 'parse');
  jest.spyOn(SleepFormatterA, 'format');
  jest.spyOn(SleepFormatterB, 'parse');

  it('parse correct', () => {
    expect(SleepFormatterA.parse('0001010006170000000000321e')).toEqual(data);
    expect(SleepFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(SleepFormatterB.parse('')).toEqual(defaultData);
    expect(SleepFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(SleepFormatterA.format(data)).toEqual('0001010006170000000000321e');
    expect(SleepFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
