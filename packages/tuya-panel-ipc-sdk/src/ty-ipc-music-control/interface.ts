import { ViewStyle, ImageStyle, StyleProp } from 'react-native';

export interface TYIpcMusicControlProps {
  // The play control.
  ipcMusicControl: string;
  // The repeat mode.
  ipcMusicMode: string;
  // Taps the list.
  pressList?: () => void;
  // Taps the control button.
  pressControl?: () => void;
  // Taps the mode button.
  pressMode?: () => void;
  // Taps the Previous button.
  pressPrev?: () => void;
  // Taps the Next button.
  pressNext?: () => void;
  // Specifies whether to show the button.
  modeShow: boolean;
  // Specifies whether to show the button.
  preShow: boolean;
  // Specifies whether to show the button.
  controlShow: boolean;
  // Specifies whether to show the button.
  nextShow: boolean;
  // Specifies whether to show the button.
  listShow: boolean;
  // The theme color.
  themeColor: string;
  // The mode button style.
  modeStyle: StyleProp<ImageStyle>;
  // The pre button style.
  preStyle: StyleProp<ImageStyle>;
  // The control button style.
  controlStyle: StyleProp<ImageStyle>;
  // The next button style.
  nextStyle: StyleProp<ImageStyle>;
  // The list button style.
  listStyle: StyleProp<ImageStyle>;
  // The container style.
  containerStyle: StyleProp<ViewStyle>;
}
