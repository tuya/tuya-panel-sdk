import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, NativeComponent } from 'react-native';

interface IProps {
  img?: any;
  color: string;
  size?: number;
  x: number;
  y: number;
  disabled?: boolean;
}

export default class Thumb extends Component<IProps> {
  componentWillReceiveProps(nextProps: IProps) {
    this.animateX.setValue(nextProps.x);
    this.animateY.setValue(nextProps.y);
  }

  setNativeProps(props: IProps) {
    const { x, y, color } = props;
    if (typeof x === 'number') {
      this.animateX.setValue(x);
    }
    if (typeof y === 'number') {
      this.animateY.setValue(y);
    }
    if (typeof color === 'string') {
      this.previewRef.setNativeProps({
        style: {
          backgroundColor: color,
        },
      });
    }
  }

  private animateX = new Animated.Value(this.props.x);
  private animateY = new Animated.Value(this.props.y);
  private previewRef: NativeComponent;

  render() {
    const { color, size, img } = this.props;
    const maskWidth = (size / 38) * 62;
    const halfWidth = maskWidth / 2;
    return (
      <Animated.View
        style={[
          styles.thumb,
          {
            top: -halfWidth,
            left: -halfWidth,
            width: maskWidth,
            height: maskWidth,
            transform: [{ translateX: this.animateX }, { translateY: this.animateY }],
          },
        ]}
      >
        <View
          ref={(ref: NativeComponent) => {
            this.previewRef = ref;
          }}
          style={{ borderRadius: size / 2, width: size, height: size, backgroundColor: color }}
        />
        <Image
          source={img}
          style={[StyleSheet.absoluteFill, { width: maskWidth, height: maskWidth }]}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
