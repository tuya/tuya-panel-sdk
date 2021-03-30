export interface CurtainControlProps {
  /**
   * 半径
   */
  radius?: number;
  /**
   * dp参数, dpCode, 百分比code, name
   */
  data?: [
    {
      controlCode: string;
      percentCode?: string;
      name?: string;
    }
  ];
  /**
   *  大圆背景
   */
  bigCircleBg?: string;
  /**
   * 大圆描边颜色
   */
  bigBorderColor?: string;
  /**
   *  大圆背景
   */
  smallCircleBg?: string;
  /**
   * 小圆描边颜色
   */
  smallBorderColor?: string;
  /**
   * 是否水平
   */
  isHorizontal?: boolean;
  open?: {
    /**
     * 文案展示 字体颜色 动画颜色
     */
    text: string;
    color: string;
    animateColor: string;
  };
  close?: {
    text: string;
    color: string;
    animateColor: string;
  };
  stop?: {
    /**
     * icon颜色
     */
    color: string;
  };
}

export interface CurtainControlState {
  dpState: { [key: string]: any };
}
