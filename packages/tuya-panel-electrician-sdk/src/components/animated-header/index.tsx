import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Utils, TYSdk } from 'tuya-panel-kit';
import { HeaderViewProps, HeaderViewState } from './component/index.type';
import Header from './component/header';
import TopAnimation from './component/topAnimation';
import Portal from './component/portal';

const { convertX: cx, convertY: cy, width: winWidth } = Utils.RatioUtils;
const set =
  'M754.773333 170.666667a64 64 0 0 1 42.581334 111.744L614.4 445.781333l0.042667 406.186667a64 64 0 0 1-57.856 63.701333l-6.144 0.298667a64 64 0 0 1-39.68-13.738667l-119.466667-94.336a64 64 0 0 1-24.32-50.218666l-0.042667-314.410667-152.021333-165.248a64 64 0 0 1-0.853333-85.76l4.608-4.693333A64 64 0 0 1 261.930667 170.666667z m-55.978666 85.333333H310.570667l130.432 141.781333a42.666667 42.666667 0 0 1 10.922666 23.594667L452.266667 426.666667l-0.042667 320.64 76.8 60.629333L529.066667 426.666667a42.666667 42.666667 0 0 1 10.624-28.16l3.626666-3.669334L698.794667 256zM853.333333 736a32 32 0 0 1 4.352 63.701333L853.333333 800h-128a32 32 0 0 1-4.352-63.701333L725.333333 736h128z m0-128a32 32 0 0 1 4.352 63.701333L853.333333 672h-128a32 32 0 0 1-4.352-63.701333L725.333333 608h128z m0-128a32 32 0 0 1 4.352 63.701333L853.333333 544h-128a32 32 0 0 1-4.352-63.701333L725.333333 480h128z';
const TYEvent = TYSdk.event;

export default class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  static defaultProps = {
    title: 'title',
    animateTitle: 'screening',
    maxHeight: 300,
    tintColor: '#272929',
    rightDisable: false,
    speed: 200,
    content: () => <View />,
    iconPath: set,
    headerTextColor: '#333333',
  };

  constructor(props: HeaderViewProps) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
      isScreening: false,
    };
    TYEvent.on('removePortal', () => this._handleToSet(1));
  }

  componentWillUnmount() {
    TYEvent.off('removePortal');
  }

  static close = Portal.hide;

  _handleToSet = (value = 0) => {
    const { speed } = this.props;
    const showMask = value === 0;
    showMask &&
      this.setState({
        isScreening: showMask,
      });
    this.state.opacity.stopAnimation();
    Animated.timing(this.state.opacity, {
      toValue: value,
      duration: speed,
      easing: Easing.linear,
    }).start(() => {
      !showMask &&
        this.setState({
          isScreening: showMask,
        });
    });
  };

  render() {
    const { isScreening } = this.state;
    const {
      maxHeight,
      tintColor,
      rightDisable,
      animateTitle,
      content,
      iconPath,
      headerTextColor,
    } = this.props;
    const { title } = this.props;
    const spin = this.state.opacity.interpolate({
      inputRange: [0, 1], // 输入值
      outputRange: [1, 0], // 输出值
    });
    const HEIGHT = this.state.opacity.interpolate({
      inputRange: [0, 1], // 输入值
      outputRange: [maxHeight, 0], // 输出值
    });
    return (
      <View style={styles.container}>
        <Header
          opacity={this.state.opacity}
          title={isScreening ? animateTitle : title}
          setChange={value => this._handleToSet(value)}
          rightDisable={rightDisable}
          tintColor={tintColor}
          iconPath={iconPath}
          headerTextColor={headerTextColor}
        />
        <View style={styles.contents}>
          {isScreening && (
            <TopAnimation
              height={HEIGHT}
              opacity={spin}
              setChange={value => this._handleToSet(value)}
              content={content}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flex: 1,
    height: cy(667),
    justifyContent: 'flex-start',
    width: cx(375),
  },
  contents: {
    flex: 1,
    height: cy(667),
    width: winWidth,
  },
});
