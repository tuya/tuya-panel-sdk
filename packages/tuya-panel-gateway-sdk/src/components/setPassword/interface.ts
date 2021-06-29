import { ViewStyle, StyleProp, KeyboardType } from 'react-native';
import { DialogCustomProps, DialogElse } from 'tuya-panel-kit';

interface SetPasswordProps {
  keyboardType?: KeyboardType;
  passwordLength?: number;
  normalDotColor?: string;
  activedDotColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  passwordRowStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  dotMarginHorizontal?: number;
  renderPasswordItem?: (key: number, index: number) => JSX.Element | null;
  onChangeText?: (value: string) => string | null;
}

interface SetPasswordModalProps extends SetPasswordProps {
  title?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  dialogOption?: DialogCustomProps;
  dialogElseOption?: DialogElse;
}

export { SetPasswordProps, SetPasswordModalProps };
