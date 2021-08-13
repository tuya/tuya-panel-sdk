import { FC } from 'react';
import {
  StyleProp,
  ViewStyle,
  ImageStyle,
  StatusBarStyle,
  ImageSourcePropType,
} from 'react-native';

// TipItem
export interface TipItem {
  /**
   * @language zh-CN
   * @description 图片
   * @defaultValue
   */
  /**
   * @language en-US
   * @description image
   * @defaultValue
   */
  icon: string | ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 设备名称
   * @defaultValue
   */
  /**
   * @language en-US
   * @description device name
   * @defaultValue
   */
  name: string;
  /**
   * @language zh-CN
   * @description 重置方式
   * @defaultValue
   */
  /**
   * @language en-US
   * @description reset methods
   * @defaultValue
   */
  content: string;
}
// AddDeviceTip
export interface AddDeviceTipProps {
  /**
   * @language zh-CN
   * @description 标题
   * @defaultValue '请确认子设备已处于配网模式(指示灯闪烁）'
   */
  /**
   * @language en-US
   * @description title
   * @defaultValue 'Please make sure the child devices are already in distribution network model (lights flashing)'
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 描述
   * @defaultValue '若设备指示灯未闪烁，请先重置设备，以下是一些常见子设备的重置方式：'
   */
  /**
   * @language en-US
   * @description description
   * @defaultValue 'If the light is not flashing equipment, please reset the device, the following are some common subset of reset:'
   */
  desc?: string;
  /**
   * @language zh-CN
   * @description 组件水平方向的内边距
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description The horizontal padding of the component
   * @defaultValue 20
   */
  contentPaddingHorizontal?: number;
  /**
   * @language zh-CN
   * @description 标题的numberOfLines属性的值
   * @defaultValue 3
   */
  /**
   * @language en-US
   * @description The value of the numberOfLines attribute of the title
   * @defaultValue 3
   */
  titleNumberOfLines?: number;
  /**
   * @language zh-CN
   * @description 描述的numberOfLines属性的值
   * @defaultValue 3
   */
  /**
   * @language en-US
   * @description The value of the numberOfLines attribute of the description
   * @defaultValue 3
   */
  descNumberOfLines?: number;
  /**
   * @language zh-CN
   * @description 常见设备重置方式列表
   * @defaultValue []
   */
  /**
   * @language en-US
   * @description List of common device reset methods
   * @defaultValue []
   */
  dataSource?: Array<TipItem>;
  /**
   * @language zh-CN
   * @description dataSource列表项numberOfLines属性的值
   * @defaultValue 2
   */
  /**
   * @language en-US
   * @description The value of the numberOfLines attribute of the dataSource list item
   * @defaultValue 2
   */
  itemNumberOfLines?: number;
  /**
   * @language zh-CN
   * @description app的配网提示页面地址
   * @defaultValue 'device_gw_sub_device_help_list'
   */
  /**
   * @language en-US
   * @description The url of App's network configuration prompt page
   * @defaultValue 'device_gw_sub_device_help_list'
   */
  appHelpUrl?: string;
  /**
   * @language zh-CN
   * @description app进行搜索设备的地址
   * @defaultValue 'device_only_search_config_gw_sub'
   */
  /**
   * @language en-US
   * @description The url of App searches device page
   * @defaultValue 'device_only_search_config_gw_sub'
   */
  appSearchUrl?: string;
  /**
   * @language zh-CN
   * @description 分割线 Divider组件的颜色值
   * @defaultValue '#E8E8E8'
   */
  /**
   * @language en-US
   * @description The color of Divider component
   * @defaultValue '#E8E8E8'
   */
  dividerColor?: string;
  /**
   * @language zh-CN
   * @description 最外层容器 container的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the outermost container
   * @defaultValue {}
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 添加按钮的文字
   * @defaultValue '指示灯在快闪'
   */
  /**
   * @language en-US
   * @description The text of the  add button
   * @defaultValue 'Light is in a flash'
   */
  addButtonText?: string;
  /**
   * @language zh-CN
   * @description 添加按钮的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the add button
   * @defaultValue {}
   */
  addButtonStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 添加按钮的文字样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The text style of the add button
   * @defaultValue {}
   */
  addButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 添加按钮的最外层容器的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the outermost container of the add button
   * @defaultValue {}
   */
  addButtonWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 关闭按钮的尺寸
   * @defaultValue 16
   */
  /**
   * @language en-US
   * @description The size of the close button
   * @defaultValue 16
   */
  closeButtonSize?: number;
  /**
   * @language zh-CN
   * @description 关闭按钮的图标
   * @defaultValue 'close'
   */
  /**
   * @language en-US
   * @description The icon of the close button
   * @defaultValue 'close'
   */
  closeButtonIcon?: string;
  /**
   * @language zh-CN
   * @description 关闭按钮图标的颜色
   * @defaultValue '#FFF'
   */
  /**
   * @language en-US
   * @description The color of the close button icon
   * @defaultValue '#FFF'
   */
  closeButtonIconColor?: string;
  /**
   * @language zh-CN
   * @description 关闭按钮的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the close button
   * @defaultValue {}
   */
  closeButtonStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 关闭按钮的文字样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The text style of the close button
   * @defaultValue {}
   */
  closeButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 关闭按钮的最外层容器的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the outermost container of the close button
   * @defaultValue {}
   */
  closeButtonWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 更多按钮的文字
   * @defaultValue '查看更多设备重置方式 >'
   */
  /**
   * @language en-US
   * @description The text of the  more button
   * @defaultValue 'See more device reset way >'
   */
  moreButtonText?: string;
  /**
   * @language zh-CN
   * @description 更多按钮的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the more button
   * @defaultValue {}
   */
  moreButtonStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 更多按钮的文字样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The text style of the more button
   * @defaultValue {}
   */
  moreButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 标题的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the title
   * @defaultValue {}
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 描述的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the description
   * @defaultValue {}
   */
  descStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 设备重置方式列表的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the list of device reset modes
   * @defaultValue {}
   */
  tipListStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 设备重置方式列表的renderItem方法
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The renderItem method of the device reset modes list
   * @defaultValue null
   */
  renderTipItem?: (tipItem: { index: number; item: TipItem }) => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 设备重置方式列表的ItemSeparatorComponent方法
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The ItemSeparatorComponent method of the device reset modes list
   * @defaultValue null
   */
  renderSeparatorComponent?: () => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 关闭按钮的点击事件
   * @defaultValue () => Popup.close()
   */
  /**
   * @language en-US
   * @description The onPress event of close button
   * @defaultValue () => Popup.close()
   */
  closeModal?: () => void;
  /**
   * @language zh-CN
   * @description 更多按钮的点击事件
   * @defaultValue (url: string) => { Popup.close(); setTimeout(() => { TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`); }, 300);}
   */
  /**
   * @language en-US
   * @description The onPress event of more button
   * @defaultValue (url: string) => { Popup.close(); setTimeout(() => { TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`); }, 300);}
   */
  moreButtonOnPress?: (url: string) => void;
  /**
   * @language zh-CN
   * @description 添加按钮的点击事件
   * @defaultValue (url: string) => { Popup.close(); setTimeout(() => { TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`); }, 300);}
   */
  /**
   * @language en-US
   * @description The onPress event of add button
   * @defaultValue (url: string) => { Popup.close(); setTimeout(() => { TYSdk.native.jumpTo(`tuyaSmart://${url}?gwId=${TYSdk.devInfo.devId}`); }, 300);}
   */
  addButtonOnPress?: (url: string) => void;
}

export interface AddDeviceTipModalProps extends AddDeviceTipProps {
  /**
   * @language zh-CN
   * @description 遮罩的样式
   * @defaultValue { backgroundColor: 'rgba(51, 51, 51, 0.7)' }
   */
  /**
   * @language en-US
   * @description mask style
   * @defaultValue { backgroundColor: 'rgba(51, 51, 51, 0.7)' }
   */
  maskStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 遮罩的点击事件
   * @defaultValue () => Popup.close()
   */
  /**
   * @language en-US
   * @description mask onPress event
   * @defaultValue () => Popup.close()
   */
  onMaskPress?: () => void;
}

export const AddDeviceTip: FC<AddDeviceTipProps> = () => {};

export const AddDeviceTipModal: { show: (props: AddDeviceTipModalProps) => void };

export interface SetPasswordProps {
  /**
   * @language zh-CN
   * @description 输入框的keyboardType属性值
   * @defaultValue 'numeric'
   */
  /**
   * @language en-US
   * @description The keyboardType attribute value of the TextInput component
   * @defaultValue 'numeric'
   */
  keyboardType?: KeyboardType;
  /**
   * @language zh-CN
   * @description 密码长度 建议范围 4-8
   * @defaultValue 4
   */
  /**
   * @language en-US
   * @description password length Suggested range 4-8
   * @defaultValue 4
   */
  passwordLength?: number;
  /**
   * @language zh-CN
   * @description 未输入密码状态下，圆圈的颜色
   * @defaultValue 'transparent'
   */
  /**
   * @language en-US
   * @description The color of the circle, when the password is not entered
   * @defaultValue 'transparent'
   */
  normalDotColor?: string;
  /**
   * @language zh-CN
   * @description 输入密码后，圆圈的颜色
   * @defaultValue '#333'
   */
  /**
   * @language en-US
   * @description The color of the circle, when the password is entered
   * @defaultValue '#333'
   */
  activedDotColor?: string;
  /**
   * @language zh-CN
   * @description 最外层容器的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the outermost container
   * @defaultValue {}
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 密码所在行的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the password line
   * @defaultValue {}
   */
  passwordRowStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 圆圈的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the circle
   * @defaultValue {}
   */
  dotStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 圆圈的marginHorizontal值
   * @defaultValue 10
   */
  /**
   * @language en-US
   * @description The marginHorizontal value of the circle
   * @defaultValue 10
   */
  dotMarginHorizontal?: number;
  /**
   * @language zh-CN
   * @description 自定义密码项的渲染方法
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Rendering method of custom password item
   * @defaultValue null
   */
  renderPasswordItem?: (key: number, index: number) => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 输入框的onChangeText事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The onChangeText event of the TextInput component
   * @defaultValue null
   */
  onChangeText?: (value: string) => string | null;
}

export interface SetPasswordModalProps extends SetPasswordProps {
  /**
   * @language zh-CN
   * @description 弹窗标题
   * @defaultValue '设置密码'
   */
  /**
   * @language en-US
   * @description dialog title
   * @defaultValue 'Set the password'
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 取消按钮的文字
   * @defaultValue '取消'
   */
  /**
   * @language en-US
   * @description The text of the cancel button
   * @defaultValue 'Cancel'
   */
  cancelText?: string;
  /**
   * @language zh-CN
   * @description 确认按钮的文字
   * @defaultValue '确认'
   */
  /**
   * @language en-US
   * @description The text of the confirm button
   * @defaultValue 'Confirm'
   */
  confirmText?: string;
  /**
   * @language zh-CN
   * @description 确认按钮点击回调
   * @defaultValue () => Dialog.close()
   */
  /**
   * @language en-US
   * @description Callback of clicking the confirm button
   * @defaultValue () => Dialog.close()
   */
  onConfirm?: () => void;
  /**
   * @language zh-CN
   * @description 取消按钮点击回调
   * @defaultValue () => Dialog.close()
   */
  /**
   * @language en-US
   * @description Callback of clicking the cancel button
   * @defaultValue () => Dialog.close()
   */
  onCancel?: () => void;
  /**
   * @language zh-CN
   * @description Dialog.custom方法的第一个参数
   * @defaultValue
   */
  /**
   * @language en-US
   * @description The first parameter of the Dialog.custom method
   * @defaultValue
   */
  dialogOption?: DialogCustomProps;
  /**
   * @language zh-CN
   * @description Dialog.custom方法的第二个参数
   * @defaultValue
   */
  /**
   * @language en-US
   * @description The second parameter of the Dialog.custom method
   * @defaultValue
   */
  dialogElseOption?: DialogElse;
}

export const SetPassword: FC<SetPasswordProps> = () => {};

export const SetPasswordModal: { show: (props: SetPasswordModalProps) => void };

export interface TempHumWithBlurProps {
  /**
   * @language zh-CN
   * @description 最外层容器的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of the outermost container
   * @defaultValue {}
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 模糊的类型
   * @defaultValue 'xlight'
   */
  /**
   * @language en-US
   * @description Blur type
   * @defaultValue 'xlight'
   */
  blurType?: 'xlight' | 'light' | 'dark';
  /**
   * @language zh-CN
   * @description 模糊程度，数字越大越模糊。范围0 - 100
   * @defaultValue 10
   */
  /**
   * @language en-US
   * @description The degree of blur, the larger the number, the more blurry. Range 0-100
   * @defaultValue 10
   */
  blurAmount?: number;
  /**
   * @language zh-CN
   * @description 模糊容器的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description The style of blur view
   * @defaultValue {}
   */
  blurViewStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 是否显示中间分隔线
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to show the middle divider
   * @defaultValue true
   */
  showSplit?: boolean;
  /**
   * @language zh-CN
   * @description 是否显示温度
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to display the temperature
   * @defaultValue true
   */
  showTemperature?: boolean;
  /**
   * @language zh-CN
   * @description 温度的标签文字
   * @defaultValue '温度'
   */
  /**
   * @language en-US
   * @description Temperature label text
   * @defaultValue 'Temperature'
   */
  temperatureLabel?: string;
  /**
   * @language zh-CN
   * @description 温度的值
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Temperature value
   * @defaultValue 20
   */
  temperatureValue?: number;
  /**
   * @language zh-CN
   * @description 温度的单位
   * @defaultValue '℃'
   */
  /**
   * @language en-US
   * @description Temperature unit
   * @defaultValue '℃'
   */
  temperatureUnit?: '℃' | '℉';
  /**
   * @language zh-CN
   * @description 温度的图片
   * @defaultValue
   */
  /**
   * @language en-US
   * @description Temperature image
   * @defaultValue
   */
  temperatureIcon?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 是否显示湿度
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to display humidity
   * @defaultValue true
   */
  showHumidity?: boolean;
  /**
   * @language zh-CN
   * @description 湿度的标签文字
   * @defaultValue '湿度'
   */
  /**
   * @language en-US
   * @description Humidity label text
   * @defaultValue 'Humidity'
   */
  humidityLabel?: string;
  /**
   * @language zh-CN
   * @description 湿度的值
   * @defaultValue 32
   */
  /**
   * @language en-US
   * @description Humidity value
   * @defaultValue 32
   */
  humidityValue?: number;
  /**
   * @language zh-CN
   * @description 湿度的单位
   * @defaultValue '%'
   */
  /**
   * @language en-US
   * @description Humidity unit
   * @defaultValue '%'
   */
  humidityUnit?: string;
  /**
   * @language zh-CN
   * @description 湿度的图片
   * @defaultValue
   */
  /**
   * @language en-US
   * @description Humidity image
   * @defaultValue
   */
  humidityIcon?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 标签文字的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Label text style
   * @defaultValue {}
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 数值文字的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Value text style
   * @defaultValue {}
   */
  valueStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 单位文字的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Unit text style
   * @defaultValue {}
   */
  unitStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 图片的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Image style
   * @defaultValue {}
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 分割线的render函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the dividing line
   * @defaultValue null
   */
  renderSplit?: () => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 温度模块的render函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the temperature area
   * @defaultValue null
   */
  renderTemperature?: () => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 湿度模块的render函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the humidity area
   * @defaultValue null
   */
  renderHumidity?: () => JSX.Element | null;
}

export const TempHumWithBlur: FC<TempHumWithBlurProps> = () => {};

export interface TopBarWithArcProps {
  /**
   * @language zh-CN
   * @description 顶部栏的标题
   * @defaultValue '带圆弧的顶部栏'
   */
  /**
   * @language en-US
   * @description The title of the TopBar
   * @defaultValue 'TopBarWithArc'
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 顶部栏字体和图标颜色
   * @defaultValue '#FFF'
   */
  /**
   * @language en-US
   * @description TopBar font and icon color
   * @defaultValue '#FFF'
   */
  color?: string;
  /**
   * @language zh-CN
   * @description 顶部栏返回按钮点击事件
   * @defaultValue () => TYSdk.Navigator.pop()
   */
  /**
   * @language en-US
   * @description TopBar back button click event
   * @defaultValue () => TYSdk.Navigator.pop()
   */
  onBack?: () => void;
  /**
   * @language zh-CN
   * @description 状态栏的barStyle属性值
   * @defaultValue 'light-content'
   */
  /**
   * @language en-US
   * @description The barStyle property value of the StatusBar
   * @defaultValue 'light-content'
   */
  barStyle?: StatusBarStyle;
  /**
   * @language zh-CN
   * @description 顶部栏的参数
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Params of topBar
   * @defaultValue {}
   */
  topBarParams?: TopBarProps;
  /**
   * @language zh-CN
   * @description 填充色
   * @defaultValue '#27b6ff'
   */
  /**
   * @language en-US
   * @description Fill color
   * @defaultValue '#27b6ff'
   */
  fill?: string;
  /**
   * @language zh-CN
   * @description 圆弧宽度
   * @defaultValue 屏幕宽度
   */
  /**
   * @language en-US
   * @description Arc width
   * @defaultValue Screen width
   */
  arcWidth?: number;
  /**
   * @language zh-CN
   * @description 圆弧高度
   * @defaultValue 80
   */
  /**
   * @language en-US
   * @description Arc Height
   * @defaultValue 80
   */
  arcHeight?: number;
  /**
   * @language zh-CN
   * @description 状态栏的渲染函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the StatusBar
   * @defaultValue null
   */
  renderStatusBar?: () => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 顶部栏的渲染函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the TopBar
   * @defaultValue null
   */
  renderTopBar?: () => JSX.Element | null;
  /**
   * @language zh-CN
   * @description 圆弧的渲染函数
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The render function of the arc
   * @defaultValue null
   */
  renderArc?: () => JSX.Element | null;
}

export const TopBarWithArc: FC<TopBarWithArcProps> = () => {};
