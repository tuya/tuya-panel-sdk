import React from 'react';
import {
  StyleSheet,
  PanResponder,
  View,
  Platform,
  I18nManager,
  ImageBackground,
  ViewStyle,
  PanResponderGestureState,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';
import DefaultMarker from './DefaultMarker';
import DefaultLabel from './DefaultLabel';
import { createArray, valueToPosition, positionToValue } from './converters';

export interface MarkerProps {
  pressed: boolean;
  pressedMarkerStyle: ViewStyle;
  markerStyle: ViewStyle;
  enabled: boolean;
  currentValue: number;
  valuePrefix: string;
  valueSuffix: string;
  disabledMarkerStyle?: StyleProp<ViewStyle>;
  size: number;
}

export interface LabelProps {
  oneMarkerValue: string | number;
  twoMarkerValue: string | number;
  oneMarkerLeftPosition: number;
  twoMarkerLeftPosition: number;
  oneMarkerPressed: boolean;
  twoMarkerPressed: boolean;
  unit: string;
  labelTextColor?: string;
}

export interface MultiSliderProps {
  values?: number[];
  onValuesChange?: (values: number[]) => void;
  onValuesChangeStart?: () => void;
  onValuesChangeFinish?: (values: number[]) => void;
  sliderLength?: number;
  touchDimensions?: {
    height: number;
    width: number;
    borderRadius: number;
    slipDisplacement: number;
  };
  customMarker?: React.ComponentType<MarkerProps>;
  customMarkerLeft?: React.ComponentType<MarkerProps>;
  customMarkerRight?: React.ComponentType<MarkerProps>;
  customLabel?: React.ComponentType<LabelProps>;
  isMarkersSeparated?: boolean;
  min?: number;
  max?: number;
  step?: number;
  optionsArray?: number[];
  containerStyle?: ViewStyle;
  trackStyle?: ViewStyle;
  selectedStyle?: ViewStyle;
  unselectedStyle?: ViewStyle;
  markerContainerStyle?: ViewStyle;
  markerStyle?: ViewStyle;
  pressedMarkerStyle?: ViewStyle;
  valuePrefix?: string;
  valueSuffix?: string;
  enabledOne?: boolean;
  enabledTwo?: boolean;
  onToggleOne?: () => void;
  onToggleTwo?: () => void;
  allowOverlap?: boolean;
  snapped?: boolean;
  markerOffsetX?: number;
  markerOffsetY?: number;
  minMarkerOverlapDistance?: number;
  imageBackgroundSource?: string;
  enableLabel?: boolean;
  vertical?: boolean;
  unit?: string;
  onMarkersPosition?: (position: [number, number]) => void;
  size?: number;
  disabledMarkerStyle?: StyleProp<ViewStyle>;
  labelTextColor?: string;
}

interface MultiSliderState {
  valueOne: number;
  valueTwo: number;
  pastOne: number;
  pastTwo: number;
  positionOne: number;
  positionTwo: number;
  pressedOne?: boolean;
  onePressed?: boolean;
  twoPressed?: boolean;
}

export default class MultiSlider extends React.Component<MultiSliderProps, MultiSliderState> {
  static defaultProps = {
    values: [0],
    onValuesChangeStart: () => undefined,
    onValuesChange: () => undefined,
    onValuesChangeFinish: () => undefined,
    onMarkersPosition: () => undefined,
    step: 1,
    min: 0,
    max: 10,
    touchDimensions: {
      height: 50,
      width: 50,
      borderRadius: 15,
      slipDisplacement: 200,
    },
    customMarker: DefaultMarker as any,
    customMarkerLeft: DefaultMarker as any,
    customMarkerRight: DefaultMarker as any,
    customLabel: DefaultLabel as any,
    markerOffsetX: 0,
    markerOffsetY: 0,
    sliderLength: 280,
    onToggleOne: undefined,
    onToggleTwo: undefined,
    enabledOne: true,
    enabledTwo: true,
    allowOverlap: false,
    snapped: false,
    vertical: false,
    minMarkerOverlapDistance: 0,
    size: 0,
    labelTextColor: '#ffffff',
  };

  constructor(props: MultiSliderProps) {
    super(props);

    const { sliderLength = 280, values = [1, 100], min = 0, max = 10, step = 1, size = 0 } = props;
    this.optionsArray = props.optionsArray || createArray(min, max, step);
    this.stepLength = sliderLength / this.optionsArray.length;
    const initialValues = values?.map((value, index) =>
      valueToPosition(value, this.optionsArray, sliderLength, index === 0 ? size : -size)
    );

    this.state = {
      valueOne: values[0],
      valueTwo: values[1],
      pastOne: initialValues[0],
      pastTwo: initialValues[1],
      positionOne: initialValues[0],
      positionTwo: initialValues[1],
    };

    this.subscribePanResponder();
  }

  componentDidUpdate(prevProps: MultiSliderProps, prevState: MultiSliderState) {
    const { positionOne: prevPositionOne, positionTwo: prevPositionTwo } = prevState;
    const { positionOne, positionTwo, onePressed, twoPressed } = this.state;
    const {
      onMarkersPosition,
      min = 0,
      max = 10,
      step = 1,
      values = [],
      sliderLength = 280,
      optionsArray,
      size = 0,
    } = this.props;

    const { values: preValues = [] } = prevProps;

    if (typeof positionOne === 'undefined' && typeof positionTwo !== 'undefined') {
      return;
    }

    if (positionOne !== prevPositionOne || positionTwo !== prevPositionTwo) {
      onMarkersPosition && onMarkersPosition([positionOne, positionTwo]);
    }

    if (onePressed || twoPressed) {
      return;
    }

    const nextState = Object.create({});

    if (
      prevProps.min !== min ||
      prevProps.max !== max ||
      prevProps.step !== step ||
      preValues[0] !== values[0] ||
      prevProps.sliderLength !== sliderLength ||
      preValues[1] !== values[1] ||
      (prevProps.sliderLength !== sliderLength && preValues[1])
    ) {
      this.optionsArray = optionsArray || createArray(min, max, step);

      this.stepLength = sliderLength / this.optionsArray.length;

      // eslint-disable-next-line no-shadow
      const positionOne = valueToPosition(values[0], this.optionsArray, sliderLength, size);

      nextState.valueOne = values[0];
      nextState.pastOne = positionOne;
      nextState.positionOne = positionOne;
      // eslint-disable-next-line no-shadow
      const positionTwo = valueToPosition(values[1], this.optionsArray, sliderLength, -size);
      nextState.valueTwo = values[1];
      nextState.pastTwo = positionTwo;
      nextState.positionTwo = positionTwo;

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(nextState);
    }
  }

  optionsArray: any;

  stepLength: number;

  _panResponderBetween: any;

  _panResponderOne: any;

  _panResponderTwo: any;

  _markerOne: View | null | undefined;

  _markerTwo: View | null | undefined;

  subscribePanResponder = () => {
    const customPanResponder = (start: any, move: any, end: any) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => start(),
        onPanResponderMove: (_, gestureState) => move(gestureState),
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_, gestureState) => end(gestureState),
        onPanResponderTerminate: (_, gestureState) => end(gestureState),
        onShouldBlockNativeResponder: () => true,
      });
    };

    this._panResponderBetween = customPanResponder(
      (gestureState: PanResponderGestureState) => {
        this.startOne(gestureState);
        this.startTwo(gestureState);
      },
      (gestureState: PanResponderGestureState) => {
        this.moveOne(gestureState);
        this.moveTwo(gestureState);
      },
      (gestureState: PanResponderGestureState) => {
        this.endOne(gestureState);
        this.endTwo(gestureState);
      }
    );

    this._panResponderOne = customPanResponder(this.startOne, this.moveOne, this.endOne);
    this._panResponderTwo = customPanResponder(this.startTwo, this.moveTwo, this.endTwo);
  };

  startOne = (ges?: PanResponderGestureState) => {
    const { enabledOne, onValuesChangeStart } = this.props;
    const { onePressed } = this.state;
    if (enabledOne) {
      onValuesChangeStart && onValuesChangeStart();
      this.setState({
        onePressed: !onePressed,
      });
    }
  };

  startTwo = (ges?: PanResponderGestureState) => {
    const { enabledTwo, onValuesChangeStart } = this.props;
    const { twoPressed } = this.state;
    if (enabledTwo) {
      onValuesChangeStart && onValuesChangeStart();
      this.setState({
        twoPressed: !twoPressed,
      });
    }
  };

  moveOne = (gestureState: PanResponderGestureState) => {
    const {
      enabledOne,
      vertical,
      allowOverlap = false,
      minMarkerOverlapDistance,
      sliderLength,
      touchDimensions,
      onMarkersPosition,
      onValuesChange,
      size,
    } = this.props;
    const { pastOne, positionTwo, valueOne, valueTwo, positionOne } = this.state;
    const { slipDisplacement } = touchDimensions!;
    if (!enabledOne) {
      return;
    }

    const accumDistance = vertical ? -gestureState.dy : gestureState.dx;
    const accumDistanceDisplacement = vertical ? gestureState.dx : gestureState.dy;

    const unconfined = I18nManager.isRTL ? pastOne - accumDistance : accumDistance + pastOne;

    const bottom = 0;
    const trueTop =
      positionTwo -
      (allowOverlap
        ? 0
        : minMarkerOverlapDistance! > 0
        ? minMarkerOverlapDistance!
        : this.stepLength!);
    const top = trueTop === 0 ? 0 : trueTop || sliderLength;
    const confined = unconfined < +bottom ? +bottom : unconfined > top! ? top : unconfined;

    if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
      const value = positionToValue(confined!, this.optionsArray, sliderLength!);
      const snapped = valueToPosition(value!, this.optionsArray, sliderLength!, size!);

      this.setState({
        positionOne: this.props.snapped ? snapped + size! : confined! + size!,
      });

      if (value !== valueOne) {
        this.setState(
          {
            valueOne: value!,
          },
          () => {
            const change = [valueOne];
            if (valueTwo) {
              change.push(valueTwo);
            }
            onValuesChange && onValuesChange(change);

            onMarkersPosition && onMarkersPosition([positionOne, positionTwo]);
          }
        );
      }
    }
  };

  moveTwo = (gestureState: PanResponderGestureState) => {
    const { pastTwo, positionOne, valueTwo, valueOne, positionTwo } = this.state;
    const {
      onMarkersPosition,
      onValuesChange,
      enabledTwo,
      vertical,
      allowOverlap = false,
      minMarkerOverlapDistance = 0,
      sliderLength,
      touchDimensions,
      size,
    } = this.props;
    if (!enabledTwo) {
      return;
    }

    const accumDistance = vertical ? -gestureState.dy : gestureState.dx;
    const accumDistanceDisplacement = vertical ? gestureState.dx : gestureState.dy;

    const unconfined = I18nManager.isRTL ? pastTwo - accumDistance : accumDistance + pastTwo;
    const bottom =
      positionOne +
      (allowOverlap
        ? 0
        : minMarkerOverlapDistance > 0
        ? minMarkerOverlapDistance
        : this.stepLength);
    const top = sliderLength;
    const confined = unconfined < +bottom ? +bottom : unconfined > top! ? top : unconfined;
    const { slipDisplacement } = touchDimensions!;

    if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
      const value = positionToValue(confined!, this.optionsArray, sliderLength!);

      const snapped = valueToPosition(value!, this.optionsArray, sliderLength!, -size!);

      this.setState({
        positionTwo: this.props.snapped ? snapped - size! : confined! - size!,
      });

      if (value !== valueTwo) {
        this.setState(
          {
            valueTwo: value!,
          },
          () => {
            onValuesChange && onValuesChange([valueOne, valueTwo]);

            onMarkersPosition && onMarkersPosition([positionOne, positionTwo]);
          }
        );
      }
    }
  };

  endOne = (gestureState: PanResponderGestureState) => {
    const { positionOne, onePressed, valueOne, valueTwo } = this.state;
    const { onToggleOne, onValuesChangeFinish } = this.props;
    if (gestureState.moveX === 0 && onToggleOne) {
      onToggleOne();
      return;
    }

    this.setState(
      {
        pastOne: positionOne,
        onePressed: !onePressed,
      },
      () => {
        const change = [valueOne];
        if (valueTwo) {
          change.push(valueTwo);
        }
        onValuesChangeFinish && onValuesChangeFinish(change);
      }
    );
  };

  endTwo = (gestureState: PanResponderGestureState) => {
    const { positionTwo, twoPressed, valueOne, valueTwo } = this.state;
    const { onToggleTwo, onValuesChangeFinish } = this.props;
    if (gestureState.moveX === 0 && onToggleTwo) {
      onToggleTwo();
      return;
    }

    this.setState(
      {
        twoPressed: !twoPressed,
        pastTwo: positionTwo,
      },
      () => {
        onValuesChangeFinish && onValuesChangeFinish([valueOne, valueTwo]);
      }
    );
  };

  render() {
    const { positionOne, positionTwo, onePressed, valueOne, twoPressed, valueTwo } = this.state;
    const {
      selectedStyle,
      unselectedStyle,
      sliderLength = 280,
      markerOffsetX,
      markerOffsetY,
      values = [],
      customMarker,
      customMarkerLeft,
      customMarkerRight,
      isMarkersSeparated = false,
      customLabel,
      touchDimensions,
      vertical,
      trackStyle,
      markerContainerStyle,
      enabledOne,
      markerStyle,
      pressedMarkerStyle,
      disabledMarkerStyle,
      valuePrefix,
      valueSuffix,
      enabledTwo,
      enableLabel,
      unit,
      imageBackgroundSource,
      size,
      labelTextColor,
    } = this.props;
    const twoMarkers = +values.length === 2; // when allowOverlap, positionTwo could be 0, identified as string '0' and throwing 'RawText 0 needs to be wrapped in <Text>' error

    const trackOneLength = positionOne;
    const trackOneStyle = twoMarkers ? unselectedStyle : selectedStyle || styles.selectedTrack;
    const trackThreeLength = twoMarkers ? sliderLength - positionTwo : 0;
    const trackThreeStyle = unselectedStyle;
    const trackTwoLength = sliderLength - trackOneLength - trackThreeLength;
    const trackTwoStyle = twoMarkers ? selectedStyle || styles.selectedTrack : unselectedStyle;
    const Marker = customMarker!;

    const MarkerLeft = customMarkerLeft!;
    const MarkerRight = customMarkerRight!;

    const Label = customLabel!;

    const { slipDisplacement, height, width, borderRadius } = touchDimensions!;
    const touchStyle = {
      borderRadius: borderRadius || 0,
    };

    const markerContainerOne = {
      top: markerOffsetY! - 24,
      left: Number.isNaN(trackOneLength + markerOffsetX! - 24)
        ? 0
        : trackOneLength + markerOffsetX! - 24,
    };

    const markerContainerTwo = {
      top: Number.isNaN(markerOffsetY! - 24) ? 0 : markerOffsetY! - 24,
      right: trackThreeLength - markerOffsetX! - 24,
    };

    const containerStyle = [styles.container, this.props.containerStyle];

    if (vertical) {
      containerStyle.push({
        transform: [{ rotate: '-90deg' }],
      });
    }

    const body = (
      <>
        <View style={[styles.fullTrack, { width: Number.isNaN(sliderLength) ? 0 : sliderLength }]}>
          <View style={[styles.track, trackStyle, trackOneStyle, { width: trackOneLength }]} />
          <View
            style={[
              styles.track,
              trackStyle,
              trackTwoStyle,
              { width: Number.isNaN(trackTwoLength) ? 0 : trackTwoLength },
            ]}
            {...(twoMarkers ? this._panResponderBetween.panHandlers : {})}
          />
          {twoMarkers && (
            <View
              style={[styles.track, trackStyle, trackThreeStyle, { width: trackThreeLength }]}
            />
          )}
          <View
            style={[
              styles.markerContainer,
              markerContainerOne,
              markerContainerStyle,
              positionOne > sliderLength / 2 && styles.topMarkerContainer,
            ]}
          >
            <View
              style={[styles.touch, touchStyle]}
              ref={component => {
                this._markerOne = component;
                return false;
              }}
              {...this._panResponderOne.panHandlers}
            >
              {isMarkersSeparated === false ? (
                <Marker
                  enabled={enabledOne!}
                  pressed={onePressed!}
                  markerStyle={markerStyle!}
                  pressedMarkerStyle={pressedMarkerStyle!}
                  disabledMarkerStyle={disabledMarkerStyle!}
                  currentValue={valueOne}
                  valuePrefix={valuePrefix!}
                  valueSuffix={valueSuffix!}
                  size={12}
                />
              ) : (
                <MarkerLeft
                  enabled={enabledOne!}
                  pressed={onePressed!}
                  markerStyle={markerStyle!}
                  pressedMarkerStyle={pressedMarkerStyle!}
                  disabledMarkerStyle={disabledMarkerStyle!}
                  currentValue={valueOne}
                  valuePrefix={valuePrefix!}
                  valueSuffix={valueSuffix!}
                  size={12}
                />
              )}
            </View>
          </View>
          {twoMarkers && positionOne !== sliderLength && (
            <View style={[styles.markerContainer, markerContainerTwo, markerContainerStyle]}>
              <View
                style={[styles.touch, touchStyle]}
                ref={component => {
                  this._markerTwo = component;
                  return false;
                }}
                {...this._panResponderTwo.panHandlers}
              >
                {isMarkersSeparated === false ? (
                  <Marker
                    pressed={twoPressed!}
                    markerStyle={markerStyle!}
                    pressedMarkerStyle={pressedMarkerStyle!}
                    disabledMarkerStyle={disabledMarkerStyle!}
                    currentValue={valueTwo}
                    enabled={enabledTwo!}
                    valuePrefix={valuePrefix!}
                    valueSuffix={valueSuffix!}
                    size={12}
                  />
                ) : (
                  <MarkerRight
                    pressed={twoPressed!}
                    markerStyle={markerStyle!}
                    pressedMarkerStyle={pressedMarkerStyle!}
                    disabledMarkerStyle={disabledMarkerStyle!}
                    currentValue={valueTwo!}
                    enabled={enabledTwo!}
                    valuePrefix={valuePrefix!}
                    valueSuffix={valueSuffix!}
                    size={12}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </>
    );

    return (
      <View>
        {enableLabel && (
          <Label
            oneMarkerValue={valueOne}
            twoMarkerValue={valueTwo}
            oneMarkerLeftPosition={positionOne}
            twoMarkerLeftPosition={positionTwo}
            oneMarkerPressed={onePressed!}
            twoMarkerPressed={twoPressed!}
            unit={unit!}
            labelTextColor={labelTextColor}
          />
        )}
        {imageBackgroundSource && (
          <ImageBackground
            source={imageBackgroundSource as ImageSourcePropType}
            style={[{ width: '100%', height: '100%' }, containerStyle]}
          >
            {body}
          </ImageBackground>
        )}
        {!imageBackgroundSource && <View style={containerStyle}>{body}</View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  fullTrack: {
    flexDirection: 'row',
  },
  markerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    width: 48,
  },

  selectedTrack: {
    ...Platform.select({
      ios: {
        backgroundColor: '#095FFF',
      },
      android: {
        backgroundColor: '#0D8675',
      },
      web: {
        backgroundColor: '#095FFF',
      },
    }),
  },
  topMarkerContainer: {
    zIndex: 1,
  },
  touch: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  track: {
    ...Platform.select({
      ios: {
        height: 6,
        borderRadius: 6,
        backgroundColor: '#3D3E43',
      },
      android: {
        height: 6,
        borderRadius: 6,
        backgroundColor: '#3D3E43',
      },
      web: {
        height: 6,
        borderRadius: 6,
        backgroundColor: '#3D3E43',
      },
    }),
  },
});
