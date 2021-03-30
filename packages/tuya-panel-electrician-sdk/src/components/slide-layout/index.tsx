import React, { Component } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';

const TYEvent = TYSdk.event;
interface SliderOutLayoutProps {
  baseLayout?: any;
  style?: any;
  contentStyle?: any;
  children?: any;
  baseLayoutTouchEnable?: boolean;
}

interface SliderOutLayoutState {
  baseLayoutHeight: any;
  panYValue: any;
  reachTop: boolean;
}

export default class SlideInOutLayout extends Component<
  SliderOutLayoutProps,
  SliderOutLayoutState
> {
  static slideUp = () => TYEvent.emit('slideEvent', 'slideUp');
  static slideDown = () => TYEvent.emit('slideEvent', 'slideDown');
  static defaultProps = {
    baseLayout: () => {},
    style: {},
    contentStyle: {},
    baseLayoutTouchEnable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      baseLayoutHeight: null,
      panYValue: new Animated.Value(0),
      reachTop: false,
    };
    this._timer = null;
  }

  componentDidMount() {
    TYEvent.on('slideEvent', this.slideEventHandler);
  }

  componentWillUnmount() {
    TYEvent.off('slideEvent', this.slideEventHandler);
  }

  onPanResponderGrant = ({ nativeEvent: { pageY: y0 } }) => {
    const { baseLayoutTouchEnable } = this.props;
    const { reachTop } = this.state;
    if (baseLayoutTouchEnable) return;
    if (reachTop) this.setScrollDisabledState(false);
    if (!reachTop) {
      this._base &&
        this._base.measure((_x, _y, _w, h, _px, py) => {
          const flag = y0 < h + py;
          this.setScrollDisabledState(flag);
        });
    }
  };

  onPanResponderRelease = () => {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.setScrollDisabledState(false);
    }, 166);
  };

  onScrollEndDrag = ({ nativeEvent }) => {
    const contentOffset = nativeEvent.targetContentOffset || nativeEvent.contentOffset;
    const { y: dy } = contentOffset;
    const { baseLayoutHeight } = this.state;
    dy < baseLayoutHeight &&
      dy > 0 &&
      this.scrollTo(dy > baseLayoutHeight * 0.4 ? baseLayoutHeight : 0);
  };

  onScroll = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }) => {
    const { baseLayoutHeight, panYValue } = this.state;
    y < baseLayoutHeight && panYValue.setValue(y / baseLayoutHeight);
    y >= baseLayoutHeight && this.setState({ reachTop: true });
  };

  onSlide = (show = false, func = () => {}) => {
    Animated.timing(this.state.panYValue, {
      toValue: show ? 1 : 0,
      duration: 287,
      useNativeDriver: true,
    }).start(({ finished }) => {
      finished && func();
    });
  };

  setRef = (ref, name) => {
    this[name] = ref;
  };

  setScrollDisabledState = disabled => {
    this._content &&
      this._content.setNativeProps({
        scrollEnabled: !disabled,
      });
  };

  slideEventHandler = (event = '') => {
    switch (event) {
      case 'slideUp':
        this.slideUp();
        break;
      case 'slideDown':
        this.slideDown();
        break;
      default:
        break;
    }
  };

  slideUp = () => {
    this.scrollTo(this.state.baseLayoutHeight);
  };

  slideDown = () => {
    this.scrollTo(0);
  };

  scrollTo = y => {
    this._content && this._content.scrollTo({ x: 0, y, animated: true });
    const { reachTop } = this.state;
    const flag = y > 0;
    flag !== reachTop && this.setState({ reachTop: flag });
  };

  _timer: any;
  _base: any;
  _content: any;

  mapPanYValue = (outputRange?: any, inputRange?: any) => {
    const { panYValue } = this.state;
    return panYValue.interpolate({
      inputRange: inputRange || [0, 1],
      outputRange,
    });
  };

  _onBaseLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    this.setState({ baseLayoutHeight: height });
  };

  render() {
    const { baseLayout, children, style, contentStyle } = this.props;
    return (
      <View style={[styles.container, style]}>
        <ScrollView
          onScroll={this.onScroll}
          onScrollEndDrag={this.onScrollEndDrag}
          stickyHeaderIndices={[0]}
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          ref={ref => this.setRef(ref, '_content')}
          onTouchStart={this.onPanResponderGrant}
          onTouchEnd={this.onPanResponderRelease}
        >
          <Animated.View
            onLayout={this._onBaseLayout}
            style={{ opacity: this.mapPanYValue([1, 0.3]) }}
          >
            <View ref={ref => this.setRef(ref, '_base')}>{baseLayout()}</View>
          </Animated.View>
          <View style={[styles.sliderContent, contentStyle]}>{children}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContent: {
    backgroundColor: '#fff',
    zIndex: 20,
  },
});
