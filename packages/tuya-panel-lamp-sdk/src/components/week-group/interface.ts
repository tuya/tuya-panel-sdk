import { StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from 'tuya-panel-kit';

export interface WeekGroupProps {
  style?: StyleProp<ViewStyle>;
  theme?: {
    fontSize?: number;
    fontColor?: string;
    iconSize?: number;
    bgWidth?: number;
    bgHeight?: number;
    bgColor?: string;
    margin?: number[];
    iconColor?: string;
    bgRadius?: number;
  };
  background?: string;
  activeColor?: string;
  size?: number;
  buttonProps?: ButtonProps;
  accessibilityLabel?: string;
  disabled?: boolean;
  defaultValue?: number[];
  value?: number[];
  onChange?: (value: number[]) => void;
}
