import { StyleProp, TextStyle } from 'react-native';
export interface DefendTimeProps {
  textColor?: string;
  tipColor?: string;
  textA?: string;
  textB?: string;
  tipTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  logoImage?: any;
}
export interface DefendTimeState {
  time: number;
}
