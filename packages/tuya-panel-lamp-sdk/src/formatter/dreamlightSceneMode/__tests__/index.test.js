import DreamLightSceneFormatter from '../index';

describe('DreamLightSceneFormatter class', () => {
  const data = {
    version: 1,
    id: 21,
    mode: 10,
    speed: 82,
    segmented: 1,
    loop: 1,
    excessive: 1,
    direction: 0,
    expand: 0,
    reserved1: 0,
    reserved2: 0,
    brightness: 1000,
    colors: [
      {
        hue: 193,
        saturation: 970,
      },
      {
        hue: 180,
        saturation: 480,
      },
      {
        hue: 181,
        saturation: 820,
      },
      {
        hue: 196,
        saturation: 990,
      },
    ],
  };

  const DreamLightSceneFormatterA = new DreamLightSceneFormatter();
  const DreamLightSceneFormatterB = new DreamLightSceneFormatter('', data);

  jest.spyOn(DreamLightSceneFormatterA, 'parse');
  jest.spyOn(DreamLightSceneFormatterA, 'format');
  jest.spyOn(DreamLightSceneFormatterB, 'parse');

  it('parse correct', () => {
    expect(DreamLightSceneFormatterA.parse('01150a5252e000006400c16100b43000b55200c463')).toEqual(
      data
    );
    expect(DreamLightSceneFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(DreamLightSceneFormatterB.parse('')).toEqual(data);
    expect(DreamLightSceneFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(DreamLightSceneFormatterA.format(data)).toEqual(
      '01150a5252e000006400c16100b43000b55200c463'
    );
    expect(DreamLightSceneFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
