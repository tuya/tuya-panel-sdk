import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface AppleMusicDataType {
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

interface AppleMusicColorAreaType {
  area: number[];
  hue: number;
  saturation: number;
  value: number;
}

export declare interface AppMusicListItemType {
  id: number;
  mode: number;
  title: string;
  icon: ImageSourcePropType;
  colorArea?: AppleMusicColorAreaType[];
}

export interface AppMusicCardProps {
  style?: StyleProp<ViewStyle>;
  theme?: {
    isDarkTheme: boolean;
    themeColor: string;
    background: string;
    fontColor: string;
  };
  isColourExist?: boolean;
  isTempExist?: boolean;
  dataSource?: AppMusicListItemType[];
  onPlay?: () => void;
  onMusicDataPut?: (data: AppleMusicDataType) => void;
}
