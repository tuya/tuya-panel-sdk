import { CSSProperties } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * @title Slider
 */
export interface SliderProps {
  style?: StyleProp<ViewStyle>;
  /**
   * @zh 是否禁用
   * @en Whether to disable the component
   */
  disabled?: boolean;
  /**
   * @zh 滑动范围最小值
   * @en Minimum value of sliding range
   * @defaultValue 0
   */
  min?: number;
  /**
   * @zh 滑动范围最大值
   * @en Maximum value of sliding range
   * @defaultValue 100
   */
  max?: number;
  /**
   * @zh 是否是范围选择
   * @en Whether to allow range selection
   * @version 2.14.0
   */
  range?: boolean | { draggableBar: boolean };
  /**
   * @zh 步长
   * @en Slide the value of one step
   * @defaultValue 1
   */
  step?: number;
  /**
   * @zh 默认值
   * @en To set default value
   */
  defaultValue?: number | number[];
  /**
   * @zh 值
   * @en To set value
   */
  value?: number | number[];
  /**
   * @zh 选择值变化时触发
   * @en Callback when the user changed the slider's value
   */
  onChange?: (val: number | number[]) => void;
}
