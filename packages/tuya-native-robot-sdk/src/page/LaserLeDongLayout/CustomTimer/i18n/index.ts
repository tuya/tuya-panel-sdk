// @ts-nocheck
import { I18N } from '@tuya-rn/tuya-native-components';
import Strings from './string';

const TimerI18N = class extends I18N {
  getLang(key, defaultString) {
    this.sendToSentry(`TYTimer_${key}`);
    return super.getLang(`TYTimer_${key}`, defaultString);
  }
  formatValue(key, ...values) {
    return super.formatValue(`TYTimer_${key}`, ...values);
  }
};

export default new TimerI18N(Strings);
