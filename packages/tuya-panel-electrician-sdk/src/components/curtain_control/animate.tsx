import React, { PureComponent } from 'react';
import _times from 'lodash/times';
import { StyleSheet, Easing, Animated, TouchableOpacity } from 'react-native';
import { Utils, IconFont } from 'tuya-panel-kit';
import { DELAY, DURTION, DELAY2, DURTION2 } from './utils';

const { convertX: cx } = Utils.RatioUtils;
interface AnimatedProps {
  icon: any;
  color: string;
  isTop: boolean;
  isHorization: boolean;
  onPress: any;
}

interface AnimatedState {
  spinValue0: any;
  spinValue1: any;
  spinValue2: any;
}

export default class Animateds extends PureComponent<AnimatedProps, AnimatedState> {
  constructor(props: AnimatedProps) {
    super(props);
    this.state = {
      ...this.getSpin(),
    };
  }

  componentDidMount() {
    this.spin();
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  getSpin = () => {
    let spins: any = {};
    _times(3, (d: number) => {
      spins = {
        ...spins,
        [`spinValue${d}`]: new Animated.Value(0),
      };
    });
    return spins;
  };

  spin = () => {
    _times(3, (d: number) => {
      this.startSpin(d);
    });
  };

  startSpin = (d: number) => {
    const { isTop } = this.props;
    this.state[`spinValue${d}`].setValue(0);
    Animated.timing(this.state[`spinValue${d}`], {
      toValue: 1,
      duration: isTop ? DURTION2[d] : DURTION[d],
      easing: Easing.linear,
      delay: isTop ? DELAY2[d] : DELAY[d],
    }).start(() => this.startSpin(d));
  };

  stopAnimation() {
    this.state.spinValue1.setValue(0);
  }

  render() {
    const { icon, color, isHorization, isTop, onPress } = this.props;
    const spin = _times(3, (t: number) =>
      this.state[`spinValue${t}`].interpolate({
        inputRange: [0, 1],
        outputRange: [0, isTop ? 1 - t * 0.2 : 1 - (3 - t) * 0.2],
      })
    );
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[
            styles.root,
            isHorization && {
              transform: [
                {
                  rotate: '270deg',
                },
              ],
            },
          ]}
        >
          {_times(3, i => {
            return (
              <Animated.View
                key={i}
                style={[
                  styles.icon,
                  {
                    opacity: spin[i],
                  },
                ]}
              >
                <IconFont d={icon} color={color} size={cx(30)} />
              </Animated.View>
            );
          })}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: cx(13),
    width: cx(28),
  },
  root: {
    alignItems: 'center',
    height: cx(46),
    justifyContent: 'center',
    width: cx(100),
  },
});
