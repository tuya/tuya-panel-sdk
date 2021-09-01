import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const IDefaultProps = {
  maxNum: 9,
  isHasZero: true,
  themeColor: '#239C8E',
  locale: 'en',
  visible: false,
};

export type ICustomKeyboardProps = {
  confirmText?: StyleProp<TextStyle>;
  onValueChange?: (value: string) => void;
  onConfirm?: () => void;
  onMaskPress?: () => void;
  locale?: string | { confirm: string };
} & Partial<typeof IDefaultProps>;
