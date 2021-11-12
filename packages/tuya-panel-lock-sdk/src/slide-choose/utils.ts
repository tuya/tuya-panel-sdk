import { ViewStyle } from 'react-native';
import { LinearGradientColorType } from './interface';

export const getLinearGradientParams = (
  obj: LinearGradientColorType
): { linearProps: { [key: string]: string }; stops: { [key: string]: string } } => {
  const linearProps = {
    x1: '0%',
    y1: '50%',
    x2: '100%',
    y2: '50%',
  };

  const stops = {
    '0%': '#fff',
    '100%': '#fff',
  };

  if (typeof obj === 'string') {
    return { linearProps, stops: { '0%': obj, '100%': obj } };
  }

  return { linearProps: obj.linearGradient || linearProps, stops: obj.linearStops || stops };
};

export const getBarStyle = (singleSide: string | boolean, isLeft: boolean): ViewStyle => {
  const radius = 26;
  if (singleSide) {
    return {
      borderBottomLeftRadius: radius,
      borderTopLeftRadius: radius,
      borderBottomRightRadius: radius,
      borderTopRightRadius: radius,
    };
  }
  if (isLeft) {
    return { borderBottomLeftRadius: radius, borderTopLeftRadius: radius };
  }
  return { borderBottomRightRadius: radius, borderTopRightRadius: radius };
};

export const gethandleStyle = (singleSide: string | boolean): ViewStyle => {
  if (singleSide) {
    if (singleSide === 'right') {
      return { right: 0 };
    }
    return { left: 0 };
  }
  return {};
};

export const getArrowWaveNum = (
  showArrow: boolean | number,
  singleSide: boolean | string
): number => {
  const defaultArrowNum = 3;
  const defaultSingleSideNum = 6;
  if (showArrow && typeof showArrow === 'number') {
    return showArrow;
  }

  if (singleSide) return defaultSingleSideNum;
  return defaultArrowNum;
};
