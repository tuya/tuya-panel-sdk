import { ViewStyle, StyleProp } from 'react-native';

export interface TYIpcMusicControlProps {
  // 播放控制
  ipcMusicControl: string;
  // 循环模式
  ipcMusicMode: string;
  // 列表按钮点击
  pressList?: () => void;
  // 控制按钮点击
  pressControl?: () => void;
  // 模式按钮点击
  pressMode?: () => void;
  // 前一曲按钮点击
  pressPrev?: () => void;
  // 后一曲按钮点击
  pressNext?: () => void;
  // 主题色
  themeColor: string;
  // 容器样式
  containerStyle: StyleProp<ViewStyle>;
}
