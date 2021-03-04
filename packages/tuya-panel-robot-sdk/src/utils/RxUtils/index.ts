import { empty, concat, fromEventPattern, of } from 'rxjs';
import { pluck, filter, distinctUntilChanged } from 'rxjs/operators';
import { TYSdk } from 'tuya-panel-kit';

/**
 * 创建 dpValue 的Observable
 *
 * @returns
 */
export function createDpValue$<T>(
  code: string,
  initial = true,
  options?: { distinct: boolean }
): any {
  let isExist = false;
  try {
    isExist = TYSdk.device.checkDpExist(code);
  } catch (error) {
    isExist = false;
  }
  if (!isExist) {
    console.warn(`${code} dp is not exist!!!!`);
    return empty();
  }
  const initial$ = initial ? of(TYSdk.devInfo.state) : empty();

  const dpHandle = (data, fn) => {
    switch (data.type) {
      case 'dpData':
        fn(data.payload);
        break;
      default:
        break;
    }
  };

  const value$ = fromEventPattern<T>(
    handle => TYSdk.event.on('deviceDataChange', data => dpHandle(data, handle)),
    handle => TYSdk.event.remove('deviceDataChange', data => dpHandle(data, handle))
  );

  if (options && options.distinct) {
    return concat<T>(initial$, value$).pipe(
      pluck(code),
      distinctUntilChanged<T>(),
      filter(value => value !== undefined)
    );
  }

  return concat<T>(initial$, value$).pipe(
    pluck(code),
    filter<T>(value => value !== undefined)
  );
}
