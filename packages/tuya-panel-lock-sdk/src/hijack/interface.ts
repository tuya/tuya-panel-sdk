import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type ErrorType =
  | {
      message?: string;
      errorMsg?: string;
    }
  | string;
export interface HijackProps {
  /**
   * @language zh-CN
   * @description 挟持组件的样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Styles for component
   * @defaultValue {}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 挟持组件中列表样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Styles for component of hijack list
   * @defaultValue {}
   */
  lockAttrStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 挟持组件中列表文案样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Styles for component of hijack list text
   * @defaultValue {}
   */
  lockAttrTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 挟持组件中列表项样式
   * @defaultValue {}
   */
  /**
   * @language en-US
   * @description Styles for component of hijack list item
   * @defaultValue {}
   */
  lockAttrItemStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 是否有分割线
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description is show Divider
   * @defaultValue null
   */
  hasDivider: boolean;
  /**
   * @language zh-CN
   * @description 组件数据改变回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description component data change callback
   * @defaultValue null
   */
  changeHijack: (data: any) => void;
  /**
   * @language zh-CN
   * @description 组件数据
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description component data
   * @defaultValue null
   */
  hijackData?: any;
  /**
   * @language zh-CN
   * @description 主题颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description theme color
   * @defaultValue null
   */
  themeColor?: string;
  scrollUp?: () => void;
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
  hijackTitle: string;
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
  hijackSubTitle: string;
  /**
   * @language zh-CN
   * @description 是否展示劫持组件详情
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Is show hijack component detail
   * @defaultValue null
   */
  unlockAttr: boolean;
  /**
   * @language zh-CN
   * @description 是否展示劫持组件事件回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Is show hijack component detail event callback
   * @defaultValue null
   */
  onValueChange: (data: boolean) => void;
  /**
   * @language zh-CN
   * @description 电话标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Phone title
   * @defaultValue null
   */
  phoneMessageTitle?: string;
  /**
   * @language zh-CN
   * @description app标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description App title
   * @defaultValue null
   */
  appMessageTitle?: string;
  /**
   * @language zh-CN
   * @description 信息类型标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Message Type title
   * @defaultValue null
   */
  messageTypeTitle?: string;
  /**
   * @language zh-CN
   * @description 电话占位符
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Phone placeholder
   * @defaultValue ''
   */
  phonePlaceholder?: string;
  /**
   * @language zh-CN
   * @description 获取验证码文案
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description get phone code text
   * @defaultValue null
   */
  sendCodeTitle?: string;
  /**
   * @language zh-CN
   * @description 验证码占位符
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Code placeholder
   * @defaultValue ''
   */
  codePlaceholder?: string;

  /**
   * @language zh-CN
   * @description 自定义获取验证码
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Custom get phone code function
   * @defaultValue null
   */
  customGetPhoneCode?: () => Promise<ErrorType | null>;
}
