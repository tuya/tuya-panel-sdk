import { ViewStyle, ImageStyle, StyleProp } from 'react-native';

export interface TYIpcMessagePlayerProps {
  // 容器样式
  containerStyle: StyleProp<ViewStyle>;
  // OSD样式
  timeBoxStyle: StyleProp<ViewStyle>;
  // 分享按钮样式
  shareStyle: StyleProp<ImageStyle>;
  // 播放器样式
  playerStyle: StyleProp<ViewStyle>;
  // 分享地址
  shareVideos: string[];
  // 视频地址
  mediaUrl: string;
  // OSD
  time?: string;
}
