import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  digitalBase: 10,
  isHideZero: false,
  themeColor: '#239C8E',
  locale: 'en',
};

export type IRandomPasswordProps = {
  savePassword?: (password: string) => void;
  passwordColor?: string;
  themeColor?: string;
  randomTextColor?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  password?: string;
  locale?: string | { random: string };
} & Partial<typeof IDefaultProps>;
