export interface SlideChooseProps {
  /**
   * @language zh-CN
   * @description 按钮文案颜色
   * @defaultValue #fff
   */
  /**
   * @language en-US
   * @description the color of button text
   * @defaultValue #fff
   */
  btnTextColor?: string;
  /**
   * @language zh-CN
   * @description 距离边界多少距离触发回调
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description the distance of trigger onChooseLeft or onChooseRight
   * @defaultValue 20
   */
  tiggerDistance?: number;
  /**
   * @language zh-CN
   * @description 左边按钮颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description left button color
   * @defaultValue { '0%': '#FF4040', '100%': 'rgba(254,72,71,0.5)' }
   */
  leftColors?: { [ket: string]: string };
  /**
   * @language zh-CN
   * @description 右边按钮颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description right button color
   * @defaultValue { '0%': '#239C8E', '100%': 'rgba(35,156,142,0.5)'}
   */
  rightColors?: { [ket: string]: string };
  /**
   * @language zh-CN
   * @description 左边按钮文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description left button text
   * @defaultValue left
   */
  leftText?: string;
  /**
   * @language zh-CN
   * @description 右边按钮文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description right button text
   * @defaultValue right
   */
  rightText?: string;
  /**
   * @language zh-CN
   * @description 滑动左边回调时间
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description choose left callback
   * @defaultValue undefined
   */
  onChooseLeft?: () => void;
  /**
   * @language zh-CN
   * @description 滑动右边回调事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description choose right callback
   * @defaultValue undefined
   */
  onChooseRight?: () => void;
}
