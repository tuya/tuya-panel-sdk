import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ViewStyle, StyleProp } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Strings from '../i18n';
import { SingleTimePickerProps } from 'src/components/time/single-time-picker/interface';

const { convertX: cx } = Utils.RatioUtils;

declare type StackParamsList = {
  Timer: {
    // 主题信息
    themeConfig: IThemeConfig;
    // 路由信息
    timerConfig: ITimerConfig;
  };
};

export interface ITimerProps {
  navigation?: StackNavigationProp<any>;
  route: RouteProp<StackParamsList, 'Timer'>;
}

export interface IThemeConfig {
  // 主题色
  themeColor?: string;
  // 字体色
  fontColor?: string;
  // 背景色
  backgroundColor?: string;
  // ScrollView定时列表样式
  scrollViewContentStyle?: StyleProp<ViewStyle>;
  // 单个定时item样式
  timerStyle?: StyleProp<ViewStyle>;
  // 时间选择器样式
  singleTimePickerStyle?: SingleTimePickerProps;
  // 无定时图片填充色
  noTimerTintColor?: string;
  // row样式
  rowStyle?: StyleProp<ViewStyle>;
  // 自定义周期样式
  weekOptionStyle?: IWeekOptionStyle;
  // 定时开关切换样式
  switchOptionStyle: ISwitchOptionStyle;
}

export interface IWeekOptionStyle {
  // 中间部分背景色
  centerBgc: string;
  // 下划线
  borderBottomColor: string;
  // 圆圈边框颜色
  borderColor: string;
}
export interface ISwitchOptionStyle {
  style: StyleProp<ViewStyle>;
  thumbStyle: StyleProp<ViewStyle>;
  size: {
    activeSize: number;
    width: number;
    height: number;
    margin: number;
  };
  tintColor: string;
  thumbTintColor: string;
  onThumbBorderColor: string;
  offThumbBorderColor: string;
}

export interface ITimerConfig {
  // 添加/编辑定时路由
  addTimerRouter?: string;
  // 执行动作开灯路由
  openLampRouter?: string;
  // 自定义周期路由
  weeksRouter?: string;
  // 是否使用新的路由跳转方式
  useNavigation?: boolean;
  // 是否是24小时进制
  is24Hour?: boolean;
  // 定时数量限制值
  limit?: number;
  // 1: 云端会做定时冲突判断提示
  checkConflict?: number;
  category?: string;
  // 添加按钮
  renderAddButtonElement?: () => JSX.Element;
  // 定时页头部
  renderHeaderElement?: () => JSX.Element;
  // 侧滑删除
  renderSwipeDelElement?: () => JSX.Element;
  // 自定义添加
  customAddTimer?: (value: boolean, item: TimerData | [], is24Hour: boolean) => void; // 用户自定义事件
}

export interface TListProps extends IThemeConfig, ITimerConfig {
  timerList: ICloudTimerList[];
  timeStyle: StyleProp<ViewStyle>;
  onGetCloudTimerList: () => void;
  onEditItem: (data: TimerData) => void;
  listHeaderComponent: JSX.Element;
}

export interface TimerData extends IList {
  timerId?: string;
  key?: string;
}
export interface IList {
  dpPowerValue: boolean;
  status: boolean;
  hour: number;
  minute: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
  weeks: number[];
  workMode: string;
  open?: boolean;
  type: string;
  index: number;
}
export interface ICloudTimerList extends IList {
  timerId: string;
  key: string;
}
export interface ITimerList {
  id: string;
  timers: ITimer[];
}

export interface ITimer {
  aliasName: string;
  date: string;
  dps: any;
  groupOrder?: number;
  isAppPush?: boolean;
  loops: string;
  instruct: any[];
  orderDps: any;
  params: any;
  status: number;
  time: string;
  timeId: number;
  timezoneId?: string;
}
export const defaultProps = {
  rowStyle: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  weekOptionStyle: {
    centerBgc: 'rgba(0,0,0,0.05)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  switchOptionStyle: {
    style: {},
    size: {
      activeSize: cx(24),
      width: cx(40),
      height: cx(18),
      margin: 0,
    },
    tintColor: 'rgba(0,21,0,0.12)',
    thumbTintColor: '#ffffff',
    thumbStyle: {},
    onThumbBorderColor: '#ffffff',
    offThumbBorderColor: 'rgba(0,21,0,0.12)',
  },
};
export const defaultPickerStyle: SingleTimePickerProps = {
  hour: 0,
  minute: 0,
  // 时间选择器样式
  dividerColor: '#ccc',
  itemTextColor: '#ccc',
  selectedItemTextColor: '#000',
  textSize: 20,
  itemStyle: {},
  visibleItemCount: 7,
  itemAlign: 'center',
  loop: true,
  containerStyle: {},
  pickerStyle: {},
  hourPickerStyle: {},
  minutePickerStyle: {},
  amPmPickerStyle: {},
  amText: Strings.getLang('TYLamp_am'),
  pmText: Strings.getLang('TYLamp_pm'),
  prefixPosition: 'left',
};
