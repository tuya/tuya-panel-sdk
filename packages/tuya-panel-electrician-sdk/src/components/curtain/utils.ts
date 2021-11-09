/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PanResponder, StyleSheet, StyleProp, Animated } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { CurtainType, StyleType, PanResponderHandler, CurtainGestureTag } from './index.type';

const { convertX: cx } = Utils.RatioUtils;

export interface Option {
  min: number;
  max: number;
  staticPrefix: string;
}

export interface InterpolateValue {
  inputRange: number[];
  outputRange: number[];
}

export interface OptionResult {
  container?: StyleProp<any>;
  curtain: StyleProp<any>;
  circle?: StyleProp<any>;
  bg?: StyleProp<any>;
  curtainWrap: StyleProp<any>;
  topContainerStyle?: StyleProp<any>;
  curtainImg?: string;
  bgImg?: string;
  curtainWidth: number;
  circleType?: 'arrow' | 'normal' | string;
  curtainInterpolate?: InterpolateValue;
  circleLeftInterpolate?: InterpolateValue;
  circleRightInterpolate?: InterpolateValue;
  getCurtainInterpolate?: (animate: Animated.Value) => void;
  shouldCircleFlip?: boolean;
}

export const getBorderLimit = (max: number, min: number, maxHeight: number, borderSize: number) => {
  const size = borderSize * 2;
  return ((maxHeight - size) / maxHeight) * (max - min);
};

const styles = StyleSheet.create({
  trietexCurtainWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(244),
    justifyContent: 'space-between',
    position: 'absolute',
    width: cx(289),
  },
});

// 扁平风格常量
const FLAT_CURTAIN_HEIGHT = cx(200);
const FLAT_TOP_HEIGHT = cx(56);
const FLAT_UN_ROLLER_CURTAIN_WIDTH = cx(272);
const FLAT_CURTAIN_RADIUS = cx(16);

// 写实风格常量
const ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT = cx(288);
const ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX = cx(20);

// 通用常量
const ARROW_CIRCLE_BORDER_SIZE = cx(36);

// Circle样式
const ARROW_CIRCLE = {
  width: ARROW_CIRCLE_BORDER_SIZE,
  height: ARROW_CIRCLE_BORDER_SIZE,
  borderRadius: ARROW_CIRCLE_BORDER_SIZE / 2,
  top: cx(82),
  backgroundColor: '#fff',
  position: 'absolute',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
};

const BORDER_CIRCLE = {
  width: ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX,
  height: ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX,
  borderRadius: ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX / 2,
  borderWidth: cx(4),
  borderColor: '#fff',
  backgroundColor: '#4e71b7',
  position: 'absolute',
  top: 0,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
};

// 扁平风格样式
const FLAT_UN_ROLLER_CONTAINER = {
  alignItems: 'center',
  width: FLAT_UN_ROLLER_CURTAIN_WIDTH,
  height: FLAT_CURTAIN_HEIGHT,
  justifyContent: 'flex-start',
  backgroundColor: '#fff',
  borderBottomLeftRadius: FLAT_CURTAIN_RADIUS,
  borderBottomRightRadius: FLAT_CURTAIN_RADIUS,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 2,
};
const FLAT_UN_ROLLER_TOP_CONTAINER = {
  backgroundColor: '#00B294',
  height: FLAT_TOP_HEIGHT,
  width: FLAT_UN_ROLLER_CURTAIN_WIDTH,
  borderTopRightRadius: FLAT_CURTAIN_RADIUS,
  borderTopLeftRadius: FLAT_CURTAIN_RADIUS,
};
const FLAT_UN_ROLLER_CURTAIN = {
  height: FLAT_CURTAIN_HEIGHT,
  alignSelf: 'center',
  position: 'absolute',
  backgroundColor: '#00B294',
  opacity: 0.8,
};
const FLAT_UN_ROLLER_CURTAIN_WRAP = [
  styles.trietexCurtainWrap,
  { width: FLAT_UN_ROLLER_CURTAIN_WIDTH, height: FLAT_CURTAIN_HEIGHT },
];

// 写实风格样式
const ZOOSEMY_UN_ROLLER_CURTAIN = {
  height: cx(244),
  position: 'absolute',
};
const ZOOSEMY_UN_ROLLER_BG = { width: cx(340), height: cx(250) };

// 配置
const FLAT_UN_ROLLER_OPTIONS = {
  container: FLAT_UN_ROLLER_CONTAINER,
  topContainerStyle: FLAT_UN_ROLLER_TOP_CONTAINER,
  curtainWidth: FLAT_UN_ROLLER_CURTAIN_WIDTH,
  curtain: FLAT_UN_ROLLER_CURTAIN,
  circle: ARROW_CIRCLE,
  curtainWrap: FLAT_UN_ROLLER_CURTAIN_WRAP,
  circleType: 'arrow',
};
const ZOOSEMY_UN_ROLLER_OPTIONS = {
  curtainWidth: ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT,
  curtain: ZOOSEMY_UN_ROLLER_CURTAIN,
  circle: BORDER_CIRCLE,
  bg: ZOOSEMY_UN_ROLLER_BG,
  curtainWrap: styles.trietexCurtainWrap,
};

export const getOptionsByType = (
  curtainType: CurtainType,
  styleType: StyleType,
  options: Option
): OptionResult => {
  const { min, max, staticPrefix } = options;
  const style = {
    flat: {
      oneSide: {
        ...FLAT_UN_ROLLER_OPTIONS,
        getCurtainInterpolate: animate => ({
          width: animate.interpolate({
            inputRange: [0, max - min],
            outputRange: [ARROW_CIRCLE_BORDER_SIZE, FLAT_UN_ROLLER_CURTAIN_WIDTH],
          }),
          borderBottomLeftRadius: FLAT_CURTAIN_RADIUS,
          borderBottomRightRadius: FLAT_CURTAIN_RADIUS,
        }),
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [ARROW_CIRCLE_BORDER_SIZE / 2, cx(254)],
        },
      },
      roller: {
        container: {
          ...FLAT_UN_ROLLER_CONTAINER,
          width: cx(180),
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 3,
          elevation: 2,
        },
        shouldCircleFlip: true,
        topContainerStyle: { ...FLAT_UN_ROLLER_TOP_CONTAINER, width: cx(180) },
        getCurtainInterpolate: animate => ({
          height: animate.interpolate({
            inputRange: [0, max - min],
            outputRange: [ARROW_CIRCLE_BORDER_SIZE / 2, FLAT_CURTAIN_HEIGHT],
          }),
          borderBottomLeftRadius: animate.interpolate({
            inputRange: [
              0,
              getBorderLimit(max, min, FLAT_CURTAIN_HEIGHT, FLAT_CURTAIN_RADIUS),
              max - min,
            ],
            outputRange: [0, 0, FLAT_CURTAIN_RADIUS],
          }),
          borderBottomRightRadius: animate.interpolate({
            inputRange: [
              0,
              getBorderLimit(max, min, FLAT_CURTAIN_HEIGHT, FLAT_CURTAIN_RADIUS),
              max - min,
            ],
            outputRange: [0, 0, FLAT_CURTAIN_RADIUS],
          }),
        }),
        curtainWidth: FLAT_CURTAIN_HEIGHT,
        curtain: {
          width: cx(180),
          alignSelf: 'center',
          position: 'absolute',
          backgroundColor: '#00B294',
          opacity: 0.8,
        },
        circleType: 'arrow',
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [cx(0), cx(182)],
        },
        circle: { ...ARROW_CIRCLE, top: 0 },
        curtainWrap: { position: 'absolute', top: 0 },
      },
      trietex: {
        ...FLAT_UN_ROLLER_OPTIONS,
        getCurtainInterpolate: animate => ({
          width: animate.interpolate({
            inputRange: [0, max - min],
            outputRange: [ARROW_CIRCLE_BORDER_SIZE, cx(136)],
          }),
          borderBottomLeftRadius: FLAT_CURTAIN_RADIUS,
          borderBottomRightRadius: FLAT_CURTAIN_RADIUS,
        }),
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [ARROW_CIRCLE_BORDER_SIZE / 2, cx(118)],
        },
      },
    },
    zoosemy: {
      oneSide: {
        curtainInterpolate: {
          inputRange: [0, max - min],
          outputRange: [ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX, ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT],
        },
        ...ZOOSEMY_UN_ROLLER_OPTIONS,
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [0, ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT - ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX],
        },
        circleRightInterpolate: {
          inputRange: [0, max - min],
          outputRange: [0, -ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT + ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX],
        },
        curtainImg: `${staticPrefix}/smart/uiconf/curtain-one-side-1@3x.png`,
        bgImg: `${staticPrefix}/smart/uiconf/curtain-bg-side-1.png`,
      },
      roller: {
        container: { alignItems: 'center' },
        curtainInterpolate: {
          inputRange: [0, max - min],
          outputRange: [ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX, cx(248)],
        },
        shouldCircleFlip: true,
        curtainWidth: cx(256),
        curtain: {
          width: cx(208),
          top: cx(24),
          alignSelf: 'center',
          position: 'absolute',
        },
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [cx(24), cx(254)],
        },
        circle: { ...ARROW_CIRCLE, top: 0 },
        circleType: 'arrow',
        bg: { width: cx(260), height: cx(302) },
        curtainWrap: { position: 'absolute', top: 0 },
        curtainImg: `${staticPrefix}/smart/uiconf/curtain_roller.ceil.png`,
        bgImg: `${staticPrefix}/smart/uiconf/curtain_roller_bg.png`,
      },
      trietex: {
        curtainInterpolate: {
          inputRange: [0, max - min],
          outputRange: [ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX, ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT / 2],
        },
        ...ZOOSEMY_UN_ROLLER_OPTIONS,
        circleLeftInterpolate: {
          inputRange: [0, max - min],
          outputRange: [0, ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT / 2 - ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX],
        },
        circleRightInterpolate: {
          inputRange: [0, max - min],
          outputRange: [
            0,
            -ZOOSEMY_UN_ROLLER_CURTAIN_HEIGHT / 2 + ZOOSEMY_UN_ROLLER_CURTAIN_PREFIX,
          ],
        },
        curtainImg: `${staticPrefix}/smart/uiconf/curtain-one-side-1@3x.png`,
        bgImg: `${staticPrefix}/smart/uiconf/curtain-bg-side-1.png`,
      },
    },
  };
  return style[styleType][curtainType];
};

export const getCurtainGestureByType = (type: CurtainType) => {
  const curtainGestures = {
    oneSide: [CurtainGestureTag.leftCurtain],
    roller: [CurtainGestureTag.leftCurtain],
    trietex: [CurtainGestureTag.leftCurtain, CurtainGestureTag.rightCurtain],
  };
  const circleGestures = {
    oneSide: [CurtainGestureTag.leftCircle],
    roller: [CurtainGestureTag.leftCircle],
    trietex: [CurtainGestureTag.leftCircle, CurtainGestureTag.rightCircle],
  };
  return [curtainGestures[type], circleGestures[type]];
};

export const createCurtainPanResponder = ({ grant, move, release }: PanResponderHandler) =>
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: grant,
    onPanResponderMove: move,
    onPanResponderRelease: release,
  });

export const parseImageSource = (img: number | string) =>
  typeof img === 'string' ? { uri: img } : img;
