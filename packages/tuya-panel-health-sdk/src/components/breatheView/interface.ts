import { StyleProp, ViewStyle } from 'react-native';
export interface BreatheViewProps {
  /**
   * 内容样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 是否开启呼吸
   */
  active?: boolean;
  /**
   * 呼吸一轮的时间, 单位是ms
   */
  duration?: number;
  /**
   * 是否使用原生动画驱动, 一般在安卓低端机上会比较有用
   */
  useNativeDriver?: boolean;
  isInteraction?: boolean;
  children?: React.ReactNode;
}
