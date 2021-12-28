import { StyleProp, ViewStyle } from 'react-native';

export interface IRowProps {
  fontColor: string;
  label: string;
  value: number[] | string;
  onPress: () => void;
}

export interface ICustomTopBarProps {
  title: string;
  onSave: () => void;
  onBack: () => void;
  themeColor: string;
}
export interface IAddButtonProps {
  handleAdd: () => void;
  addBtnStyle?: StyleProp<ViewStyle>;
  addBtnTintColor?: string;
}
