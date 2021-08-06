import { ReactNode } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, ViewStyle, StyleProp } from 'react-native';
interface returnOrderItem {
  list: Record<string, unknown>[];
  orderItemIndex: number;
  moveItemIndex: number;
}

interface orderItemInterface {
  item: Record<string, unknown>;
  index: number;
}

interface TYIpcDragSortProps {
  // 样式
  containerStyle: StyleProp<ViewStyle>;
  // 排序容器样式
  orderContain: StyleProp<ViewStyle>;
  // 排序按钮宽
  orderWidth: number;
  // 图标
  icon: ReactNode;
  // 列表项高度
  itemHeight: number;
  /**
   * 排序
   * @param 排序结果信息
   * {
   *    // 列表
   *    list,
   *    // 排序项位置
   *    orderItemIndex,
   *    // 移动项位置
   *    moveItemIndex
   * }
   */
  onOrder: (data: returnOrderItem) => void;
  // 滚动事件
  onScroll: (data: NativeSyntheticEvent<NativeScrollEvent>) => void;
  // 渲染帧时间(ms) (优化性能)
  renderFrameTime: number;
  // 源数据
  data: Record<string, unknown>[];
  // 渲染item函数
  renderItem: (item: Record<string, unknown>, index: number) => ReactNode;
  // 获取列表ref
  getListRef: (data: HTMLDivElement) => void;
  // 拖拽按钮所处位置：left | right
  touchPosition: 'left' | 'right';
}

export { TYIpcDragSortProps, orderItemInterface };
