import React, { PureComponent } from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  PanResponder,
  NativeModules,
  Animated,
  View,
} from 'react-native';
import { Utils } from '@tuya-rn/tuya-native-components';
import once from 'lodash/once';

const { convert, convertY } = Utils.RatioUtils;

interface PullUpDownProps {
  style?: StyleProp<ViewStyle>;
  children: any;
  minHeight: number;
  headerGrantStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  onChange(v: PullUpDownDirection): void;
}

export enum PullUpDownDirection {
  Upper = 'Upper',
  Down = 'Down',
}

interface PullUpDownState {
  height: Animated.Value;
  visible: boolean;
}

export default class PullUpDown extends PureComponent<PullUpDownProps, PullUpDownState> {
  public static Upper = PullUpDownDirection.Upper;
  public static Down = PullUpDownDirection.Down;

  static defaultProps = {
    style: null,
    children: null,
    onChange() {},
  };

  state = {
    height: new Animated.Value(1),
    visible: false,
  };

  onLayout = once(({ target }) => {
    NativeModules.UIManager.measure(
      target,
      (_x: any, _y: any, width: any, height: any, pageX: number, pageY: number) => {
        this.minHeight = this.props.minHeight;
        if (!this.maxHeight) {
          this.maxHeight = height;
        } else if (height > this.maxHeight) {
          this.maxHeight = height;
        }

        this.setRootPageXY(pageX, pageY);
        this.forceUpdate();
      }
    );
  });
  minHeight: number;
  maxHeight: any;
  rootSize: { width: number; height: number };
  rootRadius: number;
  panResponder: any;
  rootPageX: number;
  rootPageY: number;

  constructor(props: PullUpDownProps) {
    super(props);

    this.createResponder();
  }

  setInstance = (name: string) => (ref: any) => {
    this[`__ref__${name}`] = ref;
  };
  getInstance = (name: string) => () => {
    return this[`__ref__${name}`];
  };

  // tslint:disable-next-line: member-ordering
  setInstanceHeader = this.setInstance('header');

  // tslint:disable-next-line: member-ordering
  getInstanceHeader = this.getInstance('header');

  createResponder() {
    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.isEnabled,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: this.isEnabled,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
    });
  }

  setRootPageXY(pageX: number, pageY: number) {
    this.rootPageX = pageX;
    this.rootPageY = pageY;
  }

  getRelativeRootByPage(pageX: number, pageY: number) {
    return {
      x: pageX - this.rootPageX,
      y: pageY - this.rootPageY,
    };
  }

  isEnabled = (evt, { dx, dy }) => {
    if (Math.abs(dy) > 30) {
      return true;
    }
    return false;
  };

  setActive = () => {
    const { headerGrantStyle } = this.props;
    const instance = this.getInstanceHeader();
    if (instance) {
      instance.setNativeProps({ style: headerGrantStyle || styles.headerGrantStyle });
    }
  };

  cancelActive = () => {
    const { headerStyle } = this.props;

    const instance = this.getInstanceHeader();
    if (instance) {
      instance.setNativeProps({ style: [styles.header, headerStyle] });
    }
  };

  animate(value: number) {
    Animated.timing(this.state.height, {
      toValue: value,
      duration: 500,
    }).start();
  }

  handleGrant = () => {
    // this.setActive();
  };

  handleMove = (_d, { dx, dy }) => {
    // if (Math.abs(dy) > 20) {
    //   if (dy > 0) {
    //     this.animate();
    //     // this.props.onChange(PullUpDownDirection.Down);
    //   } else {
    //     this.animate(1);
    //     // this.props.onChange(PullUpDownDirection.Upper);
    //   }
    // } else {
    // }
  };

  handleRelease = (_d, { dx, dy }) => {
    if (Math.abs(dy) > 20) {
      if (dy > 0) {
        this.setState({ visible: true }, () => {
          this.animate(0);
        });
        this.props.onChange(PullUpDownDirection.Down);
      } else {
        this.setState({ visible: false }, () => {
          this.animate(1);
        });
        // this.animate(1);
        this.props.onChange(PullUpDownDirection.Upper);
      }
    }
    // this.cancelActive();
  };

  render() {
    const { style, headerStyle } = this.props;
    let customStyle;
    if (this.maxHeight) {
      customStyle = {
        height: this.state.height.interpolate({
          inputRange: [0, 1],
          outputRange: [this.minHeight, this.maxHeight],
        }),
      };
      // customStyle = {
      //   height: this.state.height,
      // };
    }

    // const visible = this.state.height._value !== 1;
    const visible = this.state.visible;

    // console.warn('this.state.height', this.state.height);
    return (
      <Animated.View
        style={[style, customStyle]}
        onLayout={this.onLayout}
        ref={this.setInstance('root')}
      >
        {/* <View style={styles.resView} {...this.panResponder.panHandlers} pointerEvents="box-only">
          <View style={[styles.header, headerStyle]} ref={this.setInstanceHeader} />
        </View> */}
        <View {...this.panResponder.panHandlers}>
          <View
            style={[styles.header, headerStyle, { opacity: visible ? 1 : 0 }]}
            ref={this.setInstanceHeader}
          />
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  resView: {},
  header: {
    width: convert(44),
    height: convertY(5),
    borderRadius: convert(2.5),
    backgroundColor: '#CCCCCC',
    marginTop: convertY(8),
    marginBottom: convertY(3),
    alignSelf: 'center',
  },
  headerGrantStyle: {
    backgroundColor: '#666666',
  },
});
