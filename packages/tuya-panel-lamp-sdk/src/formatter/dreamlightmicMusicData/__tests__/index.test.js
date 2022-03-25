import DreamLightMicMusicFormatter from '../index';

describe('DreamLightMicMusicFormatter class', () => {
  const data = {
    v: 1,
    power: true,
    id: 3,
    isLight: 0,
    mode: 2,
    sensitivity: 50,
    speed: 100,
    a: 1,
    b: 0,
    c: 0,
    brightness: 100,
    colors: [
      {
        hue: 0,
        saturation: 100,
      },
      {
        hue: 120,
        saturation: 100,
      },
      {
        hue: 240,
        saturation: 100,
      },
      {
        hue: 60,
        saturation: 100,
      },
      {
        hue: 180,
        saturation: 100,
      },
      {
        hue: 300,
        saturation: 100,
      },
      {
        hue: 0,
        saturation: 0,
      },
    ],
  };

  const DreamLightMicMusicFormatterA = new DreamLightMicMusicFormatter();
  const DreamLightMicMusicFormatterB = new DreamLightMicMusicFormatter('', data);

  jest.spyOn(DreamLightMicMusicFormatterA, 'parse');
  jest.spyOn(DreamLightMicMusicFormatterA, 'format');
  jest.spyOn(DreamLightMicMusicFormatterB, 'parse');

  it('parse correct', () => {
    expect(
      DreamLightMicMusicFormatterA.parse(
        '0101010264320100006400006400786400f064003c6400b464012c64000000'
      )
    ).toEqual(data);
    expect(DreamLightMicMusicFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(DreamLightMicMusicFormatterB.parse('')).toEqual(data);
    expect(DreamLightMicMusicFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(DreamLightMicMusicFormatterA.format(data)).toEqual(
      '0101010264320100006400006400786400f064003c6400b464012c64000000'
    );
    expect(DreamLightMicMusicFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
