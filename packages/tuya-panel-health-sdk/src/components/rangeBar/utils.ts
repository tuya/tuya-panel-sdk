// 归一化
function createNormalize(a, b) {
  // if (a > b)  t = a, a = b, b = t;
  return x => (x - a) / (b - a);
}

// 线性插值
function createInterpolate(a, b) {
  // if (a > b) t = a, a = b, b = t;
  return x => a * (1 - x) + b * x;
}

/**
 * 将多个单个参数的函数合成为一个函数，执行顺序为从右到左
 * @param fn 第一个函数
 * @param rest 剩余函数
 * @returns 复合后的函数
 */
export function compose<T>(fn: (x: T) => T, ...rest: ((x: T) => T)[]) {
  return rest.reduce((pre, cur) => x => pre(cur(x)), fn);
}

interface Option {
  domain: number[];
  range: number[];
}

export function linear(option: Option) {
  const { domain, range } = option;

  function map(x) {
    const normalize = createNormalize(domain[0], domain[1]);
    const interpolate = createInterpolate(range[0], range[1]);
    console.log('domain', domain, range, normalize(x));
    const output = compose(interpolate, normalize);
    return output(x);
  }

  return { map };
}

export function valueInRange(val: number | string, range: number[]) {
  const value = Number(val);
  range.sort((a, b) => a - b);
  return value >= range[0] && value <= range[1];
}
