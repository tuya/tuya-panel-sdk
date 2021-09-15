import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { DevInfo } from 'tuya-panel-kit';

export interface SelectDeviceProps {
  activeOpacity?: number;
  dataSource?: Array<DevInfo>;
  selectLimit?: number;
  containerStyle?: StyleProp<ViewStyle>;
  tipContainerStyle?: StyleProp<ViewStyle>;
  tipText?: string;
  tipTextStyle?: StyleProp<TextStyle>;
  offlineText?: string;
  offlineTextStyle?: StyleProp<TextStyle>;
  selectAllText?: string;
  selectAllTextStyle?: StyleProp<TextStyle>;
  listStyle?: StyleProp<ViewStyle>;
  activedTintColor?: string;
  disabledTintColor?: string;
  normalTintColor?: string;
  onSelectChange?: (devIds: Array<string>) => void;
  renderOfflineState?: () => React.ElementType;
}
