/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

export interface SettingProps {
  /** 主题色 */
  themeColor: string;
  /** 云跳转 */
  cloudFunData: any[];
  /** 是否展示历史记录 */
  showSwitchLog: boolean;
  /** 历史记录路由 */
  logId: string;
  /** 设置相关dp点 */
  settingDps: [{ [key: string]: any }];
  /** 断电重启状态是否是多dp */
  isStatusMultichannel: boolean;
  /** 多路断电重启路由 */
  statusId: string;
}

export const DefualtSettingProps = {
  themeColor: '#272929',
  cloudFunData: [],
  showSwitchLog: false,
  settingDps: [],
  isStatusMultichannel: false,
  logId: 'switchLog',
  statusId: 'relayStatus',
};

export interface LightModeProps {
  /** icon颜色 */
  iconTintColor: string;
  /** 当前值  */
  value: number | string | boolean;
  /** 列表 */
  dataSource: any[];
  /** dpCode */
  code: string;
}

export interface LightModeState {
  /** 选中 */
  selectValue: string | number | boolean;
}

export const DefaultLightModeProps = {
  dataSource: [],
  iconTintColor: '',
};

export interface RelayProps {
  themeColor: string;
}

export interface RelayState {
  select: number;
}

export interface DpState {
  dpState: { [key: string]: number | boolean | string };
}

export const trimArray = (array: any) => array.filter((v: any) => !!v);

export const _filter = (schema: any) =>
  _.filter(schema, (d: any) => /^relay_status/.test(d.code) && d.code !== 'relay_status');
