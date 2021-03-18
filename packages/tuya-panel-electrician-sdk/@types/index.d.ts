import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare module '@tuya/tuya-panel-electrician-sdk' {
  export interface CountdownProps {
    /**
     * @language zh-CN
     * @description dp点标识符
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description DP dot identifier
     * @defaultValue null
     */
    dpCode: string;
    /**
     * @language zh-CN
     * @description 倒计时当前值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Countdown Current Value
     * @defaultValue 0
     */
    value: number;
    /**
     * @language zh-CN
     * @description 是否模拟时钟
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Analog clock or not
     * @defaultValue false
     */
    counting: boolean;
    /**
     * @language zh-CN
     * @description 倒计时可支持到最大单位
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description Countdown supports up to maximum units
     * @defaultValue ''
     */
    timeUnit: string;
    /**
     * @language zh-CN
     * @description 计数展示格式
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Counting display format
     * @defaultValue 0
     */
    formatString: string = `{0}:{1}:{2}`;
    /**
     * @language zh-CN
     * @description 倒计时文案样式
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Countdown copy style
     * @defaultValue 0
     */
    countdownTextStyle: any;
  }

  export class CountdownView extends React.Component<CountdownProps> {}

  type TimeUnitType = 's' | 'min' | 'hour';
  type CountdownType = 'm' | 'hm';
  export interface CountdownListProps {
    /**
     * @language zh-CN
     * @description dp标识符集
     * @defaultValue []
     */
    /**
     * @language en-US
     * @description Set of DP identifiers
     * @defaultValue []
     */
    dpCodes: string[];
    /**
     * @language zh-CN
     * @description 时间单位
     * @defaultValue hour
     */
    /**
     * @language en-US
     * @description Unit of time
     * @defaultValue hour
     */
    timeUnit: Omit<TimeUnitType, 'hour'>;
    /**
     * @language zh-CN
     * @description 倒计时数据最小单位
     * @defaultValue m
     */
    /**
     * @language en-US
     * @description Minimal unit of countdown data
     * @defaultValue m
     */
    countdownType: CountdownType;
  }

  export class CountdownList extends React.Component<CountdownListProps> {}

  export interface SocketViewProps {
    /**
     * @language zh-CN
     * @description 插座按钮样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket button style
     * @defaultValue null
     */
    socketWrapperStyle: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 插座按钮图标
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png'
     */
    /**
     * @language en-US
     * @description Socket button icon
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png'
     */
    socketBackgroundImage:
      | string
      | number = 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png';
    /**
     * @language zh-CN
     * @description 插座按钮图标大小
     * @defaultValue { width: 240, height: 240 }
     */
    /**
     * @language en-US
     * @description Socket button icon size
     * @defaultValue { width: 240, height: 240 }
     */
    socketBackgroundImageSize: { [key: string]: number } = { width: 240, height: 240 };
    /**
     * @language zh-CN
     * @description 插座图标
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png'
     */
    /**
     * @language en-US
     * @description Socket button icon
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png'
     */
    socketImage:
      | string
      | number = 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png';
    /**
     * @language zh-CN
     * @description 插座图标大小
     * @defaultValue { width: 140, height: 140 }
     */
    /**
     * @language en-US
     * @description Socket icon size
     * @defaultValue { width: 140, height: 140 }
     */
    socketImageSize: { [key: string]: number } = { width: 140, height: 140 };
    /**
     * @language zh-CN
     * @description 插座图标颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Color of socket icon
     * @defaultValue null
     */
    socketImageTintColor: string;
    /**
     * @language zh-CN
     * @description 按钮回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Button callback
     * @defaultValue () => {}
     */
    onPress: () => void;
  }

  export class SocketView extends React.Component<SocketViewProps> {}

  export interface AnimatedHeaderProps {
    /**
     * @language zh-CN
     * @description 标题
     * @defaultValue 'title'
     */
    /**
     * @language en-US
     * @description title
     * @defaultValue 'title'
     */
    title: string;
    /**
     * @language zh-CN
     * @description 动画之后的标题
     * @defaultValue 'screening'
     */
    /**
     * @language en-US
     * @description The title after the animation
     * @defaultValue 'screening'
     */
    animateTitle: string;
    /**
     * @language zh-CN
     * @description 最大高度
     * @defaultValue 300
     */
    /**
     * @language en-US
     * @description max-height
     * @defaultValue 300
     */
    maxHeight: number;
    /**
     * @language zh-CN
     * @description 图标颜色
     * @defaultValue '#272929'
     */
    /**
     * @language en-US
     * @description Icon color
     * @defaultValue '#272929'
     */
    tintColor: string;
    /**
     * @language zh-CN
     * @description 是否支持右侧按钮
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether the right button is supported
     * @defaultValue false
     */
    rightDisable: boolean;
    /**
     * @language zh-CN
     * @description 动画速度
     * @defaultValue 200
     */
    /**
     * @language en-US
     * @description Speed of the animation
     * @defaultValue 200
     */
    speed: number;
    /**
     * @language zh-CN
     * @description 内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description content
     * @defaultValue null
     */
    content: any;
    /**
     * @language zh-CN
     * @description 图标
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description icon
     * @defaultValue null
     */
    iconPath: string;
    /**
     * @language zh-CN
     * @description 文字颜色
     * @defaultValue '#333333'
     */
    /**
     * @language en-US
     * @description Text color
     * @defaultValue '#333333'
     */
    headerTextColor: string;
    /**
     * @language zh-CN
     * @description 关闭弹窗
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Close Windows
     * @defaultValue null
     */
    onClose: () => void;
  }

  export class AnimatedHeader extends React.Component<AnimatedHeaderProps> {}

  export interface CurtainProps {
    /**
     * @language zh-CN
     * @description 窗帘样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The curtain style
     * @defaultValue null
     */
    style: StyleProp<any>;
    /**
     * @language zh-CN
     * @description 窗帘类型
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The curtain type
     * @defaultValue null
     */
    curtainType: CurtainType;
    /**
     * @language zh-CN
     * @description 窗帘风格 '扁平' | '拟物'
     * @defaultValue trietex
     */
    /**
     * @language en-US
     * @description The curtain style 'flat' | 'quasiphysical'
     * @defaultValue trietex
     */
    styleType: StyleType;
    /**
     * @language zh-CN
     * @description  窗帘当前位置
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Current position of curtain
     * @defaultValue 0
     */
    value: number;
    /**
     * @language zh-CN
     * @description 是否禁用
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Whether to disable
     * @defaultValue null
     */
    disabled: boolean;
    /**
     * @language zh-CN
     * @description 当前控制状态
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Current control state
     * @defaultValue null
     */
    control: ControlType;
    /**
     * @language zh-CN
     * @description 运行全程时间 单位ms
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The whole operation time unit is ms
     * @defaultValue null
     */
    totalTime: number;
    /**
     * @language zh-CN
     * @description 窗帘页图片
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Curtain page picture
     * @defaultValue null
     */
    curtainCeilImage: ImageType;
    /**
     * @language zh-CN
     * @description 窗帘背景图片
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Curtain background picture
     * @defaultValue null
     */
    curtainBgImage: ImageType;
    /**
     * @language zh-CN
     * @description 窗帘背景色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Curtain background color
     * @defaultValue null
     */
    curtainBgColor: ControlType;
    /**
     * @language zh-CN
     * @description  按钮色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The button color
     * @defaultValue null
     */
    buttonColor: ControlType;
    /**
     * @language zh-CN
     * @description  窗帘背景宽
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Curtain background width
     * @defaultValue null
     */
    curtainBgWidth: number;
    /**
     * @language zh-CN
     * @description  窗帘背景高
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Curtain background height
     * @defaultValue null
     */
    curtainBgHeight: number;
    /**
     * @language zh-CN
     * @description  窗帘宽
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The curtains wide
     * @defaultValue null
     */
    curtainWidth: number;
    /**
     * @language zh-CN
     * @description  窗帘高
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The curtain is high
     * @defaultValue null
     */
    curtainHeight: number;
    /**
     * @language zh-CN
     * @description  最小值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description min
     * @defaultValue 0
     */
    min: number;
    /**
     * @language zh-CN
     * @description  最大值
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description max
     * @defaultValue 100
     */
    max: number;
    /**
     * @language zh-CN
     * @description  dp点
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description dp
     * @defaultValue 100
     */
    codes: {
      [key: string]: string;
    };
    /**
     * @language zh-CN
     * @description 窗帘移动回调
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description Curtain movement callback
     * @defaultValue 100
     */
    onSlideTo: (value: number) => any;
    /**
     * @language zh-CN
     * @description 状态栏文字颜色
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description Status bar text color
     * @defaultValue 100
     */
    textColor: string;
    /**
     * @language zh-CN
     * @description 开启文案
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description Open the document
     * @defaultValue 100
     */
    openingText?: string;
    /**
     * @language zh-CN
     * @description 关闭文案
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description Close the document
     * @defaultValue 100
     */
    closingText?: string;
  }

  export class Curtain extends React.Component<CurtainProps> {}

  export interface CurtainControlProps {
    /**
     * @language zh-CN
     * @description 半径
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description radius
     * @defaultValue null
     */
    radius?: number;
    /**
     * @language zh-CN
     * @description dp参数, dpCode, 百分比code, name
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Dp parameter, dpCode, percentage code, name
     * @defaultValue null
     */
    data?: [
      {
        controlCode: string;
        percentCode?: string;
        name?: string;
      }
    ];
    /**
     * @language zh-CN
     * @description 大圆背景
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Great circle background
     * @defaultValue null
     */
    bigCircleBg?: string;
    /**
     * @language zh-CN
     * @description 大圆描边颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Large circle stroke color
     * @defaultValue null
     */
    bigBorderColor?: string;
    /**
     * @language zh-CN
     * @description 大圆背景
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Great circle background
     * @defaultValue null
     */
    smallCircleBg?: string;
    /**
     * @language zh-CN
     * @description 小圆描边颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Small circle stroke color
     * @defaultValue null
     */
    smallBorderColor?: string;
    /**
     * @language zh-CN
     * @description 是否水平
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Whether the level of
     * @defaultValue null
     */
    isHorizontal?: boolean;
    /**
     * @language zh-CN
     * @description 开启数据
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Open data
     * @defaultValue null
     */
    open?: {
      text: string;
      color: string;
      animateColor: string;
    };
    /**
     * @language zh-CN
     * @description 关闭数据
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Close data
     * @defaultValue null
     */
    close?: {
      text: string;
      color: string;
      animateColor: string;
    };
    /**
     * @language zh-CN
     * @description 暂停数据
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Stop data
     * @defaultValue null
     */
    stop?: {
      color: string;
    };
  }

  export class CurtainControl extends React.Component<CurtainControlProps> {}

  export interface DropDownProps {
    /**
     * @language zh-CN
     * @description 展开内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description content
     * @defaultValue null
     */
    content?: any;
    /**
     * @language zh-CN
     * @description 主题配色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The theme color
     * @defaultValue null
     */
    themeColor?: string;
    /**
     * @language zh-CN
     * @description 图标配色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Icon color
     * @defaultValue null
     */
    tintColor?: string;
    /**
     * @language zh-CN
     * @description 头部标题
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The head title
     * @defaultValue null
     */
    title?: string;
    /**
     * @language zh-CN
     * @description 头部标题icon
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Header title icon
     * @defaultValue null
     */
    iconPath?: string;
    /**
     * @language zh-CN
     * @description 最外层样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Outermost pattern
     * @defaultValue null
     */
    style?: any;
    /**
     * @language zh-CN
     * @description 头部样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The head style
     * @defaultValue null
     */
    topStyle?: any;
    /**
     * @language zh-CN
     * @description 是否需要箭头
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Do you need arrows
     * @defaultValue null
     */
    arrow?: boolean;
    /**
     * @language zh-CN
     * @description 最大可展开高度
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Maximum deployable height
     * @defaultValue null
     */
    maxHeight?: number;
    /**
     * @language zh-CN
     * @description 标题样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Heading styles
     * @defaultValue null
     */
    titleStyle?: any;
    /**
     * @language zh-CN
     * @description 动画延时
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Animation delay
     * @defaultValue null
     */
    duration?: number;
    /**
     * @language zh-CN
     * @description 内容部分样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Content section style
     * @defaultValue null
     */
    animateWapperStyle?: any;
    /**
     * @language zh-CN
     * @description 图标
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description icon
     * @defaultValue null
     */
    icon?: any;
  }

  export class DropDown extends React.Component<DropDownProps> {}

  export interface EleSettingProps {
    /**
     * @language zh-CN
     * @description 主题色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description themeColor
     * @defaultValue null
     */
    themeColor: string;
    /**
     * @language zh-CN
     * @description 云跳转
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Cloud jump
     * @defaultValue null
     */
    cloudFunData: any[];
    /**
     * @language zh-CN
     * @description 是否展示历史记录
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Whether to display historical records
     * @defaultValue null
     */
    showSwitchLog: boolean;
    /**
     * @language zh-CN
     * @description 历史记录路由
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description History routing
     * @defaultValue null
     */
    logId: string;
    /**
     * @language zh-CN
     * @description 设置相关dp点
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Set the relevant DP points
     * @defaultValue null
     */
    settingDps: [{ [key: string]: any }];
    /**
     * @language zh-CN
     * @description 断电重启状态是否是多dp
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Whether the power failure restart state is multiple DP
     * @defaultValue null
     */
    isStatusMultichannel: boolean;
    /**
     * @language zh-CN
     * @description 多路断电重启路由
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Multiple power outages restart routing
     * @defaultValue null
     */
    statusId: string;
  }

  export class EleSetting extends React.Component<EleSettingProps> {}

  export interface MagicLayoutProps {
    /**
     * @language zh-CN
     * @description 背景内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Background content
     * @defaultValue null
     */
    renderScene: any;
    /**
     * @language zh-CN
     * @description 弹框内容
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Bounced content
     * @defaultValue null
     */
    renderModalScene: any;
    /**
     * @language zh-CN
     * @description 展示弹框
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Show bounced
     * @defaultValue null
     */
    showModal: boolean;
    /**
     * @language zh-CN
     * @description 动画触发回调
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The animation triggers a callback
     * @defaultValue null
     */
    onChange: any;
    /**
     * @language zh-CN
     * @description 触发区域
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Trigger zone
     * @defaultValue null
     */
    touchEnableArea: number;
    /**
     * @language zh-CN
     * @description 动画延迟时间
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Animation delay time
     * @defaultValue null
     */
    duration: number;
  }

  export class MagicLayout extends React.Component<MagicLayoutProps> {}

  export interface NameEditorProps {
    /**
     * @language zh-CN
     * @description dp点标识符
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description dp code
     * @defaultValue null
     */
    dpCode: string;
    /**
     * @language zh-CN
     * @description 事件类型
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The event type
     * @defaultValue null
     */
    eventType: 'Press' | 'LongPress';
    /**
     * @language zh-CN
     * @description 禁止
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description disabled
     * @defaultValue null
     */
    disabled?: boolean;
    /**
     * @language zh-CN
     * @description 停止进程
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Stop the process
     * @defaultValue null
     */
    stopPropagation?: boolean;
    /**
     * @language zh-CN
     * @description 按钮样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Button style
     * @defaultValue null
     */
    wrapperStyle?: { [styleKey: string]: any };
    /**
     * @language zh-CN
     * @description 字体样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Text style
     * @defaultValue null
     */
    textStyle?: { [styleKey: string]: any };
    /**
     * @language zh-CN
     * @description 图标
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description icon
     * @defaultValue null
     */
    icon?: string;
    /**
     * @language zh-CN
     * @description 图标大小
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description icon size
     * @defaultValue null
     */
    iconSize?: number;
    /**
     * @language zh-CN
     * @description 图标颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description icon color
     * @defaultValue null
     */
    iconColor?: string;
    /**
     * @language zh-CN
     * @description 默认名称
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description default name
     * @defaultValue null
     */
    defaultName?: string;
  }

  export class NameEditor extends React.Component<NameEditorProps> {}

  export interface PowerLineProps {
    /**
     * @language zh-CN
     * @description 路径颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description path color
     * @defaultValue null
     */
    pathColor: any;
    /**
     * @language zh-CN
     * @description 动画时间
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description animate time
     * @defaultValue null
     */
    animateTime: number;
  }

  export class PowerLine extends React.Component<PowerLineProps> {}

  export interface PushAnimateProps {
    /**
     * @language zh-CN
     * @description 当前值
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The current value
     * @defaultValue null
     */
    value: number;
    /**
     * @language zh-CN
     * @description 容器宽
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description width
     * @defaultValue null
     */
    width: number;
    /**
     * @language zh-CN
     * @description 容器高
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description height
     * @defaultValue null
     */
    height: number;
    /**
     * @language zh-CN
     * @description 以哪边为原点做推拉动画
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Which side is the origin of the push and pull drawing
     * @defaultValue null
     */
    origin: string;
    /**
     * @language zh-CN
     * @description 是否需要透明层遮罩
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Whether a transparent layer mask is required
     * @defaultValue null
     */
    needMask: boolean;
    /**
     * @language zh-CN
     * @description 全开-全关动画时长
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Full on - full off animation duration
     * @defaultValue null
     */
    duration: number;
    /**
     * @language zh-CN
     * @description 向内向外推拉， false为向屏幕内推，
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Push and pull, false means push into the screen,
     * @defaultValue null
     */
    outPush: boolean;
    /**
     * @language zh-CN
     * @description 恢复初始状态
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Restore initial state
     * @defaultValue null
     */
    restore: boolean;
    /**
     * @language zh-CN
     * @description 范围
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description range
     * @defaultValue null
     */
    range: number[];
  }

  export class PushAnimate extends React.Component<PushAnimateProps> {}

  export interface ScheduleListProps {
    /**
     * @language zh-CN
     * @description dp 组
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Dp group
     * @defaultValue null
     */
    dpCodes: string[];
  }

  export class ScheduleList extends React.Component<ScheduleListProps> {}

  export interface ShuffingListProps {
    /**
     * @language zh-CN
     * @description 数据集合
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The data set
     * @defaultValue null
     */
    data: any;
    /**
     * @language zh-CN
     * @description 主题色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description themeColor
     * @defaultValue null
     */
    themeColor?: string;
    /**
     * @language zh-CN
     * @description 内容宽度
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The content width
     * @defaultValue null
     */
    contentWidth: number;
    /**
     * @language zh-CN
     * @description 右边距
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The right margin
     * @defaultValue null
     */
    marginRight: number;
    /**
     * @language zh-CN
     * @description 子元素宽度
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Child element width
     * @defaultValue null
     */
    itemWidth: number;
    /**
     * @language zh-CN
     * @description 最大行数
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description The largest number of lines
     * @defaultValue null
     */
    numberOfLines?: number;
    /**
     * @language zh-CN
     * @description 子元素样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Child element style
     * @defaultValue null
     */
    itemStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 切换回调
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Switch the callback
     * @defaultValue null
     */
    onIndexChange?: (selectIdx: number) => void;
  }

  export class ShuffingList extends React.Component<ShuffingListProps> {}

  export interface SocketListItemProps {
    /**
     * @language zh-CN
     * @description 插座背景图
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket background
     * @defaultValue null
     */
    socketBackgroundImage: string | number;
    /**
     * @language zh-CN
     * @description 插座背景图宽高
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket background width and height
     * @defaultValue null
     */
    socketBackgroundImageSize: { [key: string]: number };
    /**
     * @language zh-CN
     * @description 插座图标
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket icon
     * @defaultValue null
     */
    socketImage: string | number;
    /**
     * @language zh-CN
     * @description 插座图标宽高
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket width and height
     * @defaultValue null
     */
    socketImageSize: { [key: string]: number };
    /**
     * @language zh-CN
     * @description 插座图标颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket color
     * @defaultValue null
     */
    socketImageTintColor;
    /**
     * @language zh-CN
     * @description 插座触发按钮
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket trigger button
     * @defaultValue null
     */
    onPress;
  }

  export class SocketListItem extends React.Component<SocketListItemProps> {}

  export class SlideLayout extends React.Component<SocketListItemProps> {}
}
