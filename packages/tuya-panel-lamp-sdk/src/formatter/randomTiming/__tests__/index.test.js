import RandomTimerFormatter from '../index';

describe('RandomTimerFormatter class', () => {
  const data = {
    version: 0,
    length: 12,
    nodes: [
      {
        channel: 1,
        color: { hue: 118, saturation: 83, value: 100, brightness: 0, temperature: 0 },
        endTime: 1380,
        power: true,
        startTime: 1080,
        weeks: [0, 0, 0, 1, 0, 0, 0, 0],
      },
    ],
  };
  const RandomTimerFormatterA = new RandomTimerFormatter();
  const RandomTimerFormatterB = new RandomTimerFormatter('', data);

  jest.spyOn(RandomTimerFormatterA, 'parse');
  jest.spyOn(RandomTimerFormatterA, 'format');
  jest.spyOn(RandomTimerFormatterB, 'parse');

  it('parse correct', () => {
    expect(RandomTimerFormatterA.parse('000c030804380564007653640000')).toEqual(data);
    expect(RandomTimerFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(RandomTimerFormatterB.parse('00')).toEqual(data);
    expect(RandomTimerFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(RandomTimerFormatterA.format(data)).toEqual('000c030804380564007653640000');
    expect(RandomTimerFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
