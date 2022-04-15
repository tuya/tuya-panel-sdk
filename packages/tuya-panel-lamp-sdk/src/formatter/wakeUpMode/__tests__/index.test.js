import WakeUpFormatter from '../index';

describe('SleepFormatter class', () => {
  const data = {
    version: 0,
    number: 1,
    nodes: [
      {
        brightness: 100,
        delay: 6,
        hour: 7,
        hue: 0,
        last: 0,
        minute: 32,
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
  const WakeUpFormatterA = new WakeUpFormatter();
  const WakeUpFormatterB = new WakeUpFormatter('', defaultData);

  jest.spyOn(WakeUpFormatterA, 'parse');
  jest.spyOn(WakeUpFormatterA, 'format');
  jest.spyOn(WakeUpFormatterB, 'parse');

  it('parse correct', () => {
    expect(WakeUpFormatterA.parse('0001010006072000000000641e00')).toEqual(data);
    expect(WakeUpFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(WakeUpFormatterB.parse('')).toEqual(defaultData);
    expect(WakeUpFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(WakeUpFormatterA.format(data)).toEqual('0001010006072000000000641e00');
    expect(WakeUpFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
