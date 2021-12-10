import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ListRenderItem, FlatListProps } from 'react-native';
import { DevInfo, TabBarArr, TabBarProps } from 'tuya-panel-kit';

export interface DeviceListPanelProps {
  dataSource?: Array<DevInfo>;
  tabs: Array<TabBarArr>;
  panelStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  tabBarStyle?: StyleProp<ViewStyle>;
  highestPosition?: number;
  initialPosition?: number;
  autoShrinkDistance?: number;
  isShowIconMore?: boolean;
  initialTab?: string;
  children?: React.ReactNode;
  panelChildren?: React.ReactNode;
  panelChildrenHeight?: number;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  swipeable?: boolean;
  isShowPullDown?: boolean;
  flatListProps?: FlatListProps<DevInfo>;
  tabBarProps?: TabBarProps;
  onIconMorePress?: (devInfo: DevInfo) => void;
  onTabChange?: (key: string) => void;
  customRenderItem?: ListRenderItem<DevInfo>;
  customRenderTabBar?: () => JSX.Element;
  customRenderList?: () => JSX.Element;
  customRenderPullDown?: () => JSX.Element;
}
