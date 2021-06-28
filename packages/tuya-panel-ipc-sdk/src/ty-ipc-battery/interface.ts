/* eslint-disable camelcase */
import { ViewStyle } from 'react-native';

export interface TYIpcBatteryProps {
  // 是否使用电量标准Dp模式
  standardDpMode: boolean;
  // 电量数值
  value: number;
  // 电池容器样式
  batteryContainer: ViewStyle;
  // 电量尺寸大小
  size: number;
  // 旋转角度
  rotateZ: number;
  // 电量边框色
  batteryBorderColor: 'rgba(0,0,0,.5)';
  // 电量大于20%颜色值
  highColor: string;
  // 电量大于10%, 小于20%颜色值
  middleColor: string;
  // 电量小于10%颜色值
  lowColor: string;
  // 自定义颜色
  onCalcColor: any;
  // 充电图标颜色
  chargingColor: string;
  // 是否充电中
  isCharging: boolean;
  // 标准dp 145 电量数值上报
  wireless_electricity: undefined | number;
  // 标准dp 146 供电方式
  wireless_powermode: undefined | string;
  // 标准dp 148 精准上报能力
  battery_report_cap: undefined | number;
  // 监听电量变化值, 主要针对使用标准Dp模式, 用于控制不同设备显示电量值
  onChangeEleValue: (_: number) => void;
}
