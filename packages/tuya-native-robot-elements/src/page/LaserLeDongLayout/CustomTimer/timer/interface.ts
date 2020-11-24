import { ImageSourcePropType } from 'react-native';

import { IRowItem } from '../addTimer/interface';

export interface ITimerDataSource {
  id: string;
  timeStr: string;
  repeatStr: string;
  dpStrArr: string;
  rowOpen: boolean;
  switchValue: boolean;
  originalData: any;
}

export interface ITimerRemoteData {
  [props: string]: any;
}

export interface IDpId {
  [dpId: string]: ITimerData;
}

export interface IRangeValues {
  dpValue: any;
  subItem?: number | string | Array<number | string>;
}

export interface ITimerData {
  dpId: number | string;
  dpName: string;
  selected: number;
  rangeKeys: string[];
  rangeValues: IRangeValues[];
  isSubItem?: boolean;
  subItemSave?: boolean;
  index?: number;
}

export interface ITheme {
  timer: {
    themeColor?: string;
    fontColor?: string;
    titleBg?: string;
    titleFontColor?: string;
    boardBg?: string;
    cellBg?: string;
    cellLine?: string;
    subFontColor?: string;
    btnBg?: string;
    btnBorder?: string;
    btnFontColor?: string;
    thumbTintColor?: string;
    onThumbTintColor?: string;
    onTintColor?: string;
    tintColor?: string;
    ios_backgroundColor?: string;
    repeatColor?: string;
    emptyIcon: ImageSourcePropType;
  };
}

export interface ITimerConfig {
  addTimerRouter?: string;
  repeatType?: 'popup' | 'circle';
  repeatRouter?: string;
  category?: string;
  repeat?: number;
  data: ITimerData[];
  loop?: boolean;
  isPickerAlignCenter?: boolean;
  isTimeZone?: boolean;
  timeZoneType?: 'popup' | 'timerPicker';
  limit?: number;
  isMainSwitch?: boolean;
  fetchType?: 'dp' | 'cloud';
  dpId?: string;
  saveExtraHandler?: (dp?: any) => any;
  dpStrFormatter?: (value: any, dpData: ITimerData) => string;
  renderDpItem?: (dpRowItem: IRowItem) => React.ReactElement<any>;
}

export interface ITimerProps {
  theme: ITheme;
  is12Hours?: boolean;
  tintEmptyImage?: boolean;
  timerConfig: ITimerConfig;
  navigator: any;
  dataSource?: ITimerDataSource[];
  isSupportNotice: boolean;
  mainSwitchValue?: boolean;
  dpIds?: IDpId;
  fetchData?: () => void;
}

export interface IETimerProps {
  nativeEvent: ILayoutProps;
}

export interface ILayoutProps {
  layout: IHeightProps;
}

export interface IHeightProps {
  height: number;
}
