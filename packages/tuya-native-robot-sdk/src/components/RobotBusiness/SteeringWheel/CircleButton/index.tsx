import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  PanResponderGestureState,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import CircleGesture, { CircleGestureCustomEvent, CircleGestureProps } from '../../../Basic/CircleGesture';

interface IProps extends CircleGestureProps {
  Extends?: TouchableOpacity | TouchableWithoutFeedback;
  children?: any;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export default class CircleButton extends CircleGesture<
  IProps & (TouchableWithoutFeedbackProps | TouchableOpacityProps),
  any
> {
  static defaultProps = {
    ...CircleGesture.defaultProps,

    Extends: TouchableOpacity,
  };

  onShouldSetPanResponder(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    customEvent: CircleGestureCustomEvent
  ) {
    const { distance, radius } = customEvent;
    return distance > radius;
  }

  onTerminationRequest(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    customEvent: CircleGestureCustomEvent
  ) {
    const { distance, radius } = customEvent;
    return distance > radius;
  }

  render() {
    const { Extends, wrapperStyle, style, children, radius, ...fProps } = this.props;
    const circleStyle = { width: radius * 2, height: radius * 2, borderRadius: radius };
    return (
      <Extends style={[circleStyle, wrapperStyle]} {...fProps}>
        <View
          style={[circleStyle, styles.center, style]}
          onLayout={this.onLayout}
          {...this.panResponder.panHandlers}
        >
          {children}
        </View>
      </Extends>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
