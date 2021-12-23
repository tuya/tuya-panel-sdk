import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MotionPullUpProps, ModalProps } from 'tuya-panel-kit';

export interface AnimatedModalProps {
  /**
   * Motion样式设置
   */
  motionStyle?: StyleProp<ViewStyle>;
  /**
   *是否渲染容器头部
   */
  isRenderHead?: boolean;
  /**
   * 容器头部样式及文案设置
   */
  headerConfig?: AnimatedModalHeader;
  /**
   * 主体内容样式设置
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * 内容样式设置
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * 容器底部样式及文案设置
   */
  footerConfig?: AnimatedModalFooter;
  /**
   * 容器是否显示
   */
  visible: boolean;
  /**
   * 自定义动画内容是否执行动画效果
   */
  isExpand: boolean;
  /**
   * 自定义内容动画执行参数
   */
  animatedConfig?: AnimatedConfigData;
  /**
   * 底部操作类型
   */
  footOperation?: footOperationType;
  /**
   * Modal相关配置
   */
  modalProps?: ModalProps;
  /**
   * Motion相关配置
   */
  motionProps?: MotionPullUpProps;
  /**
   * 自定义内容
   */
  renderContent?: () => void;
  /**
   * 自定义动画内容
   */
  renderAnimatedContent: () => void;
  /**
   * Modal点击事件
   */
  onMaskPress: () => void;
  /**
   * 取消事件
   */
  onCancel?: () => void;
  /**
   * 确认事件
   */
  onConfirm?: () => void;
}

interface AnimatedModalHeader {
  /**
   * 容器头部样式设置
   */
  contentHeaderStyle?: StyleProp<ViewStyle>;
  /**
   * 容器头部文案样式设置
   */
  contentHeaderTextStyle?: StyleProp<TextStyle>;
  /**
   * 容器头部标题文案
   */
  contentHeaderTitle?: string;
}

interface AnimatedModalFooter {
  /**
   * 容器底部样式设置
   */
  contentFooterStyle?: StyleProp<ViewStyle>;
  /**
   * 取消文案
   */
  cancelText?: string;
  /**
   * 取消文案样式设置
   */
  cancelTextStyle?: StyleProp<TextStyle>;
  /**
   * 确认文案
   */
  confirmText?: string;
  /**
   * 确认文案样式设置
   */
  confirmTextStyle?: StyleProp<TextStyle>;
  /**
   * 取消和确认文案之间的分界样式设置
   */
  footerDivideStyle?: StyleProp<ViewStyle>;
}

interface AnimatedConfigData {
  /**
   * 自定义动画内容显示高度范围
   */
  animatedHeight: number[];
  /**
   * 自定义动画内容透明度范围
   */
  animatedOpacity: number[];
  /**
   * 自定义动画内容缩放范围
   */
  animatedScale: number[];
  /**
   * 动画延迟时间
   */
  duration: number;
}

/** 底部操作类型 */
export type footOperationType = 'none' | 'onlyCancel' | 'onlyConfirm' | 'both';
