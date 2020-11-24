import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
} from 'react-native';
import { IconFont, Utils } from '@tuya-rn/tuya-native-components';
import { Svg, Defs, Path, Circle, ClipPath, LinearGradient, Stop, G, Use } from 'react-native-svg';

import CircleGesture, {
  CircleGestureProps,
  CircleGestureCustomEvent,
  degreeToRadian,
  radianToDegree,
  degreeDistance,
} from '../../../Basic/CircleGesture';
import CircleButton from '../CircleButton'

const {
  ColorUtils: { color: Color },
} = Utils;

const icons = {
  arrow:
    'M512 471.3984l-135.5008 135.5008a25.6 25.6 0 0 1-36.1984-36.1984l153.6-153.6a25.6 25.6 0 0 1 36.1984 0l153.6 153.6a25.6 25.6 0 0 1-36.1984 36.1984L512 471.3984z',
  play:
    'M351.451429 190.427429l378.88 291.474285a36.571429 36.571429 0 0 1 0 57.965715L351.451429 831.268571A36.571429 36.571429 0 0 1 292.571429 802.304V219.428571a36.571429 36.571429 0 0 1 58.88-29.001142z',
  pause:
    'M329.142857 146.285714a73.142857 73.142857 0 0 1 73.142857 73.142857v585.142858a73.142857 73.142857 0 1 1-146.285714 0V219.428571a73.142857 73.142857 0 0 1 73.142857-73.142857z m365.714286 0a73.142857 73.142857 0 0 1 73.142857 73.142857v585.142858a73.142857 73.142857 0 1 1-146.285714 0V219.428571a73.142857 73.142857 0 0 1 73.142857-73.142857z',
};

function createCircleStyle(radius: number, color?: string) {
  const width = radius * 2;
  return {
    width,
    height: width,
    borderRadius: radius,
    backgroundColor: color ? color : 'transparent',
  };
}

interface ArrowItem {
  style: ViewProps;
  radian: number;
  iconSize: number;
  iconColor: string;
}

export interface CircleDiskActiveItem {
  id: number;
  radian: number;
  degree: number;
  distance?: number;
}

interface CircleDiskState {
  visible: boolean;
  degree: number;
}

interface CircleDiskProps extends CircleGestureProps {
  style?: StyleProp<ViewProps>;
  strokeWidth: number;
  strokeColor: string;
  radius: number;
  gapRadius: number;
  arrowInRadius: number;
  fillColor: string;
  count: number;
  icon: string;
  iconMap?: Array<string> | Object;
  iconSize: number;
  iconColor: string;
  sectorStops: {
    [x: string]: string;
  };
  sectorOpacity: number;
  hasInner: boolean;
  isPlaying: boolean;
  onPress(d: CircleDiskActiveItem): void;
  onPressIn(d: CircleDiskActiveItem): void;
  onPressOut(d: CircleDiskActiveItem): void;
  onPlayChange(nextPlayValue: boolean): void;
  // renderArrow?(): ReactNode;
  renderCenterElement?: () => View;
}

// tslint:disable-next-line: max-classes-per-file
export default class CircleDisk extends CircleGesture<CircleDiskProps, CircleDiskState> {
  static defaultProps = {
    ...CircleGesture.defaultProps,
    radius: 135,
    arrowInRadius: 100,
    gapRadius: 50,
    strokeWidth: 15,
    strokeColor: 'rgba(255,255,255, 0.5)',
    fillColor: '#FFFFFF',
    icon: icons.arrow,
    iconSize: 40,
    iconColor: '#666666',
    sectorStops: {
      '0%': 'rgba(156, 156, 156, 0)',
      '100%': 'rgba(160, 160, 160, 1)',
    },
    sectorOpacity: 1,
    count: 4,
    hasInner: false,
    onPlayChange() {},
    onPress() {},
    onPressIn() {},
    onPressOut() {},
  };

  sectorHref = 'sectorHref';
  areaMap: Map<number, CircleDiskActiveItem>;

  state = {
    visible: false,
    degree: 0,
  };

  activeId: number;

  constructor(props: CircleDiskProps) {
    super(props);
    const { count, radius } = props;
    this.areaMap = new Map();
    for (let index = 0; index < count; index++) {
      const stepDegree = 360 / count;
      const stepRadian = degreeToRadian(360 / count);
      const radian = index * stepRadian;
      const halfDegree = stepDegree / 2;
      const degree = radianToDegree(radian);
      const item = {
        id: index,
        radian,
        degree,
        // startDegree: (degree - halfDegree + 360) %360,
        // endDegree: (degree + halfDegree + 360) %360,
      };
      this.areaMap.set(index, item);
    }
  }

  getCurrentActiveItem(degree: number) {
    const items = [...this.areaMap.values()];

    const sorted = items
      .map(d => ({ ...d, distance: degreeDistance(degree, d.degree) }))
      .sort((a: CircleDiskActiveItem, b: CircleDiskActiveItem) => a.distance - b.distance);
    const first = sorted[0];
    this.activeId = first.id;
    return first;
  }

  onShouldSetPanResponder(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    e: CircleGestureCustomEvent
  ) {
    const { radius, gapRadius } = this.props;
    const distance = e.distance;
    return distance >= gapRadius && distance <= radius;
  }

  onGrant(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    e: CircleGestureCustomEvent
  ) {
    const { degree } = this.getCurrentActiveItem(e.degree);
    this.setState({ visible: true, degree });
    const activeItem = this.areaMap.get(this.activeId);
    activeItem && this.props.onPressIn(activeItem);
  }

  onMove(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    e: CircleGestureCustomEvent
  ) {
    const activeItem = this.areaMap.get(this.activeId);
    activeItem && this.props.onPressIn(activeItem);
  }

  onRelease(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    e: CircleGestureCustomEvent
  ) {
    const activeItem = this.areaMap.get(this.activeId);
    activeItem && this.props.onPressOut(activeItem);
    activeItem && this.props.onPress(activeItem);
    this.setState({ visible: false });
  }

  renderArrows = () => {
    const { count, iconSize, iconColor, arrowInRadius } = this.props;
    const arrows = new Array(count).fill({}).map((_, idx) => {
      const stepRadian = degreeToRadian(360 / count);
      const radian = idx * stepRadian;
      const style = this.getElementStyleByRadian(radian, arrowInRadius, iconSize / 2);
      return this.renderItem({ radian, style, iconSize, iconColor, idx });
    });

    return arrows;
  };

  getIcon(idx: number) {
    const { icon, iconMap } = this.props;
    if (iconMap) {
      return iconMap[idx] || icon;
    } else {
      return icon;
    }
  }

  renderItem = ({ radian, style, iconSize, iconColor, idx }: ArrowItem) => {
    return (
      <View key={radian} style={style}>
        <IconFont size={iconSize} d={this.getIcon(idx)} color={iconColor} />
      </View>
    );
  };

  renderSectorItem() {
    const { count, radius, strokeWidth } = this.props;
    const centerRadian = 0;
    const outerRadius = radius - strokeWidth / 2;
    const cx = radius;
    const cy = radius;
    const openRadian = degreeToRadian(360 / count);

    const { sectorStops, sectorOpacity } = this.props;
    const halfRadian = openRadian / 2;
    const startRadian = centerRadian - halfRadian;
    const endRadian = centerRadian + halfRadian;

    const { x: lx, y: ly } = this.getCurrentPositionByRadian(startRadian, 2 * cx);
    const { x: rx, y: ry } = this.getCurrentPositionByRadian(endRadian, 2 * cx);
    const { x: ax, y: ay } = this.getCurrentPositionByRadian(centerRadian, outerRadius);

    const stopView = [];
    // tslint:disable-next-line: forin
    for (const [k, v] of Object.entries(sectorStops)) {
      const [r, g, b, a = 1] = Color.decode(v);
      const stopColor = Color.rgb2hex(r, g, b);
      stopView.push(<Stop key={k} offset={k} stopColor={stopColor} stopOpacity={a} />);
    }

    const id = `clip_${centerRadian}`;
    const gradientId = `grad_${centerRadian}`;
    const largeFlag = openRadian >= Math.PI;
    return (
      <Defs>
        {!largeFlag && (
          <ClipPath id={id}>
            <Path d={`M ${lx} ${ly} L ${cx} ${cy} L ${rx} ${ry} Z`} />
          </ClipPath>
        )}
        <LinearGradient id={gradientId} x1={cx} y1={cy} x2={ax} y2={ay} originX={cx} originY={cy}>
          {stopView}
        </LinearGradient>
        <G id={this.sectorHref}>
          <Circle
            cx={cx}
            cy={cy}
            r={outerRadius}
            fill={`url(#${gradientId})`}
            clipPath={`url(#${id})`}
            opacity={sectorOpacity}
          />
        </G>
      </Defs>
    );
  }

  renderCenter = () => {
    const {
      renderCenterElement,
      gapRadius,
      radius,
      hasInner,
      isPlaying,
      iconSize,
      iconColor,
      onPlayChange,
    } = this.props;
    let element;
    if (renderCenterElement) {
      element = renderCenterElement();
    }
    if (hasInner) {
      element = (
        <CircleButton radius={gapRadius} onPress={() => onPlayChange(!isPlaying)}>
          <IconFont size={iconSize} d={!isPlaying ? icons.play : icons.pause} color={iconColor} />
        </CircleButton>
      );
    }
    if (!element) return null;
    return (
      <View style={[absCenterSelf(gapRadius, radius), styles.centerView, styles.center]}>
        {element}
      </View>
    );
  };

  render() {
    const { style, strokeColor, strokeWidth, radius, fillColor, gapRadius } = this.props;
    const halfStroke = strokeWidth / 2;
    const { visible, degree } = this.state;
    return (
      <View
        {...this.getPanHandlers()}
        onLayout={this.onLayout}
        style={[styles.root, createCircleStyle(radius), style]}
      >
        <Svg style={StyleSheet.absoluteFillObject}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - halfStroke}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </Svg>

        <Svg
          style={[
            StyleSheet.absoluteFillObject,
            { transform: [{ rotateZ: `${degree}deg` }], opacity: Number(visible) },
          ]}
        >
          {this.renderSectorItem()}
          <Use href={`#${this.sectorHref}`} />
          <Circle cx={radius} cy={radius} r={gapRadius} fill={fillColor} />
        </Svg>

        {this.renderCenter()}

        {this.renderArrows()}
      </View>
    );
  }
}

function absCenterSelf(son: number, father: number) {
  return {
    position: 'absolute',
    width: son * 2,
    height: son * 2,
    borderRadius: son,
    left: father - son,
    top: father - son,
  };
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  abs: {
    position: 'absolute',
  },
  centerView: {
    position: 'absolute',
  },
});
