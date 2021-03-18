export interface ObjectType {
  /** 通用对象类型 */
  [key: string]: string | number | boolean[];
}

export interface HeaderProps {
  /** 标题 */
  title: string;
  /** 透明度 */
  opacity: any;
  /** 图标颜色 */
  tintColor: string;
  /** 是否支持右侧按钮 */
  rightDisable: boolean;
  setChange: (d: number) => void;
  /** 图标 */
  iconPath: string;
  /** 文字颜色 */
  headerTextColor: string;
}

export interface HeaderViewProps {
  /** 标题 */
  title: string;
  /** 动画之后的标题 */
  animateTitle: string;
  /** 最大高度 */
  maxHeight: number;
  /** 图标颜色 */
  tintColor: string;
  /** 是否支持右侧按钮 */
  rightDisable: boolean;
  /** 动画速度 */
  speed: number;
  content: any;
  /** 图标 */
  iconPath: string;
  /** 文字颜色 */
  headerTextColor: string;
  /** 关闭弹窗 */
  onClose: () => void;
}

export interface HeaderViewState {
  opacity: any;
  isScreening: boolean;
}

export interface TopAnimationProps {
  opacity: any;
  height: any;
  setChange: (d: number) => void;
  content: any;
}
