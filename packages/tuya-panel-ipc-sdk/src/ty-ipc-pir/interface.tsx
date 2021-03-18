import { TextStyle, ViewStyle } from 'react-native';

export interface TYIpcPirProps {
  // 容器样式
  containerStyle: ViewStyle;
  // 标题文本
  title: string | null;
  // 标题文本样式
  titleStyle: TextStyle;
  // 激活颜色
  activeColor: string;
  // 开启文本
  OnText: string;
  // 关闭文本
  OffText: string;
  // pir控制区域A dpcode
  dpCodeA: string;
  // pir控制区域A dp值
  dpCodeAValue: boolean;
  // pir控制区域B dpcode
  dpCodeB: string;
  // pir控制区域B dp值
  dpCodeBValue: boolean;
  // pir控制区域C dpcode
  dpCodeC: string;
  // pir控制区域C dp值
  dpCodeCValue: boolean;
  // 显示扇形区域数目, 默认1
  pieNumber: number;
  // pir区域值点击事件监听
  onChangePir: (param1: string, param2: boolean) => void;
  // pir区域开关按钮
  pieBtnTextStyle: TextStyle;
}

interface commonPir {
  // 激活颜色
  activeColor: string;
  // 图片宽度
  pirWidth: number;
  // 图片高度
  pirHeight: number;
  // 对应pir区域控制开关
  changePir: (param1: string, param2: boolean) => void;
  // 开启文本
  OnText: string;
  // 关闭文本
  OffText: string;
  // pir控制区域A dpcode
  dpCodeA: string;
  // pir控制区域A dp值
  dpCodeAValue: boolean;
  // pir区域开关按钮文本样式
  pieBtnTextStyle: TextStyle;
}

export type OnePirProps = commonPir;

export interface TwoPirProps extends commonPir {
  dpCodeB: string;
  dpCodeBValue: boolean;
}

export interface ThreePirProps extends commonPir {
  dpCodeB: string;
  dpCodeBValue: boolean;
  dpCodeC: string;
  dpCodeCValue: boolean;
}
