import { StyleProp, ViewStyle } from 'react-native';

/**
 * @title Progress
 */
export interface ProgressProps {
  style?: StyleProp<ViewStyle>;

  /**
   * @zh 显示步骤进度条
   * @en Show step progress
   */
  steps?: number;

  /**
   * @zh 进度条颜色，优先级高于 `status`。传入对象时，会显示渐变色进度条。
   * @en Progress color, priority is higher than `status`
   */
  color?: string;
  /**
   * @zh 剩余进度条颜色。
   * @en The rest of progress bar color.
   */
  trailColor?: string;
  /**
   * @zh 百分比
   * @en percent
   * @defaultValue 0
   */
  percent: number;
  /**
   * @zh 进度条线的宽度
   * @en The stroke width of Progress
   */
  strokeWidth?: number;
  /**
   * @zh 进度条的宽度。
   * @en The Progress width
   */
  width?: string | number;
}
