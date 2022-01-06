import { StyleProp, ViewStyle } from 'react-native';
/**
 * @title Slider
 */
export interface ScaleSliderProps {
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
   * @zh 刻度尺的颜色以及角标
   * @en The color of the scale and the corner mark
   * @defaultValue 100
   */
  color?: string;
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
  defaultValue?: number;
  /**
   * @zh 值
   * @en To set value
   */
  value?: number;
  /**
   * @zh 选择值变化时触发
   * @en Callback when the user changed the slider's value
   */
  onChange?: (val: number) => void;
  /**
   * @zh 当手势抬起时触发
   * @en Trigger when we see
   */
  onRelease?: (val: number) => void;
  width: number;
}
