import { StyleProp, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

export interface RhythmsCircleProps {
  // picker的大小
  size: number;
  ringWidth: number;
  // 滑块图标大小
  thumbSize: number;
  // 色盘最外围样式
  pickerStyle?: StyleProp<ViewStyle>;
  // 时间盘的样式
  timeStyle?: StyleProp<ViewStyle>;
  // 时间指针图片
  timeImg?: ImageSourcePropType;
  // 滑块图标样式
  thumbStyle?: StyleProp<ViewStyle>;
  // 图标样式
  iconStyle?: StyleProp<ImageStyle>;
  data: IData[];
  // 滑块图标是否可拖动
  disabled: boolean;
  // 不能拖动的透明度
  disabledOpacity: number;
  // 是否可以滑过超过上一个节点和下一个节点
  stepOverEnabled: boolean;
  // 最小间隔时间为15分钟对应的角度
  stepTime?: number;
  // 点击滑块图标事件
  onGrant?: () => void;
  // 滑块图标移动事件
  onMove?: (v: IMovePropsData[]) => void;
  // 滑块图标移动结束事件
  onRelease?: (v: IMovePropsData[]) => void;
  // 滑块图标改变事件
  onChange?: (v: IMovePropsData[]) => void;
  // 在日落节点后多加一个颜色进行优化
  lastRingColor?: string;
  // 默认图标color
  defaultTintColor?: string;
}

export interface IData {
  index: number;
  // hour * 60 + minute,
  time: number;
  // 图标
  icon: number;
  // 每个图标之间的颜色
  color: string;
  // 图标是否可以触发
  valid?: boolean;
  // 改节点的角度
  angle?: number;
}
export interface IMovePropsData {
  index: number;
  time: number;
  icon: number;
  color: string;
  deg: number;
}
