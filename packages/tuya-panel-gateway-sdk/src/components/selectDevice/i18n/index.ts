import { I18N } from 'tuya-panel-kit';
import Strings from './strings';
import GatewayUtils from '../../../utils';

const { addPrefixToI18n } = GatewayUtils;
const prefix = 'TYGateway_';
class ComponentI18N extends I18N {
  getLang = (key: string, defaultString?: string) => {
    return super.getLang(`${prefix}${key}`, defaultString);
  };
}
const newI18nStrings = addPrefixToI18n(Strings, prefix);
const strings: any = new ComponentI18N(newI18nStrings);

export default strings;
