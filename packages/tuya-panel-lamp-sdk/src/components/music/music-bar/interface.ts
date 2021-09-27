import { StyleProp, ViewStyle } from 'react-native';

export interface MusicBarProps {
  style?: StyleProp<ViewStyle>;
  musicIndex: number;
  colors: string[];
  size: number;
  barNum?: number;
}
