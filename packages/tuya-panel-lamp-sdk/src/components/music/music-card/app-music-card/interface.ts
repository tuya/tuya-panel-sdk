import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface AppMusicListItemType {
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
