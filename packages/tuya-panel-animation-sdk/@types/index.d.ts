import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

declare module '@tuya-smart/tuya-panel-animation-sdk' {
  // CountDown
  export interface CountDownProps {
    /**
     * @language zh-CN
     * @description 倒计时时间，单位是 s
     * @defaultValue 150
     */
    /**
     * @language en-US
     * @description Countdown time, unit is "s".
     * @defaultValue 150
     */
    countdownLeft: number;
    /**
     * @language zh-CN
     * @description 是否显示倒计时
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to display countdown
     * @defaultValue true
     */
    countDownShow: boolean;
    /**
     * @language zh-CN
     * @description 倒计时开始时触发
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Triggered when the countdown starts
     * @defaultValue () => {}
     */
    startCountdown?: () => void;
    /**
     * @language zh-CN
     * @description 倒计时结束时触发
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Triggered at the end of the countdown
     * @defaultValue () => {}
     */
    endCountdown?: () => void;
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
     * @description 显示倒计时时的背景颜色
     * @defaultValue 'rgba(0,0,0,0.6)'
     */
    /**
     * @language en-US
     * @description Display the background color when countdown
     * @defaultValue 'rgba(0,0,0,0.6)'
     */
    activeBgColor?: string;
    /**
     * @language zh-CN
     * @description 显示图标时背景颜色
     * @defaultValue 'rgba(0,0,0,0.5)'
     */
    /**
     * @language en-US
     * @description The background color when the icon is displayed
     * @defaultValue 'rgba(0,0,0,0.5)'
     */
    inactiveBgColor?: string;
    /**
     * @language zh-CN
     * @description 为倒计时时显示的文案
     * @defaultValue Click to end
     */
    /**
     * @language en-US
     * @description Is the copy displayed during countdown
     * @defaultValue Click to end
     */
    clickEndText?: string;
    /**
     * @language zh-CN
     * @description 为图标时显示的文案
     * @defaultValue Countdown
     */
    /**
     * @language en-US
     * @description Copywriting displayed when icon
     * @defaultValue Countdown
     */
    countdownText?: string;
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
     * @description 图标颜色
     * @defaultValue '#fff'
     */
    /**
     * @language en-US
     * @description Icon color
     * @defaultValue '#fff'
     */
    color?: string;
    /**
     * @language zh-CN
     * @description 图标尺寸
     * @defaultValue { width: 24, height: 24 }
     */
    /**
     * @language en-US
     * @description Icon size
     * @defaultValue
     */
    size?: {
      width?: number;
      height?: number;
    };
    /**
     * @language zh-CN
     * @description 倒计时图标路径
     * @defaultValue 'M841.142857 1024h-658.285714a36.571429 36.571429 0 0 1-35.986286-29.988571L146.285714 987.428571V877.714286a366.153143 366.153143 0 0 1 365.714286-365.714286 366.226286 366.226286 0 0 1-365.714286-365.714286V36.571429a36.571429 36.571429 0 0 1 36.571429-36.571429h658.285714a36.571429 36.571429 0 0 1 36.571429 36.571429V146.285714a366.153143 366.153143 0 0 1-365.714286 365.714286 365.714286 365.714286 0 0 1 365.714286 349.842286V987.428571a36.571429 36.571429 0 0 1-29.988572 35.986286zM512 585.142857a292.132571 292.132571 0 0 0-292.571429 277.942857V950.857143h585.142858v-73.142857a292.571429 292.571429 0 0 0-292.571429-292.571429zM219.428571 73.142857v73.142857a292.571429 292.571429 0 1 0 585.142858 0V73.142857z m117.028572 789.942857a36.571429 36.571429 0 0 1-35.108572-46.811428 218.770286 218.770286 0 0 1 124.781715-140.507429 36.571429 36.571429 0 1 1 28.672 67.291429 146.285714 146.285714 0 0 0-83.309715 93.842285 36.571429 36.571429 0 0 1-35.035428 26.185143z'
     */
    /**
     * @language en-US
     * @description Countdown icon path
     * @defaultValue 'M841.142857 1024h-658.285714a36.571429 36.571429 0 0 1-35.986286-29.988571L146.285714 987.428571V877.714286a366.153143 366.153143 0 0 1 365.714286-365.714286 366.226286 366.226286 0 0 1-365.714286-365.714286V36.571429a36.571429 36.571429 0 0 1 36.571429-36.571429h658.285714a36.571429 36.571429 0 0 1 36.571429 36.571429V146.285714a366.153143 366.153143 0 0 1-365.714286 365.714286 365.714286 365.714286 0 0 1 365.714286 349.842286V987.428571a36.571429 36.571429 0 0 1-29.988572 35.986286zM512 585.142857a292.132571 292.132571 0 0 0-292.571429 277.942857V950.857143h585.142858v-73.142857a292.571429 292.571429 0 0 0-292.571429-292.571429zM219.428571 73.142857v73.142857a292.571429 292.571429 0 1 0 585.142858 0V73.142857z m117.028572 789.942857a36.571429 36.571429 0 0 1-35.108572-46.811428 218.770286 218.770286 0 0 1 124.781715-140.507429 36.571429 36.571429 0 1 1 28.672 67.291429 146.285714 146.285714 0 0 0-83.309715 93.842285 36.571429 36.571429 0 0 1-35.035428 26.185143z'
     */
    countDownIcon?: string;
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

  export class CountDown extends React.Component<CountDownProps> {}

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
    startAnimated?: bool;
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
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue () => {}
     */
    renderContent?: () => void;
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
    visible: boolean;
    /**
     * @language zh-CN
     * @description 渲染自定义内容
     * @defaultValue () => ( <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }} /> )
     */
    /**
     * @language en-US
     * @description Render custom content
     * @defaultValue () => ( <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }} /> )
     */
    renderContent?: () => React.ReactNode;
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
    onStateChange?: () => void;
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
}
