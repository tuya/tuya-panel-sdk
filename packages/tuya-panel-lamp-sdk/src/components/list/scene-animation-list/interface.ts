import { ReactNode } from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollViewProps,
  ImageProps,
} from 'react-native';

export interface ISceneList {
  key: string | number;
  itemView?: ReactNode;
  img?: ImageProps;
  text?: string;
}

export interface SceneAnimationListProps {
  /**
   * scroll容器属性
   */
  scrollProperty?: ScrollViewProps;
  /**
   * scroll样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * scroll内容器样式
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * 数据列表
   */
  scenesList: ISceneList[];
  /**
   * 卡片样式
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * 文字颜色
   */
  textColor?: string;
  /**
   * 卡片点击时透明度,默认为1
   */
  activeOpacity?: number;
  /**
   * 是否展示动画,默认为true
   */
  isAnimated?: boolean;
  /**
   * 动画一半时间，默认为200ms
   */
  animatedTime?: number;
  /**
   * 卡片缩放比例,默认为0.9
   */
  cardScale?: number;
  /**
   * 卡片内部样式
   */
  sceneItemStyle?: StyleProp<ViewStyle>;
  /**
   * 图片样式
   */
  imgStyle?: ImageStyle;
  /**
   * 文字样式
   */
  textStyle?: TextStyle;
  /**
   * 字体大小
   */
  textSize?: number;
  /**
   * 点击卡片调用
   */
  onPress?: (value: string | number) => void;
  /**
   * 选中卡片边框颜色
   */
  borderColor?: string;
  /**
   * 选中卡片的key，与scenesList中的key相同则为选中，不输入则选中点击的卡片
   */
  activeKey?: string | number;
  /**
   * 动画执行中是否可点击卡片，默认为false
   */
  animatingClick?: boolean;
  /**
   * 动画执行前后卡片颜色,默认为'blue'
   */
  itemStartColor?: string;
  /**
   * 动画执行中卡片颜色,默认为'green'
   */
  itemAnimatedColor?: string;
  /**
   * 选中卡片边框宽度
   */
  borderWidth?: number;
}
