import { StyleProp, ViewStyle } from 'react-native';

export interface PickerUnitProps {
  style?: StyleProp<ViewStyle>;
  label: string;
  list: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface CountdownPickerInnerRefType {
  value: number;
}

export interface CountdownPickerProps {
  style?: StyleProp<ViewStyle>;
  innerRef?: React.Ref<CountdownPickerInnerRefType>;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  hourLabel?: string;
  minuteLabel?: string;
  secondLabel?: string;
}
