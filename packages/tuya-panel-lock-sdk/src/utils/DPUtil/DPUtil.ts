import { TYSdk } from 'tuya-panel-kit';
import { Observer, TimeObserver } from './observer';
import ObserverMap from './observerMap';
import { hasListened } from './symbols';
import { dpKeyWrap, asyncDispatchEachObserverLit } from './utils';
import {
  DpDataType,
  ObjType,
  IDP,
  IObserver,
  ITimeObserver,
  DpKeyType,
  CbWithDPValue,
} from './interface';

class DPUtil implements IDP {
  private observerList: ObserverMap<DpKeyType<string>, IObserver<DpKeyType<string>>>;
  private onChangeList: ObserverMap<DpKeyType<string>, (data: DpDataType) => void>;
  private vaildReportDpCount: number;
  [hasListened] = false;

  static createPageDp = (opts?: { vaildReportDpCount: number }): IDP => {
    return new DPUtil(opts);
  };

  constructor(opts?: { vaildReportDpCount: number }) {
    this.observerList = new ObserverMap(this);
    this.onChangeList = new ObserverMap(this);
    this.vaildReportDpCount = opts?.vaildReportDpCount || 5;
  }

  private dpDataChangeHandle = async (data: DpDataType, isMock = false, ...args: any[]) => {
    /** 透传 change 事件 */
    if (this.onChangeList.size > 0) {
      this.onChangeList.forEach(cb => {
        typeof cb === 'function' && cb(data);
      });
    }

    /**
     * 过滤设备上电同步全量dp的上报
     * 触发门铃
     *   ｜
     * 设备上电联网 (同步全量dp 面会收到一次上报)
     *   ｜
     * 设备主动上报
     *   ｜
     * 面板弹窗
     */
    if (data.type !== 'dpData' || Object.keys(data.payload).length > this.vaildReportDpCount)
      return;
    if (data.payload) {
      await asyncDispatchEachObserverLit(this.observerList, data, isMock, args);
    }
  };

  startListen = (): void => {
    if (!this[hasListened]) {
      this[hasListened] = true;
      TYSdk.event.on('deviceDataChange', this.dpDataChangeHandle);
    }
  };

  listen = (dpKey: string): IObserver<symbol> => {
    const symbolDpKey = dpKeyWrap(dpKey);
    const ob = Observer.create<symbol>(symbolDpKey, this.observerList);

    return this.observerList.setT<symbol, IObserver<symbol>>(symbolDpKey, ob);
  };

  listenWithinTime = (dpKey: string, timeout = 10 * 1000): ITimeObserver<symbol> => {
    const symbolDpKey = dpKeyWrap(dpKey);
    const tob = TimeObserver.createTimeObserver<symbol>(symbolDpKey, timeout, this.observerList);

    return this.observerList.setT<symbol, ITimeObserver<symbol>>(symbolDpKey, tob);
  };

  listenDps = (dps: string[]): IObserver<string[]> => {
    const ob = Observer.create<string[]>(dps, this.observerList);
    return this.observerList.setT<string[], IObserver<string[]>>(dps as string[], ob);
  };

  mock = (dps: { [key: string]: any }, ...args: any[]): void => {
    this.dpDataChangeHandle({ type: 'dpData', payload: dps }, true, ...args);
  };

  dispatch = (dps: ObjType): this => {
    TYSdk.device.putDeviceData(dps);
    return this;
  };

  onChange = (cb: CbWithDPValue<DpDataType>): void => {
    this.onChangeList.setT(dpKeyWrap('onChange'), cb);
  };

  off = (): void => {
    this.observerList.clear();
    this.onChangeList.clear();

    TYSdk.event.off('deviceDataChange', this.dpDataChangeHandle);
    this[hasListened] = false;
  };
}

export default DPUtil;
