import { ViewStyle, StyleProp, ImageSourcePropType, TextStyle, ImageStyle } from 'react-native';

interface TempHumWithBlurProps {
  containerStyle?: StyleProp<ViewStyle>;
  blurType?: 'xlight' | 'light' | 'dark';
  blurAmount?: number;
  blurViewStyle?: StyleProp<ViewStyle>;
  showSplit?: boolean;
  showTemperature?: boolean;
  temperatureLabel?: string;
  temperatureValue?: number;
  temperatureUnit?: '℃' | '℉';
  temperatureIcon?: ImageSourcePropType;
  showHumidity?: boolean;
  humidityLabel?: string;
  humidityValue?: number;
  humidityUnit?: string;
  humidityIcon?: ImageSourcePropType;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  unitStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  renderSplit?: () => JSX.Element | null;
  renderTemperature?: () => JSX.Element | null;
  renderHumidity?: () => JSX.Element | null;
}

export { TempHumWithBlurProps };
