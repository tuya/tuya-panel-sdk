import Sensing from '../index';

describe('fToc', () => {
  it('normal', () => {
    const result = Sensing.fToc(20);
    expect(result).toBe(-6.67);
  });
  it('default', () => {
    const result = Sensing.fToc('');
    expect(result).toBe('');
  });
});

describe('cTof', () => {
  it('default', () => {
    const result = Sensing.cTof('');
    expect(result).toBe('');
  });
  it('normal', () => {
    const result = Sensing.cTof(20);
    expect(result).toBe(68);
  });
});

describe('cTemperatureSensitivityTof', () => {
  it('default', () => {
    const result = Sensing.cTemperatureSensitivityTof('');
    expect(result).toBe('');
  });

  it('normal', () => {
    const result = Sensing.cTemperatureSensitivityTof(1);
    expect(result).toBe(1.8);
  });
});

describe('fTemperatureSensitivityToc', () => {
  it('default', () => {
    const result = Sensing.fTemperatureSensitivityToc('');
    expect(result).toBe('');
  });
  it('normal', () => {
    const result = Sensing.fTemperatureSensitivityToc(3.24);
    expect(result).toBe(1.8);
  });
});

describe('isSupportDp', () => {
  it('default', () => {
    const result = Sensing.isSupportDp(undefined);
    expect(result).toBeFalsy();
  });
});

describe('hexToRgb', () => {
  it('default', () => {
    const result = Sensing.hexToRgb('#ffffff', 0.1);
    expect(result).toBe('rgba(255,255,255,0.1)');
  });

  it('default 1', () => {
    const result = Sensing.hexToRgb('#fff', 0.1);
    expect(result).toBe('rgba(255,255,255,0.1)');
  });
});

describe('addZero', () => {
  it('default', () => {
    const result = Sensing.addZero(9);
    expect(result).toBe('09');
  });

  it('default 1', () => {
    const result = Sensing.addZero('9');
    expect(result).toBe('09');
  });

  it('default 2', () => {
    const result = Sensing.addZero(12);
    expect(result).toBe('12');
  });
});

describe('validateEmail', () => {
  it('default 1', () => {
    const result = Sensing.validateEmail('18470186610@163.com');
    expect(result).toBeTruthy();
  });
});

describe('strToWeek', () => {
  it('default', () => {
    const result = Sensing.strToWeek('1111111111', []);
    expect(result).toEqual([]);
  });

  it('default 1', () => {
    const result = Sensing.strToWeek('11111111', ['1', '2', '3', '4', '5', '6', '7']);
    expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });

  it('default 2', () => {
    const result = Sensing.strToWeek('1111111', ['1', '2', '3', '4', '5', '6', '7']);
    expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });

  it('default 3', () => {
    const result = Sensing.strToWeek('0000000', ['1', '2', '3', '4', '5', '6', '7']);
    expect(result).toEqual([]);
  });
});

describe('customDp', () => {
  it('default', () => {
    const result = Sensing.customDp({});
    expect(result).toEqual({});
  });
  it('normal', () => {
    const d = {
      doorcontact_state: {
        code: 'doorcontact_state',
        extContent: '{"trigger":"direct"}',
        iconname: 'icon-menci',
        id: 102,
        mode: 'ro',
        name: '门磁状态',
        trigger: 'direct',
        type: 'bool',
        dptype: 'obj',
      },
    };
    const result = Sensing.customDp(d);
    expect(result).toEqual({
      bool: [
        {
          code: 'doorcontact_state',
          extContent: '{"trigger":"direct"}',
          iconname: 'icon-menci',
          id: 102,
          mode: 'ro',
          name: '门磁状态',
          trigger: 'direct',
          type: 'bool',
          dptype: 'obj',
        },
      ],
    });
  });
});
