import { StyleProp, ViewStyle } from 'react-native';

export interface MainProps {
  /**
   * mask 是否可见
   */
  visible?: boolean;
  /**
   * 内容区偏离屏幕左边的距离
   */
  offsetX?: number;
  /**
   * 内容区偏离屏幕顶部的距离
   */
  offsetY?: number;
  /**
   * 动画持续时间
   */
  duration: number;
  /**
   * content 高度
   */
  height?: number;
  /**
   * content 宽度
   */
  width?: number;
  /**
   * content 内容
   */
  children?: React.ReactNode;
  /**
   * mask 背景色
   */
  maskBgColor?: string;
  /**
   * mask 透明度
   */
  maskOpacity?: number;
  /**
   * content 出现的方向
   */
  direction?: 'left' | 'top' | 'bottom' | 'right';
  /**
   * mask 隐藏方法
   */
  onClose?: () => void;
  /**
   * style content wrapper 样式
   */
  style?: StyleProp<ViewStyle>;
}
