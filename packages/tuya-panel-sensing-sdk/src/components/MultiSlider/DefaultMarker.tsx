import React, { FC } from 'react';
import { View, StyleSheet, Platform, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';

export interface IDefaultMarker {
  enabled: boolean;
  pressed: any;
  pressedMarkerStyle: StyleProp<ViewStyle>;
  markerStyle: StyleProp<ViewStyle>;
  disabledMarkerStyle: StyleProp<ViewStyle>;
  size: number;
}

const DefaultMarker: FC<IDefaultMarker> = props => {
  const { enabled, pressed, pressedMarkerStyle, markerStyle, disabledMarkerStyle, size } = props;
  return (
    <TouchableHighlight>
      <View
        style={
          enabled
            ? [
                styles.markerStyle,
                {
                  width: size * 2,
                  height: size * 2,
                },
                markerStyle,
                pressed && styles.pressedMarkerStyle,
                pressed && pressedMarkerStyle,
              ]
            : [styles.markerStyle, styles.disabled, disabledMarkerStyle]
        }
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: '#77B7FF',
  },
  markerStyle: {
    ...Platform.select({
      ios: {
        height: 24,
        width: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#77B7FF',
        backgroundColor: '#77B7FF',
        shadowColor: '#77B7FF',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
      },
      android: {
        height: 24,
        width: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#77B7FF',
        backgroundColor: '#77B7FF',
        shadowColor: '#77B7FF',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
      },
      web: {
        height: 24,
        width: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#77B7FF',
        backgroundColor: '#77B7FF',
        shadowColor: '#77B7FF',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
      },
    }),
  },
  pressedMarkerStyle: {
    ...Platform.select({
      web: {},
      ios: {},
      android: {
        height: 20,
        width: 20,
        borderRadius: 20,
      },
    }),
  },
});

export default DefaultMarker;
