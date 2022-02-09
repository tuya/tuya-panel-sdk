export type CbWithDPValue<T> = (dpValue?: T, ...args: any[]) => void;
export type DpDataType = {
  payload: { [key: string]: any };
  type: 'dpData' | 'devInfo' | 'deviceOnline';
};
export type DpKeyType<T> = T | T[] | symbol;
export type ObjType = Record<string, any>;

export interface IObserver<D extends DpKeyType<string>> {
  reply: <V = any>(cb: CbWithDPValue<V>) => IObserver<D>;
  catch: (cb: () => void) => void;
}

export interface ITimeObserver<D extends DpKeyType<string>> extends IObserver<D> {
  reply: <V = any>(cb: CbWithDPValue<V>) => ITimeObserver<D>;
  timeout: (cb: () => void) => ITimeObserver<D>;
}

export interface IDP {
  startListen: () => void;
  off: () => void;

  listen: (dpKey: string) => IObserver<any>;
  listenWithinTime: (dpKey: string, timeout: number) => ITimeObserver<any>;
  listenDps: (dps: string[]) => IObserver<any>;
  dispatch: (dps: Record<string, any>) => this;

  onChange: (cb: CbWithDPValue<DpDataType>) => void;
  mock: (dps: Record<string, any>, ...args: any[]) => void;
}
