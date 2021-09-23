import { StyleProp, TextStyle } from 'react-native';

export const IDefaultProps = {
  testID: 'customKeyboard',
  maxNum: 9,
  isHasZero: true,
  themeColor: '#239C8E',
  visible: false,
  confirmText: 'Confirm',
};

export type ICustomKeyboardProps = {
  confirmTextStyle?: StyleProp<TextStyle>;
  onValueChange?: (value: string) => void;
  onConfirm?: () => void;
  onMaskPress?: () => void;
} & Partial<typeof IDefaultProps>;
