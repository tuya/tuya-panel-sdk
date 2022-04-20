import Normal from '../index';

describe('isInteger', () => {
  it('111', () => {
    const result = Normal.isInteger(111);
    expect(result).toBe(true);
  });
  it('{}', () => {
    const result = Normal.isInteger({});
    expect(result).toEqual({});
  });

  it('111.999', () => {
    const result = Normal.isInteger(111.999);
    expect(result).toBe(false);
  });
});

describe('type', () => {
  it('array', () => {
    const result = Normal.type([]);
    expect(result).toBe('array');
  });
  it('object', () => {
    const result = Normal.type({});
    expect(result).toBe('object');
  });

  it('string', () => {
    const result = Normal.type('jioji');
    expect(result).toBe('string');
  });
});

describe('parseJSON', () => {
  it('undefined', () => {
    const result = Normal.parseJson(undefined);
    expect(result).toEqual({});
  });
  it('other', () => {
    const result = Normal.parseJson('jiijji');
    expect(result).toBe('jiijji');
  });
  it('obj', () => {
    const result = Normal.parseJson({});
    expect(result).toEqual({});
  });
});

describe('formatValue', () => {
  it('true', () => {
    const result = Normal.formatValue('true');
    expect(result).toBeTruthy();
  });
  it('false', () => {
    const result = Normal.formatValue('false');
    expect(result).toBeFalsy();
  });
  it('jiuhjiu', () => {
    const result = Normal.formatValue('huihu');
    expect(result).toBe('huihu');
  });

  it('undefined', () => {
    const result = Normal.formatValue(undefined, {});
    expect(result).toBe('');
  });

  it('undefined 1', () => {
    const result = Normal.formatValue(undefined, { type: 'bool' });
    expect(result).toBeFalsy();
  });

  it('undefined 2', () => {
    const result = Normal.formatValue(undefined, { type: 'value', min: 111 });
    expect(result).toBe(111);
  });
});

describe('isNumerical', () => {
  it('number', () => {
    const result = Normal.isNumerical(222);
    expect(result).toBeTruthy();
  });
  it('other', () => {
    const result = Normal.isNumerical({});
    expect(result).toBeFalsy();
  });
});

describe('cameLiza', () => {
  it('string', () => {
    const result = Normal.cameLiza('111');
    expect(result).toBe('111');
  });

  it('number', () => {
    const result = Normal.cameLiza(1111);
    expect(result).toBe('1111');
  });
  it('string by reg', () => {
    const result = Normal.cameLiza('111___---222');
    expect(result).toBe('111222');
  });
  it('empty', () => {
    const result = Normal.cameLiza('');
    expect(result).toBe('');
  });
});

describe('getBitValue', () => {
  it('basic', () => {
    const result = Normal.getBitValue(11111, 1);
    expect(result).toBe(1);
  });
});

describe('isEmptyObj', () => {
  it('obj', () => {
    const result = Normal.isEmptyObj({ a: '豆芽' });
    expect(result).toBeFalsy();
  });
  it('empty obj', () => {
    const result = Normal.isEmptyObj({});
    expect(result).toBeTruthy();
  });
});

describe('transLateNumber', () => {
  it('default', () => {
    const result = Normal.transLateNumber(1);
    expect(result).toBe(1);
  });
  it('number', () => {
    const result = Normal.transLateNumber(1, 0);
    expect(result).toBe(1);
  });
  it('number 2', () => {
    const result = Normal.transLateNumber(1.88989, 0);
    expect(result).toBe(2);
  });
});

describe('formatNumber2String', () => {
  it('default', () => {
    const result = Normal.formatNumber2String(1);
    expect(result).toBe('1');
  });

  it('default 1', () => {
    const result = Normal.formatNumber2String('', 0);
    expect(result).toBe('0');
  });

  it('default 2', () => {
    const result = Normal.formatNumber2String(0.0, 1);
    expect(result).toBe('0');
  });

  it('number', () => {
    const result = Normal.formatNumber2String(1, 2);
    expect(result).toBe('1');
  });
  it('number 2', () => {
    const result = Normal.formatNumber2String(23.899, 2);
    expect(result).toBe('23.89');
  });
  it('number 3', () => {
    const result = Normal.formatNumber2String();
    expect(result).toBe('undefined');
  });
  it('number 4', () => {
    const result = Normal.formatNumber2String('0.89809', 9);
    expect(result).toBe('0.898090000');
  });

  it('number 5', () => {
    const result = Normal.formatNumber2String('0', 2);
    expect(result).toBe('0');
  });

  it('number 6', () => {
    const result = Normal.formatNumber2String('0', -11);
    expect(result).toBe('0');
  });
});

describe('createArr', () => {
  it('length', () => {
    const result = Normal.createArray(9);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe('createArrayByStep', () => {
  it('start', () => {
    const result = Normal.createArrayByStep(8, 1);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('default', () => {
    const result = Normal.createArrayByStep(8);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
});

describe('range', () => {
  it('default', () => {
    const result = Normal.range();
    expect(result).toEqual([]);
  });
  it('basic', () => {
    const result = Normal.range(1, 2, 0, 0);
    expect(result).toEqual([1]);
  });
});
