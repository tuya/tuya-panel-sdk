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
  showButton?: boolean;
  buttonText?: string;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  renderProgressCenterView?: () => JSX.Element;
  renderButton?: () => JSX.Element;
  onTimeout?: (progress: number) => void;
  onFinish?: () => void;
  onPress?: () => void;
}
