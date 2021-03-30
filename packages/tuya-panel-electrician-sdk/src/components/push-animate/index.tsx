/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import { Utils, LinearGradient } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';

const { convertX: cx } = Utils.RatioUtils;
const RAIL_WIDTH = cx(338);
const RAIL_HEIGHT = cx(248);
const Direction = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};
const DURATION = 3; // s

interface DefaultProps {
  value: number;
  /**
   * 容器宽、高
   */
  width: number;
  height: number;
  /**
   * 以哪边为原点做推拉动画
   */
  origin: string;
  /**
   * 是否需要透明层遮罩
   */
  needMask: boolean;
  /**
   * 全开-全关动画时长
   */
  duration: number;
  /**
   * 向内向外推拉， false为向屏幕内推，
   */
  outPush: boolean;
  /**
   * 恢复初始状态
   */
  restore: boolean;
}
type WindowProps = {
  /**
   * 容器样式
   */
  style: any;
  /**
   * [0] 最小角度值
   * [1] 最大角度值
   */
  range: [number, number];
  /**
   * 当前状态值
   */
  value: number;

  /**
   * 监听值变化
   */
  onValueChange?: (v: number) => void;
} & Partial<DefaultProps>;

interface WindowState {
  matrix: any;
  value: any;
}

export default class PushSlider extends Component<WindowProps, WindowState> {
  static defaultProps: DefaultProps = {
    value: 0,
    duration: DURATION,
    origin: Direction.top,
    outPush: false,
    width: RAIL_WIDTH - cx(40),
    height: RAIL_HEIGHT - cx(40),
    needMask: true,
    restore: false,
  };

  constructor(props: WindowProps) {
    super(props);
    this.min = props.range[0];
    this.max = props.range[1];
    this.state = {
      value: new Animated.Value(props.value),
      matrix: MatrixMath.createIdentityMatrix(),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.state.value.setValue(this.props.value);
    }, 0);
    this.state.value.addListener((e: any) => {
      this.props.onValueChange && this.props.onValueChange(e.value);
      this.resumeCommad(e.value);
    });
  }

  componentWillReceiveProps(nextProps: WindowProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      const { range, restore } = this.props;
      const isMin: boolean = nextProps.value < range[0];
      const isMax: boolean = nextProps.value > range[1];
      const isStop: boolean = isMin || isMax;
      if (isStop) {
        this.state.value.stopAnimation();
        restore && this.state.value.setValue(isMin ? range[0] : range[1]);
      } else {
        this.startAnimation(nextProps.value);
      }
    }
  }

  componentWillUnmount() {
    this.state.value.removeListener();
  }

  getValueDiffToAbsPecent = (val: number, diff: number) =>
    Math.abs(val - diff) / Math.abs(this.max - this.min);

  getDurationPecent = (v: number, before: number) => {
    let pecent = this.getValueDiffToAbsPecent(before, v);
    pecent = typeof before !== 'undefined' ? this.getValueDiffToAbsPecent(v, before) : pecent;
    if (pecent === 0) return 0;
    return pecent * this.props.duration;
  };

  min: number;
  max: number;

  startAnimation = (v: number, before: number = this.state.value._value) => {
    const curtainDuration = this.getDurationPecent(v, before);
    if (curtainDuration <= 0) {
      this.state.value.setValue(v);
    }
    const ani = Animated.timing(this.state.value, {
      toValue: v,
      duration: curtainDuration * 1000,
      easing: Easing.linear,
      // useNativeDriver: true,
    });
    ani.start();
  };

  resumeCommad(radians: number) {
    const { origin, outPush, width, height } = this.props;
    const out: any[] = [];
    if (radians < 0) return false;
    const moveTo = MatrixMath.createIdentityMatrix();
    const moveReverse = moveTo.concat();
    const rotate = moveTo.concat();
    let x = 0;
    let y = 0;
    // 旋转的角度
    let degree = radians * (Math.PI / 180);
    switch (origin) {
      case Direction.top:
        y = -height / 2;
        degree = outPush ? degree : -degree;
        break;
      case Direction.bottom:
        y = height / 2;
        degree = outPush ? -degree : degree;
        break;
      case Direction.left:
        x = -width / 2;
        degree = outPush ? -degree : degree;
        break;
      case Direction.right:
        x = width / 2;
        degree = outPush ? degree : -degree;
        break;
      default:
        break;
    }
    // 先移动到中心点
    MatrixMath.reuseTranslate3dCommand(moveTo, x, y, 0);
    MatrixMath.reusePerspectiveCommand(moveTo, cx(outPush ? 1900 : 900));
    // 先移动到中心点
    MatrixMath.reuseTranslate3dCommand(moveReverse, -x, -y, 0);
    // 旋转动画
    if (origin === Direction.top || origin === Direction.bottom) {
      MatrixMath.reuseRotateXCommand(rotate, degree);
    } else {
      MatrixMath.reuseRotateYCommand(rotate, degree);
    }
    // 再返回到原来的位置
    MatrixMath.multiplyInto(out, moveTo, rotate);
    MatrixMath.multiplyInto(out, out, moveReverse);
    this.setState({
      matrix: out,
    });
  }

  render() {
    const { children, style, width, height, needMask } = this.props;
    return (
      <View style={[styles.container, { width, height }]}>
        <Animated.View
          style={[
            styles.slideItem,
            style,
            {
              transform: [
                {
                  matrix: this.state.matrix,
                },
              ],
            },
          ]}
        >
          {children}
          {needMask && (
            <LinearGradient
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              stops={{
                '0%': `rgba(223,229,232, 0.3)`,
                '100%': 'rgba(247,249,250,0.3)',
              }}
            >
              <Rect width={width} height={height} />
            </LinearGradient>
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create<any>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideItem: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    margin: -1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
});
