import * as React from 'react';
import { StyleProp, ViewStyle, ColorPropType, ImageStyle } from 'react-native';
import { IconFont } from 'tuya-panel-kit';

  // diffusion
  export interface DiffusionProps {
    /**
     * @language zh-CN
     * @description 波纹颜色
     * @defaultValue 'rgba(255,255,255,0.5)'
     */
    /**
     * @language en-US
     * @description Ripple color
     * @defaultValue 'rgba(255,255,255,0.5)'
     */
    color?: string;
    /**
     * @language zh-CN
     * @description 最内圈波纹半径大小
     * @defaultValue 50
     */
    /**
     * @language en-US
     * @description The radius of the innermost ring ripple
     * @defaultValue 50
     */
    radius?: number;
    /**
     * @language zh-CN
     * @description 扩散后最大值波纹半径大小
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description Maximum ripple radius after diffusion
     * @defaultValue 100
     */
    maxRadius?: number;
    /**
     * @language zh-CN
     * @description 波纹宽度大小
     * @defaultValue 5
     */
    /**
     * @language en-US
     * @description Ripples width
     * @defaultValue 5
     */
    width?: number;
    /**
     * @language zh-CN
     * @description 波纹循环一次条数
     * @defaultValue 2
     */
    /**
     * @language en-US
     * @description Number of ripples at a time
     * @defaultValue 2
     */
    number?: number;
    /**
     * @language zh-CN
     * @description 波纹间隔多久出现
     * @defaultValue 1000
     */
    /**
     * @language en-US
     * @description How often does the ripple appear
     * @defaultValue 1000
     */
    mainDelay?: number;
    /**
     *  间隔多久进行循环，为0代表持续循环
     */
    /**
     * @language zh-CN
     * @description 间隔多久进行循环，0 代表持续循环
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description How long is the interval to cycle, 0 means continuous cycle
     * @defaultValue 0
     */
    intervalTime?: number;
    /**
     * @language zh-CN
     * @description 是否开始执行动画
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to start the animation
     * @defaultValue true
     */
    startAnimated?: boolean;
    /**
     * @language zh-CN
     * @description 内容样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 圆圈样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Circle style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    circleStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 渲染自定义内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue null
     */
    renderContent?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 2000, delay: 0, isInteraction: true, useNativeDriver: false }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 2000, delay: 0, isInteraction: true, useNativeDriver: false }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  export class Diffusion extends React.Component<DiffusionProps> {}

  // Drawer

  export interface DrawerProps {
    /**
     * @language zh-CN
     * @description 是否可见
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Is it visible
     * @defaultValue false
     */
    visible?: boolean;
    /**
     * @language zh-CN
     * @description 渲染自定义内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue null
     */
    renderContent?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 遮罩层样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Mask layer style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    maskStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 弹出层样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Pop-up layer style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    drawerStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 最外层容器样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Outer container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 抽屉方向
     * @defaultValue 'left'
     */
    /**
     * @language en-US
     * @description Drawer direction
     * @defaultValue 'left'
     */
    placement?: 'left' | 'right' | 'top' | 'bottom';
    /**
     * @language zh-CN
     * @description 点击抽屉关闭回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Click the drawer to close the callback
     * @defaultValue () => {}
     */
    onClose?: () => void;
    /**
     * @language zh-CN
     * @description 点击抽屉开启或者关闭后的回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Click the callback after the drawer is opened or closed
     * @defaultValue () => {}
     */
    onStateChange?: (visible?: boolean) => void;
    /**
     *  Drawer宽度
     */
    /**
     * @language zh-CN
     * @description 抽屉宽度
     * @defaultValue winWidth / 2
     */
    /**
     * @language en-US
     * @description Drawer width
     * @defaultValue winWidth / 2
     */
    width?: number;
    /**
     * @language zh-CN
     * @description 抽屉高度，一般在 placement 为 top 或 bottom 时使用
     * @defaultValue winHeight
     */
    /**
     * @language en-US
     * @description Drawer height, generally used when placement is top or bottom
     * @defaultValue winHeight
     */
    height?: number;
    /**
     * @language zh-CN
     * @description 点击蒙层是否允许关闭
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Click whether the mask is allowed to close
     * @defaultValue true
     */
    maskClosable?: boolean;
    /**
     * @language zh-CN
     * @description 遮罩是否可见
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether the mask is visible
     * @defaultValue true
     */
    maskVisible?: boolean;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
    };
  }

  export class Drawer extends React.Component<DrawerProps> {}

  // JitterAlert

  export interface JitterAlertProps extends IconFont {
    /**
     * @language zh-CN
     * @description 是否开始抖动动画
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to start shaking animation
     * @defaultValue true
     */
    active?: boolean;
    /**
     * @language zh-CN
     * @description 抖动左右摆动角度
     * @defaultValue 15
     */
    /**
     * @language en-US
     * @description Jitter left and right swing angle
     * @defaultValue 15
     */
    degree?: number;
    /**
     * @language zh-CN
     * @description 抖动动效循环时间间隔，单位:ms
     * @defaultValue 200
     */
    /**
     * @language en-US
     * @description Jitter motion cycle time interval, unit: ms
     * @defaultValue 200
     */
    interval?: number;
    /**
     * @language zh-CN
     * @description 抖动图标的颜色
     * @defaultValue '#000'
     */
    /**
     * @language en-US
     * @description The color of the dither icon
     * @defaultValue '#000'
     */
    color?: ColorPropType;
    /**
     * @language zh-CN
     * @description 内容样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 图标路径
     * @defaultValue 'M512 922.24c44.16 0 79.36-35.2 79.36-80H432.64c0 45.44 35.2 80 79.36 80z m260.48-260.48V453.76C772.48 328.96 684.8 224 569.6 197.12v-26.24c0-29.44-16-55.04-43.52-61.44C486.4 99.84 454.4 129.92 454.4 169.6v27.52C339.2 224 251.52 328.96 251.52 453.76v208L172.8 743.04v40.32h678.4v-40.32l-78.72-81.28z'
     */
    /**
     * @language en-US
     * @description Icon path
     * @defaultValue 'M512 922.24c44.16 0 79.36-35.2 79.36-80H432.64c0 45.44 35.2 80 79.36 80z m260.48-260.48V453.76C772.48 328.96 684.8 224 569.6 197.12v-26.24c0-29.44-16-55.04-43.52-61.44C486.4 99.84 454.4 129.92 454.4 169.6v27.52C339.2 224 251.52 328.96 251.52 453.76v208L172.8 743.04v40.32h678.4v-40.32l-78.72-81.28z'
     */
    path?: string;
    /**
     * @language zh-CN
     * @description 图标点击触发事件
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Icon click trigger event
     * @defaultValue () => {}
     */
    onPress?: () => void;
    /**
     * @language zh-CN
     * @description 图标尺寸
     * @defaultValue 24
     */
    /**
     * @language en-US
     * @description Icon size
     * @defaultValue 24
     */
    size?: number;
    /**
     * @language zh-CN
     * @description 按下按钮的透明度
     * @defaultValue 0.8
     */
    /**
     * @language en-US
     * @description Transparency of the button pressed
     * @defaultValue 0.8
     */
    activeOpacity?: number;
    /**
     * @language zh-CN
     * @description 自定义子组件
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Custom subcomponent
     * @defaultValue null
     */
    renderContent?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  export class JitterAlert extends React.Component<JitterAlertProps> {}

  // ModeChange

  export interface ModeChangeProps {
    /**
     * @language zh-CN
     * @description 图片
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Image
     * @defaultValue null
     */
    imgUrl: number | string;
    /**
     * @language zh-CN
     * @description 图片样式
     * @types <a target="_blank" href="https://reactnative.dev/docs/image-style-props">StyleProp<ImageStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The image style
     * @types <a target="_blank" href="https://reactnative.dev/docs/image-style-props">StyleProp<ImageStyle></a>
     * @defaultValue null
     */
    imgStyle?: StyleProp<ImageStyle>;
    /**
     * @language zh-CN
     * @description 内容样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 初始化加载是否使用动画
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to use animation for initial loading
     * @defaultValue true
     */
    useInitAnimated?: boolean;
    /**
     * @language zh-CN
     * @description 第一次加载延迟时间
     * @defaultValue 400
     */
    /**
     * @language en-US
     * @description First load delay time
     * @defaultValue 400
     */
    initDelay?: number;
    /**
     * @language zh-CN
     * @description 是否禁用
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether to disable
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @language zh-CN
     * @description 动画切换时向上移动的距离
     * @defaultValue 20
     */
    /**
     * @language en-US
     * @description The distance to move up when the animation is switched
     * @defaultValue 20
     */
    moveTop?: number;
    /**
     * @language zh-CN
     * @description 渲染自定义内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue null
     */
    renderContent?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 动画开始时回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Callback when the animation starts
     * @defaultValue () => {}
     */
    onStartAnimted?: () => void;
    /**
     * @language zh-CN
     * @description 动画结束时回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Callback when the animation ends
     * @defaultValue () => {}
     */
    onEndAnimted?: () => void;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.linear, duration: 400, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  export interface ModeChangeScaleProps {
    /**
     * @language zh-CN
     * @description 图片
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Image
     * @defaultValue null
     */
    imgUrl: number | string;
    /**
     * @language zh-CN
     * @description 图片样式
     * @types <a target="_blank" href="https://reactnative.dev/docs/image-style-props">StyleProp<ImageStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The image style
     * @types <a target="_blank" href="https://reactnative.dev/docs/image-style-props">StyleProp<ImageStyle></a>
     * @defaultValue null
     */
    imgStyle?: StyleProp<ImageStyle>;
    /**
     * @language zh-CN
     * @description 内容样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue null
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 初始化加载是否使用动画
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to use animation for initial loading
     * @defaultValue true
     */
    useInitAnimated?: boolean;
    /**
     * @language zh-CN
     * @description 第一次加载延迟时间
     * @defaultValue 400
     */
    /**
     * @language en-US
     * @description First load delay time
     * @defaultValue 400
     */
    initDelay?: number;
    /**
     * @language zh-CN
     * @description 是否禁用
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether to disable
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @language zh-CN
     * @description 动画切换时向上移动的距离
     * @defaultValue 20
     */
    /**
     * @language en-US
     * @description The distance to move up when the animation is switched
     * @defaultValue 20
     */
    moveTop?: number;
    /**
     * @language zh-CN
     * @description 渲染自定义内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue null
     */
    renderContent?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 动画开始时回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Callback when the animation starts
     * @defaultValue () => {}
     */
    onStartAnimted?: () => void;
    /**
     * @language zh-CN
     * @description 动画结束时回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Callback when the animation ends
     * @defaultValue () => {}
     */
    onEndAnimted?: () => void;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 500, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 500, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  export class ModeChange extends React.Component<ModeChangeProps> {
    static Move: React.ElementType<ModeChangeProps>;
    static Scale: React.ElementType<ModeChangeScaleProps>;
  }

  // NumberChange

  export interface NumberChangeProps {
    /**
     * @language zh-CN
     * @description 当前值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description The current value
     * @defaultValue 0
     */
    value?: number;

    /**
     * @language zh-CN
     * @description 是否使用 UnitText 组件
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether to use UnitText component
     * @defaultValue false
     */
    useUnitText?: boolean;
    /**
     * @language zh-CN
     * @description 字体颜色
     * @defaultValue '#000'
     */
    /**
     * @language en-US
     * @description Text color
     * @defaultValue '#000'
     */
    color?: string;
    /**
     * @language zh-CN
     * @description 字体大小
     * @defaultValue 16
     */
    /**
     * @language en-US
     * @description Font size
     * @defaultValue 16
     */
    size?: number;
    /**
     * @language zh-CN
     * @description 内容样式
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue { justifyContent: 'center', alignItems: 'center' }
     */
    /**
     * @language en-US
     * @description Container style
     * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
     * @defaultValue { justifyContent: 'center', alignItems: 'center' }
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 初始化加载是否使用动画
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to use animation for initial loading
     * @defaultValue true
     */
    useInitAnimated?: boolean;
    /**
     * @language zh-CN
     * @description 第一次加载延迟时间
     * @defaultValue 400
     */
    /**
     * @language en-US
     * @description First load delay time
     * @defaultValue 400
     */
    initDelay?: number;
    /**
     * @language zh-CN
     * @description 是否禁用
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether to disable
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * @language zh-CN
     * @description 动画配置项
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 800, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    /**
     * @language en-US
     * @description Animation configuration items
     * @defaultValue { easing: Easing.bezier(0, 0, 0.25, 1), duration: 800, delay: 0, isInteraction: true, useNativeDriver: true }
     */
    animationConfig?: {
      easing?: (...args: any[]) => any;
      duration?: number;
      delay?: number;
      isInteraction?: boolean;
      useNativeDriver?: boolean;
    };
  }

  export class NumberChange extends React.Component<NumberChangeProps> {}

  // WaveView

export interface WaveViewProps {
  /**
   * @language zh-CN
   * @description 水波高度（百分比）
   * @defaultValue 50
   */
  /**
   * @language en-US
   * @description Water wave height (percentage)
   * @defaultValue 50
   */
  H?: number;
  /**
   * @language zh-CN
   * @description 水波数组: [{ A: 波峰高度, T: 单组波峰+波谷长度, fill: 填充色 }]
   * @defaultValue []
   */
  /**
   * @language en-US
   * @description Wave array: [{ A: height of crest, T: length of single group of crest + trough, fill: fill color }]
   * @defaultValue []
   */
  waveParams?: { A: number; T: number; fill: string }[];
  /**
   * @language zh-CN
   * @description 内容样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue { justifyContent: 'center', alignItems: 'center' }
   */
  /**
   * @language en-US
   * @description Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue { justifyContent: 'center', alignItems: 'center' }
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 是否挂载后立刻运动
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to exercise immediately after mounting
   * @defaultValue true
   */
  animated?: boolean;
  /**
   * @language zh-CN
   * @description 动画配置项
   * @defaultValue { easing: Easing.linear, duration: 5000, delay: 2000, isInteraction: true, useNativeDriver: true }
   */
  /**
   * @language en-US
   * @description Animation configuration items
   * @defaultValue { easing: Easing.linear, duration: 5000, delay: 2000, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}
export class WaveView extends React.Component<WaveViewProps> {}

export interface ParticleProps {
  /**
   * @language zh-CN
   * @description 容器宽度
   * @defaultValue 375
   */
  /**
   * @language en-US
   * @description Container width
   * @defaultValue 375
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 容器高度
   * @defaultValue 375
   */
  /**
   * @language en-US
   * @description Container height
   * @defaultValue 375
   */
  height?: number;
  /**
   * @language zh-CN
   * @description 内容样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue {}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 动画执行一次的持续时间
   * @defaultValue 3000
   */
  /**
   * @language en-US
   * @description The duration of the animation execution once
   * @defaultValue 3000
   */
  duration?: number;
  /**
   * @language zh-CN
   * @description 动画是否执行
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether the animation is executed
   * @defaultValue true
   */
  active?: boolean;
  /**
   * @language zh-CN
   * @description 中间空白的部分的半径
   * @defaultValue 50
   */
  /**
   * @language en-US
   * @description The radius of the blank part in the middle
   * @defaultValue 50
   */
  radius?: number;
  /**
   * @language zh-CN
   * @description 粒子的运动形式 diffuse: 从中间向外扩散, absorb: 从外向中间吸引
   * @defaultValue diffuse
   */
  /**
   * @language en-US
   * @description The motion form of particles diffuse: diffuse outward from the middle, absorb: attract from the outside to the middle
   * @defaultValue diffuse
   */
  type?: 'diffuse' | 'absorb';
  /**
   * @language zh-CN
   * @description 粒子的颜色
   * @defaultValue #fff
   */
  /**
   * @language en-US
   * @description Particle color
   * @defaultValue #fff
   */
  color?: string | string[];
  /**
   * @language zh-CN
   * @description 粒子的半径
   * @defaultValue 2
   */
  /**
   * @language en-US
   * @description The radius of the particle
   * @defaultValue 2
   */
  dotRadius?: number | number[];
  /**
   * @language zh-CN
   * @description 粒子的总数量
   * @defaultValue 50
   */
  /**
   * @language en-US
   * @description Total number of particles
   * @defaultValue 50
   */
  amount?: number;
}
export class Particle extends React.Component<ParticleProps> {}
