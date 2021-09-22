import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ProgressProps } from 'tuya-panel-kit';

export interface StopsProps {
  offset: string;
  stopColor: string;
  stopOpacity: string;
}

export interface AddProgressProps {
  isCustomProgressChange?: boolean;
  devIds?: Array<string>;
  foreColor?:
    | string
    | StopsProps[]
    | {
        [key: string]: string;
      };
  title?: string;
  prompt?: string;
  progressText?: string;
  progressTextStyle?: StyleProp<TextStyle>;
  progressStyle?: StyleProp<ViewStyle>;
  progressProps?: ProgressProps;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  promptStyle?: StyleProp<TextStyle>;
  timeoutSecond?: number;
  customTotal?: number;
  customProgress?: number;
  onTimeout?: (progress: number) => void;
  onFinish?: () => void;
}
