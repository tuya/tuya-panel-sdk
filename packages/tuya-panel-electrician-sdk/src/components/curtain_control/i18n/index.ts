/* eslint-disable @typescript-eslint/ban-ts-comment */
import { I18N } from 'tuya-panel-kit';
import Strings from './string';

const TimerI18N = class extends I18N {
  // @ts-ignore
  getLang(key: string) {
    return super.getLang(`CurtainControl_${key}`);
  }

  formatValue(key: string, ...values: any) {
    // @ts-ignore
    return super.formatValue(`CurtainControl_${key}`, ...values);
  }
};

export default new TimerI18N(Strings);
