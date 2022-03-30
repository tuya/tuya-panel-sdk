import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface DoubleButtonProps {
  /**
   * 文本数据
   */
  dataSource: {
    left: {
      title: string;
      text: string;
      activeTitle: string;
      activeText: string;
    };
    right: {
      title: string;
      text: string;
      activeTitle: string;
      activeText: string;
    };
  };
  /**
   * 容器高度,默认cx(70)
   */
  height?: number;
  /**
   * 动画中容器高度,默认cx(80)
   */
  activeHeight?: number;
  /**
   * 容器宽度,默认cx(300)
   */
  width?: number;
  /**
   * 容器样式,默认为{
   *  borderRadius: cx(34)
   * }
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 容器是否渐变,默认为true
   */
  isGradient?: true;
  /**
   * 渐变颜色
   */
  gradient?: {
    x1: `${number}%`;
    y1: `${number}%`;
    x2: `${number}%`;
    y2: `${number}%`;
    stops: {
      '0%': string;
      '100%': string;
    };
  };
  /**
   * 按钮激活透明度，默认为1
   */
  activeOpacity?: number;
  /**
   * 动画中按钮样式,默认为{
   *  borderRadius: cx(34)
   * }
   */

  activeButtonView?: StyleProp<ViewStyle>;
  /**
   * 动画中容器高度,默认cx(320)
   */
  activeWidth?: number;
  /**
   * 延迟触发事件，默认为2000ms
   */
  delayLongPressTime?: number;
  /**
   * 动画持续时间，默认为2000ms
   */
  animatedTime?: number;
  /**
   * 钮触发停止时(触发过程中停止),动画回退的时间比例，默认为1，即点击按钮到松手的时间 * 1
   */
  animationOutSpeed?: number;
  /**
   * 标题字体大小，默认为cx(16)
   */
  titleSize?: number;
  /**
   * 标题样式，默认为 {
    color: '#fff',
  }
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * 动画中标题距离上边距位移量，默认为cx(10)
   */
  titleActiveTop?: number;
  /**
   * 文本字体大小，默认为cx(12)
   */
  textSize?: number;
  /**
   * 文本样式，默认为{
     color: 'rgba(255, 255, 255, 0.65)',
    marginTop: cx(5),
  },
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * 动画中文本距离下边距位移量，默认为cx(10)
   */
  textActiveBottom?: number;
  /**
   * 是否展示中间分割线,默认为true
   */
  isLine?: true;
  /**
   * 分割线样式,默认为{
    width: cx(1),
    height: '50%',
  }
   */
  lineStyle?: StyleProp<ImageStyle>;
  /**
   * 动画中触发按钮背景初始宽度百分比，默认为‘75%’
   */
  bgStartWidth?: string;
  /**
   * 动画中触发按钮背景最终宽度百分比，默认为‘200%’
   */
  bgEndWidth?: string;
  /**
   * 动画中触发按钮文字初始位置，默认为‘0%’
   */
  textStartDistance?: string;
  /**
   * 动画中触发按钮文字位移位置，默认为‘50%’
   */
  textEndDistance?: string;
  /**
   * 动画中激活左侧按钮颜色,默认为'#FF536B'
   */
  leftButtonColor?: string;
  /**
   * 动画中激活左侧按钮颜色,默认为'#2856F4'
   */
  rightButtonColor?: string;
  /**
   * 长按左侧按钮达到时间后调用(触发完成时)
   */
  handleLeftLong?: () => void;
  /**
   * 长按右侧按钮达到时间后调用(触发完成时)
   */
  handleRightLong?: () => void;
  /**
   * 左侧按钮触发后点击调用(成功触发后)
   */
  handleLeftButton?: () => void;
  /**
   * 右侧按钮触发后点击调用(成功触发后)
   */
  handleRightButton?: () => void;
  /**
   * 左侧按钮触发时调用(开始触发)
   */
  handleLeftIn?: () => void;
  /**
   * 右侧按钮触发时调用(开始触发)
   */
  handleRightIn?: () => void;
  /**
   * 左侧按钮触发停止时调用(触发过程中停止)
   */
  handleLeftOut?: () => void;
  /**
   * 右侧按钮触发停止时调用(触发过程中停止)
   */
  handleRightOut?: () => void;
}
