/*
 * @Author: your name
 * @Date: 2021-10-22 11:22:45
 * @LastEditTime: 2021-11-04 16:52:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /000001afpy/src/components/MultiSlider/DefaultMarker.js
 */
import React, { FC } from 'react';
import { View, StyleSheet, Platform, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';

interface IDefaultMarker {
  enabled: boolean,
  pressed: any,
  pressedMarkerStyle: StyleProp<ViewStyle>,
  markerStyle: StyleProp<ViewStyle>,
  disabledMarkerStyle: StyleProp<ViewStyle>,
  size: number
}

const DefaultMarker: FC<IDefaultMarker> = props => {
  const { enabled, pressed, pressedMarkerStyle, markerStyle, disabledMarkerStyle, size } = props
  return (
    <TouchableHighlight>
      <View
        style={
          enabled
            ? [
              styles.markerStyle,
              {
                width: size * 2,
                height: size * 2
              },
              markerStyle,
              pressed && styles.pressedMarkerStyle,
              pressed && pressedMarkerStyle,
            ]
            : [
              styles.markerStyle,
              styles.disabled,
              disabledMarkerStyle,
            ]
        }
      />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  markerStyle: {
    ...Platform.select({
      ios: {
        height: 24,
        width: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#5A5A63',
        backgroundColor: '#5A5A63',
        shadowColor: '#5A5A63',
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
        borderColor: '#5A5A63',
        backgroundColor: '#5A5A63',
        shadowColor: '#5A5A63',
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
        borderColor: '#5A5A63',
        backgroundColor: '#5A5A63',
        shadowColor: '#5A5A63',
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
  disabled: {
    backgroundColor: '#d3d3d3',
  },
});

export default DefaultMarker;
