import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleProp, ViewStyle } from 'react-native';
import { SingleTimePickerProps } from 'src/components/time/single-time-picker/interface';
import { IThemeConfig, IWeekOptionStyle, TimerData } from '../timer/interface';

declare type StackParamsList = {
  addTimer: {
    weeksRouter: string;
    timerId?: string;
    isAdd: boolean;
    is24Hour?: boolean;
    currTimerData: TimerData;
    timerList?: [];
    limit: number;
    useNavigation?: boolean;
    checkConflict?: number;
    onBack?: () => void;
    onSave?: () => void;
    singleTimePickerStyle: SingleTimePickerProps;
    rowStyle: StyleProp<ViewStyle>;
    weekOptionStyle: IWeekOptionStyle;
    themeColor: string;
    fontColor: string;
    backgroundColor: string;
    category: string;
    openLampRouter?: string;
    customAddTimerSave?: () => void;
    customAddTimerBack?: () => void;
    customAddTimerDelete?: () => void;
    customWeeksRouter?: string;
    customOenLampRouter?: string;
  };
};
export interface IAddTimerProps extends IThemeConfig {
  navigation?: StackNavigationProp<any>;
  route: RouteProp<StackParamsList, 'addTimer'>;
}

export interface ICurrTimerProps {
  timerId: string;
  hour: number;
  minute: number;
  weeks: number[];
  dpPowerValue: boolean;
}

export const defaultProps = {
  currTimerData: {
    hour: 12,
    minute: 0,
    weeks: [0, 0, 0, 0, 0, 0, 0, 0],
    dpPowerValue: false,
    hue: 0,
    saturation: 1000,
    value: 1000,
    brightness: 1000,
    temperature: 500,
    workMode: 'colour',
  },
  rowStyle: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  weekOptionStyle: {
    centerBgc: 'rgba(0,0,0,0.05)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  onAddTimerSave() {},
  onAddTimerBack() {},
};

export interface IActionData {
  dpName: string;
  dpId: string;
  value: boolean | string;
}
export interface IActionValue {
  workMode: string;
  hue: number;
  saturation: number;
  value: number;
  temperature: number;
  brightness: number;
}
