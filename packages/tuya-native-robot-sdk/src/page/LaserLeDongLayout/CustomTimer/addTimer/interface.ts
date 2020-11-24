import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { ITheme, ITimerData, ITimerDataSource } from '../timer/interface';

export { ITheme, ITimerData };

export interface IAddTimerProps {
  repeatRouter?: string;
  repeatType?: 'popup' | 'circle';
  theme: ITheme;
  is12Hours?: boolean;
  isPickerAlignCenter: boolean;
  dpDataList: ITimerData[];
  loop?: boolean;
  isEdit?: boolean;
  timer?: any;
  fetchData: () => void;
  navigator: any;
  category: string;
  groupId: string;
  hasRepeat: boolean;
  isTimeZone: boolean;
  timeZoneType?: 'popup' | 'timerPicker';
  fetchType: 'dp' | 'cloud';
  dataSource: ITimerDataSource[];
  isSupportNotice: boolean;
  index: number;
  mainSwitch: boolean;
  isMainSwitch: boolean;
  dpId: string;
  saveExtraHandler: (_?: any) => any;
  renderDpItem?: (dpRowItem: IRowItem) => React.ReactElement<any>;
}

export interface IRowItem {
  dataSource?: ITimerData[];
  rowItem?: ITimerData;
  index?: number;
  renderRow?: (originRowProps?: IRowProps) => React.ReactElement<any>;
  dpStateData?: ITimerData[];
  onDpConfirm?: (dpConfirm: IRowConfirm) => any;
}

export interface IRowConfirm {
  value: any;
  rowItem: ITimerData;
  dpStateData: ITimerData[];
}

export interface IDpDic {
  [dpId: string]: ITimerData;
}

export interface IRowProps {
  accessibilityLabel: string;
  title: string;
  content: string;
  bordered?: boolean;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

export interface IRepeatProps {
  selected: string;
  onSelect: (_?: any) => void;
}
