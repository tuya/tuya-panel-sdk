import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
// Motion
export interface MotionProps {
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
   * @description 是否显示内容
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Display content?
   * @defaultValue undefined
   */
  show?: boolean;
  /**
   * @language zh-CN
   * @description 自定义内容
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Custom content
   * @defaultValue undefined
   */
  children?: React.ReactNode;
  /**
   * @language zh-CN
   * @description 动画显示时长
   * @defaultValue 300
   */
  /**
   * @language en-US
   * @description Animation display duration
   * @defaultValue 300
   */
  showDuration?: number;
  /**
   * @language zh-CN
   * @description 动画隐藏时长
   * @defaultValue 300
   */
  /**
   * @language en-US
   * @description Animation hide duration
   * @defaultValue 300
   */
  hideDuration?: number;
  /**
   * @language zh-CN
   * @description 动画显示回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Animation display callback
   * @defaultValue () => {}
   */
  onShow?: () => void;
  /**
   * @language zh-CN
   * @description 动画隐藏回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Animation hide callback
   * @defaultValue () => {}
   */
  onHide?: () => void;
  /**
   * @language zh-CN
   * @description 动画配置参数
   * @defaultValue { duration: 300, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  /**
   * @language en-US
   * @description Animation configuration parameters
   * @defaultValue { duration: 300, delay: 0, isInteraction: true, useNativeDriver: true }
   */
  animationConfig?: {
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}
export interface MotionFadeProps extends MotionProps {
  /**
   * @language zh-CN
   * @description 动画不透明度
   * @defaultValue 1
   */
  /**
   * @language en-US
   * @description Animation opacity
   * @defaultValue 1
   */
  fadeOpacity?: number;
}
export interface MotionPullUpProps extends MotionProps {
  /**
   * @language zh-CN
   * @description 下拉的高度
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Height of pull down
   * @defaultValue undefined
   */
  dropHeight?: number;
}
export interface MotionScaleFadeInProps extends MotionProps {
  /**
   * @language zh-CN
   * @description 初始缩放倍数
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Initial zoom factor
   * @defaultValue 0
   */
  initScale?: number;
  /**
   * @language zh-CN
   * @description 动画结束缩放倍数
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Animation end zoom multiple
   * @defaultValue 0
   */
  finalScale?: number;
  /**
   * @language zh-CN
   * @description 是否竖直居中
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Is it vertically centered
   * @defaultValue true
   */
  isAlign?: boolean;
  /**
   * @language zh-CN
   * @description 向左平移的距离，tips 气泡模拟 transform-origin 属性
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The distance to the left, the tips bubble simulates the transform origin attribute
   * @defaultValue null
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 向上平移的距离，tips气泡模拟transform-origin属性
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Up translation distance, tips bubble simulates transform origin attribute
   * @defaultValue null
   */
  height?: number;
}
export interface MotionScalePullDownProps extends MotionProps {
  /**
   * @language zh-CN
   * @description 初始缩放倍数
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Initial zoom factor
   * @defaultValue 0
   */
  initScale?: number;
  /**
   * @language zh-CN
   * @description 是否竖直居中
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Is it vertically centered
   * @defaultValue true
   */
  isAlign?: boolean;
}
export interface DatePickerViewProps {
  /**
   * @language zh-CN
   * @description 弹框标题
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description modal title
   * @defaultValue string
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 开始时间标签
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description startLabel label
   * @defaultValue string
   */
  startLabel?: React.ReactNode | string;
  /**
   * @language zh-CN
   * @description 结束时间标签
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description endLabel label
   * @defaultValue string
   */
  endLabel?: React.ReactNode | string;
  /**
   * @language zh-CN
   * @description 开始时间
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description startDate
   * @defaultValue string
   */
  startDate: string;
  /**
   * @language zh-CN
   * @description 结束时间
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description endDate
   * @defaultValue string
   */
  endDate: string;
  /**
   * @language zh-CN
   * @description 模式
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description mode
   * @defaultValue string
   */
  mode?: string;
  /**
   * @language zh-CN
   * @description 取消文案
   * @defaultValue "Cancel"
   */
  /**
   * @language en-US
   * @description Cancel Text
   * @defaultValue "Cancel"
   */
  cancelText?: string; // 取消文案
  /**
   * @language zh-CN
   * @description 确认文案
   * @defaultValue "Confirm"
   */
  /**
   * @language en-US
   * @description Confirm Text
   * @defaultValue "Confirm"
   */
  confirmText?: string; // 确定文案
  /**
   * @language zh-CN
   * @description 占位文案
   * @defaultValue "请选择日期"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "Please select date"
   */
  placeholder?: string; //
  /**
   * @language zh-CN
   * @description 开始时间提示
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description start date tip
   * @defaultValue string
   */
  startDateTip?: string;
  /**
   * @language zh-CN
   * @description 时间范围限度提示
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description date limit tip
   * @defaultValue string
   */
  dateLimitTip?: string;
  /**
   * @language zh-CN
   * @description modal 弹出内容的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Content style of modal pop-up
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 副标题
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description SubTitle
   * @defaultValue ''
   */
  subTitle?: string;
  /**
   * @language zh-CN
   * @description Popup 头部标题样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Popup header title style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  titleTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description Popup 头部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Popup header style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  titleWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 取消文案样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Cancellation text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  cancelTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 确认文案样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Confirmation text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  confirmTextStyle?: StyleProp<TextStyle>;
  // /**
  //  * @language zh-CN
  //  * @description 自定义底部
  //  * @defaultValue null
  //  */
  // /**
  //  * @language en-US
  //  * @description Custom footer
  //  * @defaultValue null
  //  */
  // footer?: React.ReactNode;
  /**
   * @language zh-CN
   * @description 底部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Footer container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue {}
   */
  footerWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description footer 容器显示状态，显示全部、只显示确认、只显示取消
   * @defaultValue 'both'
   */
  /**
   * @language en-US
   * @description footer container display status.
   * @defaultValue 'both'
   */
  footerType?: 'both' | 'singleConfirm' | 'singleCancel';
  /**
   * @language zh-CN
   * @description 动画类型
   * @defaultValue "PullUp"
   */
  /**
   * @language en-US
   * @description Animation type
   * @defaultValue "PullUp"
   */
  motionType?: 'none' | 'ScaleFadeIn' | 'Fade' | 'PullUp' | 'ScalePullDown';
  /**
   * @language zh-CN
   * @description 动画配置
   * @types <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2438">MotionScaleFadeInProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2430">MotionFadeProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2434">MotionPullUpProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2446">MotionScalePullDownProps</a>
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Painting configuration
   * @types <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2438">MotionScaleFadeInProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2430">MotionFadeProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2434">MotionPullUpProps</a> | <a target="_blank" href="https://github.com/tuya/DefinitelyTyped/blob/299b2dd5a2ac708ca9464aba3685300acb7c865c/types/tuya-panel-kit/index.d.ts#L2446">MotionScalePullDownProps</a>
   * @defaultValue {}
   */
  motionConfig?:
    | MotionScaleFadeInProps
    | MotionFadeProps
    | MotionPullUpProps
    | MotionScalePullDownProps;
  /**
   * @language zh-CN
   * @description 是否垂直居中
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Is it vertically centered
   * @defaultValue false
   */
  isAlign?: boolean;
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description component styles
   * @defaultValue 'null'
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 确定事件回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback of confirm
   * @defaultValue () => {}
   */
  onConfirm: () => void;
  /**
   * @language zh-CN
   * @description 取消事件回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback of cancel
   * @defaultValue () => {}
   */
  onCancel: () => void;
  /**
   * @language zh-CN
   * @description 时间变化回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback of date change
   * @defaultValue () => {}
   */
  onDateChange: ({ startDate, endDate }: { startDate: any; endDate: any }) => void;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle> | undefined;
  iconColor?: any;
}
export interface DatePickerViewState {
  /**
   * @language zh-CN
   * @description 占位文案
   * @defaultValue "请选择"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "请选择"
   */
  placeholder?: string; //
  /**
   * @language zh-CN
   * @description 占位文案
   * @defaultValue "请选择"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "请选择"
   */
  currentOperationIndex: number; //
  dateRange?: [Date | string, Date | string]; // 时间范围
  startDate?: Date | string; // 开始时间
  endDate?: Date | string; // 结束时间
  // currentDate: Date;
  maxDate: Date;
}
export interface NextProps {
  startDate?: Date | string;
  endDate?: Date | string;
}
export type dateString = string | number;
