/* istanbul ignore file */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TabBarProps } from 'tuya-panel-kit';

export interface NewTabProps {
  wrapActiveViewStyle?: StyleProp<ViewStyle>;
  isOverlay?: boolean;
}

export default class TabBar extends React.PureComponent<TabBarProps & NewTabProps> {}
