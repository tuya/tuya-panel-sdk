import SceneFormatter from '../index';

describe('SceneFormatter class', () => {
  const data = {
    id: 11,
    colors: [
      {
        brightness: 0,
        hue: 15,
        mode: 0,
        saturation: 400,
        speed: 0,
        temperature: 0,
        time: 0,
        value: 1000,
      },
    ],
  };
  const SceneFormatterA = new SceneFormatter();
  const SceneFormatterB = new SceneFormatter('', data);

  jest.spyOn(SceneFormatterA, 'parse');
  jest.spyOn(SceneFormatterA, 'format');
  jest.spyOn(SceneFormatterB, 'parse');

  it('parse correct', () => {
    expect(SceneFormatterA.parse('0b000000000f019003e800000000')).toEqual(data);
    expect(SceneFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(SceneFormatterB.parse('')).toEqual(data);
    expect(SceneFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(SceneFormatterA.format(data)).toEqual('0b000000000f019003e800000000');
    expect(SceneFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
