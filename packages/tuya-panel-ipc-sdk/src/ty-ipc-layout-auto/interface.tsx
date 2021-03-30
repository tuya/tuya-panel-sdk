import React from 'react';
import { ViewStyle } from 'react-native';

export interface TYIpcLayoutAutoProps {
  // 容器的高度, 若内部高度少于容器高度, 则垂直水平居中, 否则滑动处理
  containerHeight: number;
  // 容器样式
  containerStyle: ViewStyle;
  // 内容容器样式
  mainContentStyle: ViewStyle;
  // ScrollView组件属性继承
  scrollProps: any;
  // 子组件
  children: React.ReactElement | null;
}
