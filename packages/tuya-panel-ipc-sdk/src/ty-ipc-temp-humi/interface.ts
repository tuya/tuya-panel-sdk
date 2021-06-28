import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

export interface TYIpcTempHumiProps {
  // 是否为标准dp模式
  standardDpMode: boolean;
  // 容器样式
  containerStyle: ViewStyle;
  // 图标容器样式
  iconBoxStyle: ViewStyle;
  // 温度图标IconStyle
  tempIconImgStyle: ImageStyle;
  // 湿度图标IconStyle
  humiIconImgStyle: ImageStyle;
  // 温度文本样式
  tempIconTextStyle: TextStyle;
  // 湿度文本样式
  humiIconTextStyle: TextStyle;
  // 斜杠分割样式
  symbolTextStyle: TextStyle;
  // 温度图标
  tempIcon: number;
  // 湿度图标
  humiIcon: number;
  // 摄氏温度上报值
  sensor_temperature: number;
  // 华氏温度上报值
  temp_report_f: number;
  // 湿度温度上报值,单位为%
  sensor_humidity: number;
  // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
  temp_unit_select: string;
}


export interface TempHuiSchema {
  [propName: string]: any;
}