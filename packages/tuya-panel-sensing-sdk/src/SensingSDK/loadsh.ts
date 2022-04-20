/* istanbul ignore file */

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument: (index).
 *
 * @since 0.1.0
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * times(3, String)
 * // => ['0', '1', '2']
 *
 *  times(4, () => 0)
 * // => [0, 0, 0, 0]
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function times<TResult>(n: number, iteratee: (num: number) => TResult) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  let index = -1;
  const length = Math.min(n, MAX_ARRAY_LENGTH);
  const result = new Array(length);
  while (++index < length) {
    result[index] = iteratee(index);
  }
  index = MAX_ARRAY_LENGTH;
  // eslint-disable-next-line no-param-reassign
  n -= MAX_ARRAY_LENGTH;
  while (++index < n) {
    iteratee(index);
  }
  return result;
}

// 简易版防抖
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function debounce(fn: any, wait: number) {
  let timer: any = null;
  // eslint-disable-next-line func-names
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

export default {
  times,
  debounce,
};
