import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

export interface MainProps {
  /**
   * 列表自定义头部内容
   */
  header?: JSX.Element | null;
  /**
   * header高度
   */
  offset: number;
  /**
   * 列表项的actionOpacity，值范围：0-1，默认0.7
   */
  sectionItemOpacity?: number;
  /**
   * 列表项样式
   */
  sectionItemStyle?: StyleProp<ViewStyle>;
  /**
   * 列表项主标题字体样式
   */
  sectionItemTextStyle?: StyleProp<ViewStyle>;
  /**
   * 列表项副标题字体样式
   */
  sectionItemSubTextStyle?: StyleProp<ViewStyle>;
  /**
   * 列表项头部样式
   */
  sectionHeaderStyle?: StyleProp<ViewStyle>;
  /**
   * 列表项头部字体样式
   */
  sectionHeaderTextStyle?: StyleProp<ViewStyle>;
  /**
   * 列表项高度
   */
  itemHeight: number;
  /**
   * 列表项点击事件
   */
  onPress?: (item: SectionItem) => void;
  /**
   * 字母选择列表项字置顶图标
   */
  letterTopImage?: number;
  /**
   * 字母选择列表项置顶图标样式
   */
  letterTopStyle?: StyleProp<ImageStyle>;
  /**
   * 字母选择列表项置顶图标选中样式
   */
  letterTopActiveStyle?: StyleProp<ImageStyle>;
  /**
   * 字母选择列表项container样式
   */
  letterMainStyle?: StyleProp<ViewStyle>;
  /**
   * 字母选择列表项样式
   */
  letterItemStyle?: StyleProp<ViewStyle>;
  /**
   * 字母选择列表项字体样式
   */
  letterItemTextStyle?: StyleProp<ViewStyle>;
  /**
   * 字母选择列表项字体选中样式
   */
  letterItemTextActiveStyle?: StyleProp<ViewStyle>;
  /**
   * 字母选择列表项的actionOpacity,值范围：0-1，默认0.7
   */
  letterItemOpacity: number;
  /**
   * 列表数据
   */
  readonly sections: Array<SectionLists>;
  /**
   * 初始渲染列表个数
   */
  initialNumToRender?: number;
  /**
   * 是否开启动画效果，默认开启
   */
  animated?: boolean;
  /**
   * 搜索栏搜索框placeholder
   */
  placeholderText?: string;
  /**
   * 搜索栏重置文案自定义，不超过12个字符
   */
  reset: string;
  /**
   * 搜索栏重置按钮actionOpacity,范围：0-1，默认0.7
   */
  researchBtnOpacity: number;
  /**
   * 搜索框重置字体样式
   */
  researchTextStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索栏样式
   */
  researchStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索栏搜索框样式
   */
  researchInputStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索结果展示项列表的actionOpacity，0-1，默认0.7
   */
  searchListItemOpacity?: number;
  /**
   * 搜索结果展示项列表样式
   */
  searchListItemStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索结果展示项列表主标题字体样式
   */
  searchListTextStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索结果展示项列表副标题字体样式
   */
  searchListSubTextStyle?: StyleProp<ViewStyle>;
}
export interface SectionItem {
  key: string;
  name: string;
  subName?: string;
}

export interface SectionLists {
  title: string;
  data: Array<SectionItem>;
}
