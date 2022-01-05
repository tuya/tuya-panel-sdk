import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
import {
  replyCb,
  timeoutCb,
  observerList,
  symbolDpKey,
  symbolTimer,
  lastReportTime,
  initObserver,
  checkHasCurrentDp,
} from './symbols';
import {
  ObjType,
  DpDataType,
  IObserver,
  ITimeObserver,
  CbWithDPValue,
  DpKeyType,
} from './interface';
import { delayCall, getObserverLastDpTime } from './utils';
import ObserverMap from './observerMap';

export class Observer<D extends DpKeyType<string>> implements IObserver<D> {
  static create<DS extends DpKeyType<string>>(
    dpKey: DS,
    obList: ObserverMap<any, any>
  ): IObserver<DS> {
    const ob = new Observer<DS>(dpKey, obList);

    ob[replyCb] = () => {};
    ob[initObserver]();

    return ob;
  }

  constructor(dpKey: D, obList: ObserverMap<any, any>) {
    this[symbolDpKey] = dpKey;
    this[observerList] = obList;
  }

  /** 私有属性 */
  [symbolTimer] = -1;

  [observerList]: Map<any, any>;

  [symbolDpKey]: D;

  [lastReportTime]: number | ObjType;

  [replyCb]: CbWithDPValue<any>;

  [initObserver] = (): void => {
    getObserverLastDpTime(this[symbolDpKey]).then(dpsTime => {
      this[lastReportTime] = dpsTime;
    });
  };

  [checkHasCurrentDp] = async (data: DpDataType, isMock: boolean): Promise<boolean> => {
    const dpKey = this[symbolDpKey];
    if (
      (typeof dpKey === 'string' && has(data.payload, dpKey)) ||
      (typeof dpKey === 'symbol' && has(data.payload, (dpKey as symbol).description)) ||
      (dpKey instanceof Array && (dpKey as string[]).some(dp => has(data.payload, dp)))
    ) {
      if (isMock) return true;
      const dpsTime = await getObserverLastDpTime(this[symbolDpKey]);
      const isEqualTime = isEqual(this[lastReportTime], dpsTime);
      /** 如果最新的上报时间和上次的一样，则说明是设备缓存上报，忽略不计 */
      if (isEqualTime) {
        const dpKeyText = typeof dpKey === 'symbol' ? (dpKey as symbol).description : dpKey;
        // eslint-disable-next-line no-console
        console.warn(`>>>>>---------Invalid Reported ${dpKeyText as string}------------<<<<<`);
        return false;
      }
      this[lastReportTime] = dpsTime;
      return true;
    }
    return false;
  };

  reply: <V = any>(cb: CbWithDPValue<V>) => IObserver<D> = cb => {
    this[replyCb] = cb;
    return this;
  };

  catch: () => IObserver<D>;
}

export class TimeObserver<D extends DpKeyType<string>>
  extends Observer<D>
  implements ITimeObserver<D> {
  [timeoutCb] = (): void => {};

  static createTimeObserver<DS extends DpKeyType<string>>(
    dpKey: DS,
    timeout: number,
    obList: ObserverMap<any, any>
  ): ITimeObserver<DS> {
    const TOB = new TimeObserver<DS>(dpKey, obList);

    TOB[initObserver]();
    TOB[symbolTimer] = delayCall(() => {
      TOB[timeoutCb]();
      TOB[observerList].delete(dpKey);
    }, timeout);

    return TOB;
  }

  reply: <V = any>(cb: CbWithDPValue<V>) => ITimeObserver<D> = cb => {
    this[replyCb] = cb;
    return this;
  };

  timeout: (cb: () => void) => ITimeObserver<D> = cb => {
    this[timeoutCb] = cb;
    return this;
  };
}
