import { ViewStyle, StyleProp, TextStyle } from 'react-native';

interface TipItem {
  icon: string;
  name: string;
  content: string;
}

interface AddDeviceTipProps {
  title?: string;
  desc?: string;
  contentPaddingHorizontal?: number;
  titleNumberOfLines?: number;
  descNumberOfLines?: number;
  itemNumberOfLines?: number;
  appHelpUrl?: string;
  appSearchUrl?: string;
  dividerColor?: string;
  dataSource?: Array<TipItem>;
  containerStyle?: StyleProp<ViewStyle>;
  addButtonText?: string;
  addButtonStyle?: StyleProp<ViewStyle>;
  addButtonTextStyle?: StyleProp<TextStyle>;
  addButtonWrapperStyle?: StyleProp<ViewStyle>;
  closeButtonSize?: number;
  closeButtonIcon?: string;
  closeButtonIconColor?: string;
  closeButtonStyle?: StyleProp<ViewStyle>;
  closeButtonTextStyle?: StyleProp<TextStyle>;
  closeButtonWrapperStyle?: StyleProp<ViewStyle>;
  moreButtonText?: string;
  moreButtonStyle?: StyleProp<ViewStyle>;
  moreButtonTextStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descStyle?: StyleProp<TextStyle>;
  tipListStyle?: StyleProp<ViewStyle>;
  renderTipItem?: (tipItem: { index: number; item: TipItem }) => JSX.Element | null;
  renderSeparatorComponent?: () => JSX.Element | null;
  closeModal?: () => void;
  moreButtonOnPress?: (url: string) => void;
  addButtonOnPress?: (url: string) => void;
}
interface AddDeviceTipModalProps extends AddDeviceTipProps {
  maskStyle?: StyleProp<ViewStyle>;
  onMaskPress?: () => void;
}

export { TipItem, AddDeviceTipProps, AddDeviceTipModalProps };
