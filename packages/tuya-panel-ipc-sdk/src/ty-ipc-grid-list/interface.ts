import { ReactNode } from 'react';

interface itemInterface {
  item: any;
  index: number;
  buttonWidth: number;
}

interface GridListProps {
  // 按钮水平方向左右margin值
  marginHorizontalWidth: number;
  // 按钮竖直方向左右margin值
  marginVerticalWidth: number;
  // 每一行按钮数量
  rowNumber: number;
  // 按钮渲染函数
  renderItem: (item: itemInterface) => ReactNode;
  // 源数据
  data: any[];
  // 如果最后一行按钮数量不等于rowNumber，是否等比例设置按钮长度，铺满整行
  isCover: boolean;
  // 容器水平方向padding值
  containerHorizontalWidth: number;
  // 容器竖直方向padding值
  containerVerticalWidth: number;
  keyExtractor: (item: any, index: number) => string | number;
  onPress: (item: any, index: number) => void;
}

// grid list

export default GridListProps;
