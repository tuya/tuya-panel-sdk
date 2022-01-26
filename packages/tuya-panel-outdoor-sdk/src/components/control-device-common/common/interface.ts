import { ViewStyle } from 'react-native';

// 云端和app定位数据
export interface ILocation {
  /**
   * 云端获取的纬度，经度
   */
  lat: number;
  lon: number;
  /**
   * 云端获取的时间
   */
  reportTime: number;
  /**
   * 手机蓝牙获取的纬度，经度
   */
  latitude: number;
  longitude: number;
  /**
   * 手机蓝牙获取的地址
   */
  address: string;
}

export interface IModalOutProps {
  /**
   * 引导蒙层-标题
   */
  title: string;
  /**
   * 引导蒙层-副标题
   */
  subTitle: string;
  /**
   * 引导蒙层-确定按钮
   */
  done: string;
  /**
   * 引导蒙层-背景图
   */
  bgImage: number;
  /**
   * icon父层-样式
   */
  iconBoxStyle: ViewStyle;
  /**
   * 引导蒙层-背景图样式
   */
  bgStyle: ViewStyle;
  /**
   * 引导蒙层-背景图内部子视图
   */
  bgChildStyle?: ViewStyle;
}

// 外层传入的蒙层属性
export interface IModalProps extends IModalOutProps {
  showModal: boolean;
  /**
   * 蒙层-第一个元素距离底部的距离
   */
  v1Bottom: number;
  /**
   * 蒙层-提示引导距离底部的距离
   */
  v2Bottom: number;
  /**
   * icon-样式
   */
  icon: string;
  /**
   * icon-样式
   */
  iconProp: IIconProps;
  /**
   * 点击事件
   */
  onMaskPress: () => void;
}

export interface IIcon extends IIconProps {
  /**
   * icon图标
   */
  icon: string;
}

// icon样式
export interface IIconProps {
  /**
   * 图标颜色
   */
  color: string;
  /**
   * 图标大小
   */
  size: number;
  /**
   * icon-样式
   */
  iconStyle?: ViewStyle;
}

// 主页属性-最外层引用参数
export interface IProps {
  /**
   * 主题色
   */
  themeColor: string;
  /**
   * true：设备在线
   */
  deviceOnline: boolean;
  /**
   * true：手机蓝牙模式
   */
  bleState: boolean;
  /**
   * icon样式
   */
  iconProp: IIconProps;
  /**
   * icon图标
   */
  searchIcon: string;
  ringIcon: string;
  lampIcon: string;
  /**
   * 搜索功能-结果回调
   */
  onSearchResult: (result: { error: boolean }) => void;
  /**
   * 闪灯 || 响铃功能-结果回调
   */
  onRingLampResult: (result: { error: boolean }) => void;
  /**
   * icon点击后成功图标-目前只作用在搜索功能
   */
  successIcon?: string;
  /**
   * 超时处理时间
   */
  timeout?: number;
  /**
   * 蒙层最上方元素距离底部的高度，自行对齐
   */
  modalStartPoint?: number;
  /**
   * 搜索引导层-对应的属性，guideModal的exist为true才有效
   */
  searchModalProp?: IModalOutProps;
  /**
   * 响铃引导层-对应的属性，guideModal的exist为true才有效
   */
  ringModalProp?: IModalOutProps;
  /**
   * 闪灯引导层-对应的属性，guideModal的exist为true才有效
   */
  lampModalProp?: IModalOutProps;
  /**
   * 图标上下间距, 默认cx(12)
   */
  iconSpace?: number;
  /**
   * 父视图样式
   */
  viewStyle?: ViewStyle;
}
