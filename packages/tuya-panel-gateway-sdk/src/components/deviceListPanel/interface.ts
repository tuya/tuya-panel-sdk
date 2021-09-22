import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ListRenderItem } from 'react-native';
import { DevInfo, TabBarArr } from 'tuya-panel-kit';

export interface ITabBar {
  /**
   * @language zh-CN
   * @description Tab 内容样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Tab content style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 激活的 Tab 样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Active tab style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue undefined
   */
  activeStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 文本样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue undefined
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 激活状态下的文本样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Active text style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue undefined
   */
  activeTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 索引值
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Key Value
   * @defaultValue undefined
   */
  key: string;
  /**
   * @language zh-CN
   * @description Tab 里文本
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Text in tab
   * @defaultValue undefined
   */
  title: string;
  /**
   * @language zh-CN
   * @description 触发单个 Tab 点击回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Trigger a single tab click callback
   * @defaultValue () => {}
   */
  onPress?: (index: string) => void;
  /**
   * @language zh-CN
   * @description 当 type: 'radio' 时，触发单个 Tab 点击回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description When type: 'radio', a single tab click callback is triggered
   * @defaultValue () => {}
   */
  onItemPress?: () => void;
}
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
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  onIconMorePress?: (devInfo: DevInfo) => void;
  onTabChange?: (key: string) => void;
  customRenderItem?: ListRenderItem<DevInfo>;
  customRenderTabBar?: () => JSX.Element;
  customRenderList?: () => JSX.Element;
}
