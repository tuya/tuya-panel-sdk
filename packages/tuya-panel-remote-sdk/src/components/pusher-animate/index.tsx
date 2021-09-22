import React, { Component } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import { MainProps, MainState, Size } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const ANIMATETIME = 4;

/* eslint-disable react/prefer-stateless-function */
class PusherAnimate extends Component<MainProps, MainState> {
  static defaultProps = {
    style: null,
    width: cx(250),
    height: cx(280),
    windowWidth: cx(230),
    windowHeight: cx(257),
    range: [0, 30],
    studdleOffset: 0,
    type: null,
    borderImage: null,
    borderImageStyle: null,
    windowImage: null,
    windowImageStyle: null,
    rodBottom: null,
    rodTop: null,
  };

  // eslint-disable-next-line react/sort-comp
  bordersize: Size;
  windowSize: Size;
  pushAnimateStart: (degree: number) => any;
  constructor(props: MainProps) {
    super(props);
    this.state = {
      matrix: MatrixMath.createIdentityMatrix(),
      degree: new Animated.Value(0),
    };
    this.bordersize = {
      height: props.height,
      width: props.width,
    };
    this.windowSize = {
      height: props.windowHeight,
      width: props.windowWidth,
    };
    this.pushAnimateStart = degree =>
      Animated.timing(this.state.degree, {
        toValue: degree,
        duration: ANIMATETIME * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      });
  }

  componentDidMount() {
    const { range } = this.props;
    const min = range[0];
    const max = Math.min(range[1], 60);
    const degree = (min + max) / 2;
    this.setState({
      degree: new Animated.Value(-degree),
    });
    this.setMatrix(-degree);
  }

  componentWillReceiveProps(nextProps: MainProps) {
    const { type, range } = nextProps;
    const { degree } = this.state;
    const min = range[0];
    const max = Math.min(range[1], 60);
    if (type === 'close') {
      this.pushAnimateStart(min).start();
    }
    if (type === 'open') {
      this.pushAnimateStart(-max).start();
    }
    if (type === 'pause') {
      this.state.degree.stopAnimation();
      this.state.degree.setValue(degree._value);
    }
    this.state.degree.addListener((e: any) => {
      this.setMatrix(e.value);
    });
  }

  componentWillUnmount() {
    this.state.degree.stopAnimation();
  }

  setMatrix = (degree: number) => {
    const { height } = this.props;
    const matrix: number[] = [];
    const moveTo = MatrixMath.createIdentityMatrix();
    const moveReverse = moveTo.concat();
    const rotate = moveTo.concat();
    const x = 0;
    const y = height;
    // 旋转的角度
    const degreeValue = degree * (Math.PI / 180);
    /* 
      translateX:0
      translateY:-height
      translateZ:0
    */
    MatrixMath.reuseTranslate3dCommand(rotate, x, -y, 0);
    /* 
      透视
      prespective:cx(900)
      离屏幕900px 的地方观看这个元素
    */
    MatrixMath.reusePerspectiveCommand(moveTo, cx(900));
    /* 
      translateX:0
      translateY:height
      translateZ:0
    */
    MatrixMath.reuseTranslate3dCommand(moveReverse, -x, y, 0);
    // 旋转动画
    // RotateX
    MatrixMath.reuseRotateXCommand(rotate, degreeValue);
    // 组合多个变换，输出最后结果
    MatrixMath.multiplyInto(matrix, moveTo, rotate);
    MatrixMath.multiplyInto(matrix, matrix, moveReverse);
    this.setState({
      matrix,
    });
  };

  render() {
    const {
      style,
      borderImage,
      borderImageStyle,
      windowImage,
      windowImageStyle,
      studdleOffset,
      rodBottom,
      rodTop,
    } = this.props;
    const { windowSize, bordersize } = this;
    return (
      <View style={[styles.main, bordersize, style]}>
        <View style={[bordersize, !borderImage ? { borderWidth: 1 } : null]}>
          {!!borderImage && (
            <Image source={borderImage} style={[styles.border, bordersize, borderImageStyle]} />
          )}
        </View>
        <View
          style={[
            styles.windowMain,
            windowSize,
            !windowImage ? { borderWidth: 1 } : null,
            windowImage ? { borderColor: 'transparent' } : null,
          ]}
        >
          <Animated.View
            style={[
              {
                transform: [
                  {
                    matrix: this.state.matrix,
                  },
                ],
                alignItems: 'center',
              },
              { ...windowSize, height: windowSize.height * 2 },
            ]}
          >
            <View
              style={[
                { ...windowSize, height: windowSize.height },
                !windowImage ? { borderWidth: 1 } : null,
              ]}
            >
              {!!windowImage && (
                <Image source={windowImage} style={[styles.window, windowSize, windowImageStyle]} />
              )}
            </View>
            <View
              style={[
                styles.holder,
                { top: windowSize.height - studdleOffset },
                !rodBottom || !rodTop
                  ? { borderWidth: 1, width: cx(30), height: windowSize.height * 2 }
                  : null,
              ]}
            >
              {rodBottom && rodTop && (
                <View style={{ position: 'absolute', alignItems: 'center' }}>
                  <Image source={rodTop} />
                  <Image
                    source={rodBottom}
                    style={{ resizeMode: 'stretch', height: windowSize.height * 2 }}
                  />
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    position: 'absolute',
    resizeMode: 'stretch',
  },
  holder: {
    alignItems: 'center',
    position: 'absolute',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  window: {
    resizeMode: 'stretch',
  },
  windowMain: {
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default PusherAnimate;
