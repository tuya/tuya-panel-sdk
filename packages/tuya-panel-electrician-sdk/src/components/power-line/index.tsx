import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const AnimatePath = Animated.createAnimatedComponent(Path);
interface EleAnimationProps {
  /**
   * 路径颜色
   */
  pathColor: any;
  /**
   * 动画时间
   */
  animateTime: number;
}

interface EleAnimationStates {
  strokeDashOffset: any;
}

export default class EleAnimation extends Component<EleAnimationProps, EleAnimationStates> {
  static defaultProps = {
    pathColor: '#0078FF',
    animateTime: 2000,
  };

  constructor(props: EleAnimationProps) {
    super(props);

    this.state = {
      strokeDashOffset: new Animated.Value(280),
    };
  }

  componentDidMount() {
    // 使用炫酷的animated让小线段愉悦的奔跑
    const animationLoading = Animated.timing(this.state.strokeDashOffset, {
      toValue: 0,
      easing: Easing.linear,
      duration: this.props.animateTime,
    });
    Animated.loop(animationLoading).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          width: 120,
          height: 25,
          opacity: this.state.strokeDashOffset.interpolate({
            inputRange: [0, 80, 280],
            outputRange: [1, 0, 1],
          }),
        }}
      >
        <Svg height="25" width="120" viewBox="0 0 120 25">
          <G fill="none">
            <AnimatePath
              d="M0 12 H26.57 L35.19 0 L42.56 22.24 L49.66 12 H67.78 L74.02 2.76 L80.43 15.91 L88.03 9.98 H102.89"
              stroke={this.props.pathColor}
              strokeWidth="2"
              strokeDasharray="80,200"
              strokeDashoffset={this.state.strokeDashOffset}
            />
          </G>
        </Svg>
      </Animated.View>
    );
  }
}
