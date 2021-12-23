import PowerMemoryFormatter from '../index';

describe('PowerMemoryFormatter class', () => {
  const data = {
    version: 0,
    mode: 0,
    hue: 0,
    saturation: 0,
    value: 0,
    brightness: 1000,
    temperature: 1000,
  };

  const powerMemoryFormatterA = new PowerMemoryFormatter();
  const powerMemoryFormatterB = new PowerMemoryFormatter('', data);

  jest.spyOn(powerMemoryFormatterA, 'parse');
  jest.spyOn(powerMemoryFormatterA, 'format');
  jest.spyOn(powerMemoryFormatterB, 'parse');

  it('parse correct', () => {
    expect(powerMemoryFormatterA.parse('000000000000000003e803e8')).toEqual(data);
    expect(powerMemoryFormatterA.parse).toHaveBeenCalledTimes(1);
  });

  it('parse error', () => {
    expect(powerMemoryFormatterB.parse('00')).toEqual(data);
    expect(powerMemoryFormatterB.parse).toHaveBeenCalledTimes(1);
  });

  it('format', () => {
    expect(powerMemoryFormatterA.format(data)).toEqual('000000000000000003e803e8');
    expect(powerMemoryFormatterA.format).toHaveBeenCalledTimes(1);
  });
});
