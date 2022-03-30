import { hasListened } from './symbols';
import { IDP } from './interface';

export default class ObserverMap<S extends any, V extends any> extends Map<S, V> {
  source: IDP;

  constructor(source: IDP) {
    super();
    this.source = source;
  }

  setT<SD extends S, O extends V>(key: SD, value: O): O {
    /** 如果没有监听事件，重新监听 */
    if (!this.source[hasListened]) {
      this.source.startListen();
    }

    super.set(key, value);
    return value;
  }
}
