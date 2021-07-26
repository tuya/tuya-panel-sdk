import React from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import ImagePicker from '@tuya-rn/react-native-image-picker';

type fnType = typeof ImagePicker.showImagePicker;
export type inferPickerParams<fn> = fn extends (op: infer O, cb: (res: infer R) => void) => any
  ? [O, R]
  : never;
export type PickerOptionsType = inferPickerParams<fnType>[0];
export type PickerResponseType = inferPickerParams<fnType>[1];
export type SizeTypes = 'small' | 'medium' | 'large' | 'xlarge';
export type PickerType = 'picker' | 'camera' | 'library';

export interface AvatarProps {
  /**
   * @language zh-CN
   * @description 头像尺寸
   * @defaultValue medium
   */
  /**
   * @language en-US
   * @description Avatar size
   * @defaultValue medium
   */
  size?: SizeTypes | number;
  /**
   * @language zh-CN
   * @description 头像占位图（无source传入展示）
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description placeholder image
   * @defaultValue undefined
   */
  placeholderSource?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 按压透明度设置, TouchableOpacity 属性
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Opacity setting
   * @defaultValue undefined
   */
  activeOpacity?: number;
  /**
   * @language zh-CN
   * @description 容器样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description style of container
   * @defaultValue undefined
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 头像样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description style of avatar
   * @defaultValue undefined
   */
  avatarStyle?: ImageStyle;
  /**
   * @language zh-CN
   * @description 内置角标样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description style of accessary
   * @defaultValue undefined
   */
  accessaryStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 角标图片源
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description source of accessary
   * @defaultValue undefined
   */
  accessarySource?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description react's children
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description react's children
   * @defaultValue undefined
   */
  children?: React.ReactChildren;
  /**
   * @language zh-CN
   * @description 图片源
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Avatar source
   * @defaultValue undefined
   */
  source?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 头像形状类型
   * @defaultValue circle
   */
  /**
   * @language en-US
   * @description Avatar type
   * @defaultValue circle
   */
  type?: 'circle' | 'square';
  /**
   * @language zh-CN
   * @description 头像按压事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description Avatar press event
   * @defaultValue undefined
   */
  onPress?: () => void;
  /**
   * @language zh-CN
   * @description 外层包裹组件
   * @defaultValue View
   */
  /**
   * @language en-US
   * @description warpper component
   * @defaultValue View
   */
  Component?: typeof React.Component;
  /**
   * @language zh-CN
   * @description 是否展示右下角选择图标
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Whether to display the selection in the lower right corner
   * @defaultValue false
   */
  showPicker?: boolean | PickerType;
  /**
   * @language zh-CN
   * @description Picker的属性
   * @defaultValue defaultPickerProps
   * {
        title: Strings.getLang('TYLock_default_Picker_Title'),
        cancelButtonTitle: Strings.getLang('TYLock_default_Cancel_Title'),
        chooseFromLibraryButtonTitle: Strings.getLang('TYLock_default_Choose_Title'),
        takePhotoButtonTitle: Strings.getLang('TYLock_default_Photo_Title'),
      }
   */
  /**
   * @language en-US
   * @description Picker's props
   * @defaultValue defaultPickerProps
   * {
        title: Strings.getLang('TYLock_default_Picker_Title'),
        cancelButtonTitle: Strings.getLang('TYLock_default_Cancel_Title'),
        chooseFromLibraryButtonTitle: Strings.getLang('TYLock_default_Choose_Title'),
        takePhotoButtonTitle: Strings.getLang('TYLock_default_Photo_Title'),
      }
   */
  pickerProps?: Pick<
    PickerOptionsType,
    | 'title'
    | 'cancelButtonTitle'
    | 'chooseFromLibraryButtonTitle'
    | 'takePhotoButtonTitle'
    | 'maxHeight'
    | 'maxWidth'
    | 'quality'
    | 'allowsEditing'
  >;
  /**
   * @language zh-CN
   * @description 成功回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description callback for success
   * @defaultValue undefined
   */
  onSuccess?: (res: PickerResponseType) => void;
  /**
   * @language zh-CN
   * @description 失败回调
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description callback for Error
   * @defaultValue undefined
   */
  onError?: (res: PickerResponseType) => void;
}
