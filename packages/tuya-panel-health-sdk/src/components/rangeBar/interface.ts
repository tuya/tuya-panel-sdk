import { StyleProp, ViewStyle } from 'react-native';

interface DataSource {
  range: Array<number>;
  color: string;
  title?: string;
}

export interface RangeBarProps {
  style?: StyleProp<ViewStyle>;
  /**
   * @zh 值
   * @en To set value
   */
  value?: number;
  /**
   * @zh 数据源
   * @en dataSource
   */
  dataSource?: DataSource[];
  /**
   * @zh range之间的间距
   * @en spacing between ranges
   */
  space?: number;
  /**
   * @zh rangeBar的宽度
   * @en Richness of rangeBar
   */
  width?: number;
  /**
   * @zh rangeBar的高度
   * @en height of rangeBar
   */
  height?: number;
  /**
   * @zh 线宽
   * @en Line width
   */
  strokeWidth?: number;
  /**
   * @zh 区间标题颜色
   * @en Section title color
   */
  titleTextColor?: string;
  /**
   * @zh 区间标题间距
   * @en section title spacing
   */
  titleTextOffset?: number;
  /**
   * @zh 刻度文案间距
   * @en Scale copy spacing
   */
  scaleTextOffset?: number;
  /**
   * @zh 刻度文案颜色
   * @en Scale copy color
   */
  scaleTextColor?: string;
  /**
   * @zh 格式化函数
   * @en formatting function
   */
  formatScaleText?: (value: number) => number | string;
}
