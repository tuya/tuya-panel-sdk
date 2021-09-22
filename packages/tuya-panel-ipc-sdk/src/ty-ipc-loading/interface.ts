import { ViewStyle, StyleProp } from 'react-native';

export interface TYIpcLoadingProps {
  // Specifies whether to show the component.
  show: boolean;
  // Specifies whether to show the completed status.
  showComplete: boolean;
  // The number of loading dots.
  itemNum: number;
  // The speed of the animation.
  loadSpeed: number;
  // Indicates whether the loading task is completed.
  onComplete?: () => void;
  // The sequenced colors.
  sequenceColor: string;
  // The color in the completed status.
  completeColor: string;
  // The size of loading dots.
  dotSize: number;
  // The container style.
  containerStyle: StyleProp<ViewStyle>;
}
