import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type shareDataProps = {
  title: string;
  message: string;
};
export type ShareMessageProps = {
  themeColor?: string;
  shareData: shareDataProps;
  modalStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  onClick?: (type: string) => void;
  onFail?: (type: string, error: string) => void;
  onSuccess?: (type: string) => void;
  pswCopySuccess?: string;
  sendSuccess?: string;
  sendSuccessTip?: string;
  confirmText?: string;
  customShareList?: Array<shareItem>;
};
export type shareItem = {
  key: string;
  img: any;
  title: string;
};
export type ShareProps = {
  shareMessage: string;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  themeColor?: string;
  modalStyle?: StyleProp<ViewStyle>;
  onClick?: (type: string) => void;
  onFail?: (type: string, errMessage: string) => void;
  onSuccess?: (type: string) => void;
  opacity?: number;
  children?: React.ReactNode;
  cancelText?: string;
  pswCopySuccess?: string;
  sendSuccess?: string;
  sendSuccessTip?: string;
  confirmText?: string;
  customShareList?: Array<shareItem>;
};
