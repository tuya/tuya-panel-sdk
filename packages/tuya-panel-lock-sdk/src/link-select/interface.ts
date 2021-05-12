import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface LinkSelectProps {
  type: 'click' | 'switch' | 'switchAndClick';
  keyValue: string;
  title: string;
  tip?: string;
  titleStyle?: StyleProp<TextStyle>;
  tipStyle?: StyleProp<TextStyle>;
  titleMaxShow?: number;
  tipMaxShow?: number;

  switchValue?: boolean;
  onSwitch?: (item: boolean) => void;
  onClick?: (item?: any) => void;
  info?: (item?: any) => void;
  choiceValueKey?: any;
  choiceValue?: string;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  switchProps?: any;
  customLinkList?: Array<LinkSelectProps>;
  relation?: Array<string>;
}

export interface LinkSelectState {
  switchValue: boolean;
  choiceValue: string;
  [key: string]: any;
}
