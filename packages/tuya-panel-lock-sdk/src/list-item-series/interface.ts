import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type stylesType =
  | {
      container?: StyleProp<ViewStyle> | undefined;
      content?: StyleProp<ViewStyle> | undefined;
      contentLeft?: StyleProp<ViewStyle> | undefined;
      contentCenter?: StyleProp<ViewStyle> | undefined;
      contentRight?: StyleProp<ViewStyle> | undefined;
      title?: StyleProp<TextStyle> | undefined;
      subTitle?: StyleProp<TextStyle> | undefined;
    }
  | undefined;
type themeType =
  | {
      boardBg?: string | undefined;
      fontColor?: string | undefined;
      subFontColor?: string | undefined;
      descFontColor?: string | undefined;
      cellLine?: string | undefined;
      cellBg?: string | undefined;
      cellRadius?: number | undefined;
      margin?: number[] | number | undefined;
      padding?: number[] | number | undefined;
    }
  | undefined;
interface TYListItemSeriesProps {
  /**
   * @language zh-CN
   * @description 标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Title
   * @defaultValue null
   */
  title?: string | undefined;
  /**
   * @language zh-CN
   * @description 副标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description SubTitle
   * @defaultValue null
   */
  subTitle?: string | undefined;
  /**
   * @language zh-CN
   * @description 子组件标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Child title
   * @defaultValue null
   */
  childTitle: string;
  /**
   * @language zh-CN
   * @description 子组件副标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Child subTitle
   * @defaultValue null
   */
  childSubTitle?: string;
  /**
   * @language zh-CN
   * @description 右侧 Action 具体值，当类型为 string时，默认使用 TYText
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Specific value of action on the right. When the type is string, TYText is used by default
   * @defaultValue null
   */
  Action?: any;
  /**
   * @language zh-CN
   * @description 按钮主题颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description SwitchButton theme color
   * @defaultValue null
   */
  themeColor?: string;
  /**
   * @language zh-CN
   * @description 按钮开关值
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description SwitchButton value
   * @defaultValue null
   */
  switchValue: boolean;
  /**
   * @language zh-CN
   * @description 按钮值变化回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback of SwitchButton value change
   * @defaultValue () => {}
   */
  switchValueChange: (value: boolean) => void;
  /**
   * @language zh-CN
   * @description 子组件点击事件
   * @types (event: <a target='_blank' href='https://reactnative.dev/docs/pressevent'>GestureResponderEvent</a>) => void
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Child click event
   * @types (event: <a target='_blank' href='https://reactnative.dev/docs/pressevent'>GestureResponderEvent</a>) => void
   * @defaultValue () => {}
   */
  childValueChange: () => void;
  /**
   * @language zh-CN
   * @description 是否禁用列表点击事件
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Whether to disable list click events
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * @language zh-CN
   * @description 列表项右边区域是否显示 arrow 标签
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Is the arrow label displayed in the right area of the list item
   * @defaultValue false
   */
  arrow?: boolean | undefined;
  /**
   * @language zh-CN
   * @description arrow 图标颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Arrow icon color
   * @defaultValue null
   */
  arrowColor?: string | undefined;
  /**
   * @language zh-CN
   * @description 列表项的所有样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description All styles for list items
   * @defaultValue {}
   */
  styles?: stylesType;
  /**
   * @language zh-CN
   * @description 主题配置
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Theme configuration
   * @defaultValue {}
   */
  theme?: themeType;
  /**
   * @language zh-CN
   * @description 子组件列表项的所有样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Child all styles for list items
   * @defaultValue {}
   */
  childStyles?: stylesType;
  /**
   * @language zh-CN
   * @description 子组件主题配置
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Child theme configuration
   * @defaultValue {}
   */
  childTheme?: themeType;
  /**
   * @language zh-CN
   * @description 左侧 Icon 具体值，当类型为 string时，默认使用 IconFont
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Icon specific value on the left. When the type is string, Iconfont is used by default
   * @defaultValue null
   */
  Icon?: any;
  /**
   * @language zh-CN
   * @description 子组件左侧 Icon 具体值，当类型为 string时，默认使用 IconFont
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Child icon specific value on the left. When the type is string, Iconfont is used by default
   * @defaultValue null
   */
  childIcon?: any;
  /**
   * @language zh-CN
   * @description 图片的 tintColor 是否跟随 iconColor
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Does the tintColor of the image follow iconColor
   * @defaultValue true
   */
  imageFollowIconColor?: boolean | undefined;
  /**
   * @language zh-CN
   * @description 左侧 Icon 类型
   * @defaultValue 'auto'
   */
  /**
   * @language en-US
   * @description Icon type on the left
   * @defaultValue 'auto'
   */
  iconType?: 'auto' | 'image' | 'iconfont' | 'text' | undefined;
  /**
   * @language zh-CN
   * @description 图标尺寸
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Icon size
   * @defaultValue null
   */
  iconSize?: number | undefined;
  /**
   * @language zh-CN
   * @description 图标颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Icon Color
   * @defaultValue null
   */
  iconColor?: string | undefined;
  /**
   * @language zh-CN
   * @description 图片的 tintColor 是否跟随 iconColor
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Does the tintColor of the image follow iconColor
   * @defaultValue true
   */
  childImageFollowIconColor?: boolean | undefined;
  /**
   * @language zh-CN
   * @description 子组件左侧 Icon 类型
   * @defaultValue 'auto'
   */
  /**
   * @language en-US
   * @description Child Icon type on the left
   * @defaultValue 'auto'
   */
  childIconType?: 'auto' | 'image' | 'iconfont' | 'text' | undefined;
  /**
   * @language zh-CN
   * @description 子组件图标颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Child icon Color
   * @defaultValue null
   */
  childIconColor?: string | undefined;
  /**
   * @language zh-CN
   * @description 子组件图标尺寸
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Child icon size
   * @defaultValue null
   */
  childIconSize?: number | undefined;
  /**
   * @language zh-CN
   * @description 右侧 Action 类型
   * @defaultValue 'auto'
   */
  /**
   * @language en-US
   * @description Right action type
   * @defaultValue 'auto'
   */
  childIActionType?: 'auto' | 'image' | 'iconfont' | 'text' | undefined;
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description style
   * @defaultValue null
   */
  style?: ViewStyle;
  /**
   * @language zh-CN
   * @description 子组件样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description child style
   * @defaultValue null
   */
  childStyle?: ViewStyle;
  /**
   * @language zh-CN
   * @description 自定义组件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Custom child
   * @defaultValue null
   */
  children?: React.ReactNode;
}

export default TYListItemSeriesProps;
