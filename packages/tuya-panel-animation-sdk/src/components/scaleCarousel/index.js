/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/split-platform-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  View,
  Platform,
  ViewPagerAndroid,
  ViewPropTypes,
  Animated,
  ColorPropType,
  Dimensions,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';
import defaultDot from './dot';
import { createAnimation } from '../../utils';

const { width: winWidth } = Dimensions.get('window');
const { convertX: cx } = Utils.RatioUtils;

class ScaleCarousel extends React.Component {
  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 当内容范围比滚动视图本身大时，是否弹性拉动一截
     */
    bounces: PropTypes.bool,
    /**
     * 是否有指示点
     */
    hasDots: PropTypes.bool,
    /**
     * 是否自动播放
     */
    autoplay: PropTypes.bool,
    /**
     * 自动播放间隔时间(ms)
     */
    autoplayInterval: PropTypes.number,
    /**
     * 当前激活的索引
     */
    selectedIndex: PropTypes.number,
    /**
     * 自定义指示点
     */
    dots: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
     * 指示点样式
     */
    dotStyle: ViewPropTypes.style,
    /**
     * 当前激活的指示点颜色
     */
    dotActiveColor: ColorPropType,
    /**
     * 轮播组件外层样式
     */
    style: ViewPropTypes.style,
    /**
     * 轮播页样式
     */
    pageStyle: ViewPropTypes.style,
    /**
     * 安卓的实现机制是否使用viewPager
     */
    useViewPagerOnAndroid: PropTypes.bool,
    /**
     * 禁止滑动
     */
    disabled: PropTypes.bool,
    /**
     * 指示点显示的点个数
     */
    showDotNumber: PropTypes.number,
    /**
     * 指示点样式
     */
    dotShowStyle: ViewPropTypes.style,
    /**
     * 是否循环
     */
    loop: PropTypes.bool,
    /**
     * 组件子元素
     */
    children: PropTypes.arrayOf(PropTypes.element),
    /**
     * 每一个轮播图高度
     */
    carouselHeight: PropTypes.number,
    /**
     * 轮播图收缩到最小比例(0.1-0.9)
     */
    scaleFactor: PropTypes.number,
    /**
     * 轮播图收缩到最小比例时圆角大小
     */
    borderMaxRadius: PropTypes.number,
    /**
     * 轮播开始事件
     */
    onScrollBeginDrag: PropTypes.func,
    /**
     * 轮播结束事件
     */
    onScrollEndDrag: PropTypes.func,
    /**
     * 轮播切换事件
     */
    carouselChange: PropTypes.func,
    /**
     * 轮播动画结束事件
     */
    onMomentumScrollEnd: PropTypes.func,
  };
  static defaultProps = {
    accessibilityLabel: 'Carousel',
    bounces: true,
    hasDots: true,
    autoplay: false,
    autoplayInterval: 2000,
    selectedIndex: 0,
    dots: defaultDot,
    dotStyle: {
      width: cx(8),
      height: cx(8),
      borderRadius: cx(4),
      marginHorizontal: cx(3),
      marginVertical: cx(3),
      backgroundColor: 'rgba(255,255,255,0.7)',
    },
    dotActiveColor: '#fff',
    style: {},
    pageStyle: {},
    disabled: false,
    useViewPagerOnAndroid: false,
    showDotNumber: 5,
    dotShowStyle: {
      position: 'absolute',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      justifyContent: 'center',
      top: cx(100),
    },
    loop: true,
    carouselHeight: 600,
    scaleFactor: 0.9,
    borderMaxRadius: cx(30),
    onScrollBeginDrag: () => {},
    onScrollEndDrag: () => {},
    carouselChange: () => {},
    onMomentumScrollEnd: () => {},
    children: ['#FF0000', '#FC00EF', '#0243FC', '#80FE06', '#FB7308', '#8700F9'].map(color => (
      <View style={{ width: winWidth, height: 600, backgroundColor: color }} key={color} />
    )),
  };

  constructor(props) {
    super(props);
    const { children, selectedIndex } = this.props;
    this.count = children ? React.Children.count(children) : 0;
    const index = this.count > 1 ? Math.min(selectedIndex, this.count - 1) : 0;
    this.state = {
      width: new Animated.Value(0),
      isScrolling: false,
      selectedIndex: index,
      offset: { x: 0, y: 0 },
      autoplayStop: false,
    };
    this.emptyViewNumber = parseInt(props.showDotNumber / 2, 10);
  }
  componentDidMount() {
    this.autoplay();
    this.initData();
  }
  componentWillReceiveProps(nextProps) {
    const { children, loop, selectedIndex, useViewPagerOnAndroid } = nextProps;
    const { width } = this.state;
    if (selectedIndex !== this.state.selectedIndex) {
      const index = Math.max(Math.min(selectedIndex, this.count - 1), 0);
      const changeOffset = width * (index + (loop ? 1 : 0));
      this.setState(
        {
          selectedIndex: index,
          offset: { x: changeOffset, y: 0 },
        },
        () => {
          this.androidScrollTo(changeOffset, useViewPagerOnAndroid);
          nextProps.hasDots &&
            this.dotRef.scrollTo({
              x: selectedIndex * cx(14),
            });
          this.initData();
        }
      );
    }
    if (!_isEqual(children.length, this.props.children.length)) {
      this.count = React.Children.count(children) || 1;
      this.initData();
    }
    if (children && React.Children.count(children) === this.count) return;
    this.count = React.Children.count(children) || 1;
    const offset = width * (loop ? 1 : 0);
    this.setState({
      autoplayStop: false,
      isScrolling: false,
      // selectedIndex: 0,
      offset: { x: offset, y: 0 },
    });
  }
  componentWillUnmount() {
    this.autoplayTimer && clearTimeout(this.autoplayTimer);
    this.androidScrollEndTimer && clearTimeout(this.androidScrollEndTimer);
    this.scrollEndTimer && clearTimeout(this.scrollEndTimer);
    this.firstScrollTimer && clearTimeout(this.firstScrollTimer);
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
  }
  onScrollBegin = e => {
    if (!this.endOnce) return;
    this.endOnce = false;
    this.stopAnimation();
    this.beginOffsetX = e.nativeEvent.contentOffset.x;
    this.setState(
      {
        isScrolling: true,
      },
      () => {
        if (this.props.onScrollBeginDrag) {
          this.props.onScrollBeginDrag(e, this.state);
        }
      }
    );
  };
  onScroll = e => {
    const diffOffsetX = Math.abs(this.beginOffsetX - e.nativeEvent.contentOffset.x);
    this.diffOffsetX = diffOffsetX;
    if (diffOffsetX < winWidth / 6) {
      const scaleFactor = 1 - this.scaleFactor * (diffOffsetX / (winWidth / 6));
      for (let i = 0; i < this.count + this.emptyViewNumber; i++) {
        if (this[`carousel_${i}`]) {
          this[`carousel_${i}_data`] = {
            borderRadius: new Animated.Value(
              (diffOffsetX / (winWidth / 6)) * this.props.borderMaxRadius
            ),
            scale: new Animated.Value(scaleFactor),
          };
          this[`carousel_${i}`].setNativeProps({
            borderRadius: (diffOffsetX / (winWidth / 6)) * this.props.borderMaxRadius,
            transform: [
              {
                scale: scaleFactor,
              },
            ],
          });
        }
      }
    }
  };
  onScrollEnd = e => {
    this.setState({ isScrolling: false });
    // android hack
    if (!e.nativeEvent.contentOffset) {
      const { position } = e.nativeEvent;
      e.nativeEvent.contentOffset = {
        x: position * this.state.width,
        y: 0,
      };
    }
    this.updateIndex(e.nativeEvent.contentOffset);
    this.scrollEndTimer = setTimeout(() => {
      this.autoplay();
      this.loopJump();
      if (this.props.onMomentumScrollEnd) {
        this.props.onMomentumScrollEnd(e, this.state);
      }
    });
  };

  onScrollEndDrag = e => {
    const { offset, selectedIndex } = this.state;
    const previousOffset = offset.x;
    const newOffset = e.nativeEvent.contentOffset.x;
    if (previousOffset === newOffset && (selectedIndex === 0 || selectedIndex === this.count - 1)) {
      this.setState(
        {
          isScrolling: false,
        },
        () => {
          this.scrollInit();
        }
      );
    }
    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(e, this.state);
    }
  };
  onLayout = e => {
    const { selectedIndex, loop, useViewPagerOnAndroid } = this.props;
    const scrollIndex = this.count > 1 ? Math.min(selectedIndex, this.count - 1) : 0;
    const { width } = e.nativeEvent.layout;
    const offset = width * (scrollIndex + (loop ? 1 : 0));
    this.setState(
      {
        width,
        offset: { x: offset, y: 0 },
      },
      () => this.androidScrollTo(offset, useViewPagerOnAndroid)
    );
  };

  onPageScrollStateChanged = state => {
    if (state === 'dragging') this.onScrollBegin();
  };

  get scaleFactor() {
    return 1 - Math.min(0.9, Math.max(0.1, this.props.scaleFactor));
  }
  androidScrollTo = (offset, isViewPager) => {
    if (Platform.OS === 'android' && !isViewPager) {
      this.firstScrollTimer = setTimeout(() => {
        this.scrollView.scrollTo({ x: offset, y: 0, animated: false });
      }, 0);
    }
  };
  stopAnimation = () => {
    for (let i = 0; i < this.count + this.emptyViewNumber; i++) {
      if (this[`carousel_${i}_data`]) {
        this[`carousel_${i}_data`].borderRadius.stopAnimation();
        this[`carousel_${i}_data`].scale.stopAnimation();
      }
    }
  };

  initData = () => {
    const { selectedIndex } = this.state;
    for (let i = 0; i < this.count + this.emptyViewNumber; i++) {
      this[`carousel_${i}_data`] = {
        borderRadius: new Animated.Value(0),
        scale: new Animated.Value(1),
      };
      const scaleFactor = Math.max(
        1 - 0.2 * Math.abs(selectedIndex + this.emptyViewNumber - i),
        0.2
      );
      if (this[`dot_${i}`]) {
        this[`dot_${i}`].setNativeProps({
          transform: [
            {
              scale: scaleFactor,
            },
          ],
        });
      }
    }
  };
  scrollInit = () => {
    const { selectedIndex } = this.state;
    for (let i = 0; i < this.count + this.emptyViewNumber; i++) {
      if (this[`dot_${i}`]) {
        const scaleFactor = Math.max(
          1 - 0.2 * Math.abs(selectedIndex + this.emptyViewNumber - i),
          0.2
        );
        this[`dot_${i}`].setNativeProps({
          transform: [
            {
              scale: scaleFactor,
            },
          ],
        });
      }
      Animated.parallel([
        createAnimation({
          value: this[`carousel_${i}_data`].borderRadius,
          toValue: 0,
          duration: 200,
        }),
        createAnimation({
          value: this[`carousel_${i}_data`].scale,
          toValue: 1,
          duration: 200,
        }),
      ]).start();
    }
  };

  loopJump = () => {
    if (this.state.loopJump && Platform.OS === 'android') {
      const i = this.state.selectedIndex + (this.props.loop ? 1 : 0);
      if (this.props.useViewPagerOnAndroid) {
        this.loopJumpTimer = setTimeout(
          () =>
            this.scrollView.setPageWithoutAnimation && this.scrollView.setPageWithoutAnimation(i),
          50
        );
      } else {
        this.loopJumpTimer = setTimeout(() => {
          const x = this.state.width * i;
          this.scrollView.scrollTo({ x, y: 0 }, false);
        }, 0);
      }
    }
  };

  updateIndex = currentOffset => {
    const paramOffset = currentOffset;
    let { selectedIndex } = this.state;
    const { offset, width } = this.state;
    const diff = currentOffset.x - offset.x;
    if (!diff) return;
    selectedIndex += Math.round(diff / width);
    let loopJump = false;
    if (this.props.loop) {
      loopJump = true;
      if (selectedIndex <= -1) {
        selectedIndex = this.count - 1;
        paramOffset.x = width * this.count;
      } else if (selectedIndex >= this.count) {
        selectedIndex = 0;
        paramOffset.x = width;
      }
    }
    this.setState(
      {
        selectedIndex,
        offset: paramOffset,
        loopJump,
      },
      () => {
        this.scrollInit();
        this.endOnce = true;
      }
    );
    if (this.props.carouselChange) {
      this.props.carouselChange(selectedIndex);
    }
    this.props.hasDots &&
      this.dotRef.scrollTo({
        x: selectedIndex * cx(14),
      });
  };

  scrollNextPage = () => {
    const { selectedIndex, isScrolling, width } = this.state;
    if (isScrolling || this.count < this.emptyViewNumber) return;
    const diff = selectedIndex + 1 + (this.props.loop ? 1 : 0);
    const offsetX = diff * width;
    if (Platform.OS === 'android' && this.props.useViewPagerOnAndroid) {
      this.scrollView && this.scrollView.setPage(diff);
    } else {
      this.scrollView && this.scrollView.scrollTo({ x: offsetX, y: 0 });
    }
    this.setState({
      isScrolling: true,
      autoplayStop: false,
    });
    if (Platform.OS === 'android') {
      this.androidScrollEndTimer = setTimeout(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      }, 0);
    }
  };

  autoplay = () => {
    const { children, autoplay, autoplayInterval, loop } = this.props;
    const { isScrolling, autoplayStop, selectedIndex } = this.state;
    if (!Array.isArray(children) || !autoplay || isScrolling || autoplayStop) return;
    clearTimeout(this.autoplayTimer);
    this.autoplayTimer = setTimeout(() => {
      if (!loop && selectedIndex === this.count - 1) {
        this.setState({
          autoplayStop: true,
        });
        return;
      }
      this.scrollNextPage();
    }, autoplayInterval);
  };

  beginOffsetX = 0;
  emptyViewNumber = 2;
  endOnce = true;
  diffOffsetX = 0;

  _renderScroll = pages => {
    if (Platform.OS === 'android' && this.props.useViewPagerOnAndroid) {
      return (
        <ViewPagerAndroid
          ref={ref => {
            this.scrollView = ref;
          }}
          {...this.props}
          initialPage={this.props.loop ? this.state.selectedIndex + 1 : this.state.selectedIndex}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          onPageScroll={this.onScrollBegin}
          onPageSelected={this.onScrollEnd}
          key="$carousel"
          style={[this.props.style, { width: winWidth, height: this.props.carouselHeight }]}
        >
          {pages}
        </ViewPagerAndroid>
      );
    }
    return (
      <ScrollView
        {...this.props}
        horizontal={true}
        ref={ref => {
          this.scrollView = ref;
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        contentOffset={this.state.offset}
        onScrollBeginDrag={this.onScrollBegin}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={this.onScrollEnd}
        onScrollEndDrag={this.onScrollEndDrag}
        bounces={!!this.props.bounces}
        scrollEnabled={!this.props.disabled}
      >
        {pages}
      </ScrollView>
    );
  };
  _renderDots = () => {
    const { dots, dotStyle, dotActiveColor, showDotNumber, dotShowStyle } = this.props;
    const showViewWidth =
      (_get(dotStyle, 'width', cx(8)) + 2 * _get(dotStyle, 'marginHorizontal', cx(3))) *
      showDotNumber;
    return (
      <View
        style={[
          dotShowStyle,
          {
            width: showViewWidth,
          },
        ]}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={ref => (this.dotRef = ref)}
          onLayout={() => {
            this.dotRef.scrollTo({
              x: this.state.selectedIndex * cx(14),
            });
          }}
        >
          {new Array(this.count + this.emptyViewNumber).fill(0).map((__, i) =>
            dots({
              i,
              propsData: this,
              currentIndex: this.state.selectedIndex + this.emptyViewNumber,
              dotStyle,
              dotActiveColor,
              isEmpty: i < this.emptyViewNumber || i >= this.count + this.emptyViewNumber,
            })
          )}
        </ScrollView>
      </View>
    );
  };
  render() {
    const { children, hasDots, loop, accessibilityLabel, carouselHeight } = this.props;
    if (!children) return null;
    let pages;
    const childrenArray = React.Children.toArray(children);
    if (this.count > 1) {
      if (loop) {
        childrenArray.push(childrenArray[0]);
        childrenArray.unshift(childrenArray[childrenArray.length - this.emptyViewNumber]);
      }
      pages = childrenArray.map((child, index) => (
        <Animated.View
          key={`carousel_${index}`}
          accessibilityLabel={`${accessibilityLabel}_${index}`}
          ref={ref => (this[`carousel_${index}`] = ref)}
          style={[
            { overflow: 'hidden' },
            {
              width: new Animated.Value(winWidth),
              height: new Animated.Value(carouselHeight),
              transform: [
                {
                  scale: _get(this[`carousel_${index}_data`], 'scale') || new Animated.Value(1),
                },
              ],
              borderRadius:
                _get(this[`carousel_${index}_data`], 'borderRadius') || new Animated.Value(0),
            },
          ]}
        >
          {child}
        </Animated.View>
      ));
    } else {
      pages = <View>{children}</View>;
    }
    return (
      <View
        onLayout={this.onLayout}
        style={[this.props.style, { width: winWidth, height: this.props.carouselHeight }]}
      >
        {this._renderScroll(pages)}
        {hasDots && this._renderDots()}
      </View>
    );
  }
}

export default ScaleCarousel;
