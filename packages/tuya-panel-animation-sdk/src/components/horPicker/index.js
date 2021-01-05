/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, ViewPropTypes, Animated, ColorPropType } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import _ from 'lodash';
import { StyledPickerContainer, StyledPickerItemView } from './styled';
import TickMark from './tickMark';
import { createAnimation } from '../../utils';

export const { convertX: cx, convertY: cy, isIphoneX, width: winWidth } = Utils.RatioUtils;
export default class HorPicker extends Component {
  static propTypes = {
    /**
     * 当前选择的index
     */
    activeIndex: PropTypes.number.isRequired,
    /**
     * 是否禁用滑动
     */
    disabled: PropTypes.bool,
    /**
     * 外层样式
     */
    style: ViewPropTypes.style,
    /**
     * 每一个picker样式
     */
    pickItemStyle: ViewPropTypes.style,
    /**
     * 值变化时触发
     */
    onValueChange: PropTypes.func,
    /**
     * 选中时单位字体大小
     */
    unitFontSize: PropTypes.number,
    /**
     * 未选中时单位字缩放比例
     */
    unPickerScale: PropTypes.number,
    /**
     * 单位
     */
    label: PropTypes.string,
    /**
     * 一屏展示个数
     */
    number: PropTypes.number,
    /**
     * 主题色
     */
    themeColor: ColorPropType,
    /**
     * 自定义内容
     */
    renderContent: PropTypes.array,
    /**
     * 展示刻度尺
     */
    showTickMark: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    pickItemStyle: { height: cx(100) },
    disabled: false,
    unitFontSize: cx(14),
    unPickerScale: 0.6,
    label: '份',
    onValueChange: () => {},
    number: 7,
    themeColor: 'red',
    renderContent: _.times(20, i => <TYText style={{ fontSize: cx(46) }}>{i}</TYText>),
    showTickMark: true,
  };
  constructor(props) {
    super(props);
    this.initScreenNumber = parseInt(props.number / 2, 10);
  }

  componentWillMount = () => {
    this.resetActiveIndex(this.props.activeIndex, false);
  };

  shouldComponentUpdate = nextProps => {
    if (
      _.isEqual(nextProps.activeIndex, this.stateIndex) &&
      !_.isEqual(nextProps.activeIndex, this.props.activeIndex)
    ) {
      return false;
    }
    return true;
  };

  componentDidUpdate = preProps => {
    if (
      !_.isEqual(this.props.activeIndex, this.stateIndex) &&
      !_.isEqual(preProps.activeIndex, this.props.activeIndex)
    ) {
      this.dataHasChange = true;
      this.resetActiveIndex(this.props.activeIndex, true);
    }
  };
  initScreenNumber = 3;

  initData = () => {
    const { unPickerScale, renderContent } = this.props;
    for (let i = 0; i < renderContent.length; i++) {
      const scale = i === this.stateIndex ? 1 : unPickerScale;
      const opacity = i === this.stateIndex ? 1 : 0.5;
      this[`scrollView${i}data`] = {
        scale: new Animated.Value(scale),
        opacity: new Animated.Value(opacity),
      };
    }
  };

  resetActiveIndex = (activeIndex, ifScroll) => {
    this.stateIndex = activeIndex;
    this.initData();
    if (ifScroll) {
      this._setStyle(activeIndex, ifScroll);
      // 针对范围更改作出局部修复
      this.scrollToIndex(`scrollView`, activeIndex);
      this.dataHasChange = false;
    }
  };

  stateIndex;
  hiddenScroll;
  scrollBeginX = [];
  valueList;
  timeHandle;
  startScroll = false;
  dataHasChange = false; // 为了使用scrollToIndex时不触发onscroll

  scrollToIndex = (ref, index) => {
    this[ref].scrollToIndex({
      animated: true,
      index: index + this.initScreenNumber,
      viewPosition: 0.5,
    });
  };

  _onScroll = e => {
    if (!this.startScroll) return;
    const { renderContent } = this.props;
    const pickerItemWidth = winWidth / this.props.number;
    const pageX = e.nativeEvent.contentOffset.x;
    const action = pageX < this.scrollBeginX ? 'left' : 'right';
    this.scrollBeginX = e.nativeEvent.contentOffset.x;
    if (
      (this.stateIndex === 0 && action === 'left') ||
      (this.stateIndex > renderContent.length - 1 && action === 'right')
    ) {
      return;
    }
    let nowIndex = Math.round(pageX / pickerItemWidth);
    nowIndex = Math.min(Math.max(0, nowIndex), renderContent.length - 1);
    if (this.stateIndex === nowIndex) {
      return;
    }
    this.stateIndex = nowIndex;
    this._setStyle(nowIndex);
  };
  _setStyle = (activeIndex, ifScroll) => {
    const { unPickerScale, number, renderContent, showTickMark } = this.props;
    const pickerItemWidth = winWidth / number;
    const animatedArr = [];
    for (let i = 0; i < renderContent.length; i++) {
      if (_.get(this[`scrollView${i}data`], 'scale')) {
        const scale = i === activeIndex ? 1 : unPickerScale;
        const opacity = i === activeIndex ? 1 : 0.5;
        animatedArr.push(
          createAnimation({
            value: this[`scrollView${i}data`].scale,
            toValue: scale,
            duration: 200,
          })
        );
        animatedArr.push(
          createAnimation({
            value: this[`scrollView${i}data`].opacity,
            toValue: opacity,
            duration: 200,
          })
        );
      }
    }
    showTickMark &&
      animatedArr.push(
        createAnimation({
          value: this.tickMarkRef.markLeft,
          toValue:
            -pickerItemWidth * activeIndex +
            (this.props.number % 2 === 0 ? 0 : pickerItemWidth / 2) +
            (activeIndex !== 0 ? cx(2) : 0),
          duration: 0,
        })
      );
    Animated.parallel(animatedArr).start();
    ifScroll && this.forceUpdate();
  };
  _onValueChange = () => {
    this.props.onValueChange && this.props.onValueChange(this.stateIndex);
  };
  _renderContent = () => {
    const {
      disabled,
      style,
      themeColor,
      label,
      number,
      unitFontSize,
      renderContent,
      showTickMark,
    } = this.props;
    const pickerItemWidth = winWidth / number;
    let flag = false;
    let onMomentumScroll = false;
    const FlatListData = _.flattenDeep([
      ...new Array(this.initScreenNumber).fill(''),
      ...new Array(renderContent.length).fill(1),
      ...new Array(this.initScreenNumber).fill(''),
    ]);
    return (
      <View>
        <StyledPickerContainer style={style} disabled={disabled}>
          {showTickMark && (
            <TickMark
              style={{ position: 'absolute', top: this.props.pickItemStyle.height - cx(10) }}
              ref={ref => (this.tickMarkRef = ref)}
              themeColor={themeColor}
              dataLength={renderContent.length}
              itemWidth={pickerItemWidth}
              emptyViewLength={this.initScreenNumber}
            />
          )}
          <TYText
            style={[
              styles.labelText,
              { fontSize: unitFontSize, top: this.props.pickItemStyle.height - cx(30) },
            ]}
          >
            {label}
          </TYText>
          <View style={styles.center} collapsable={false}>
            <FlatList
              scrollsToTop={false}
              scrollEnabled={!disabled}
              horizontal={true}
              onLayout={e => {
                this.scrollToIndex(`scrollView`, this.stateIndex);
                this._setStyle(this.stateIndex);
              }}
              initialNumToRender={renderContent.length}
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={true}
              onScroll={e => {
                // 为了避免在修改dataSource时触发onscroll
                if (!this.dataHasChange) {
                  this._onScroll(e);
                }
              }}
              onScrollBeginDrag={e => {
                this.startScroll = true;
                clearTimeout(this.timeHandle);
              }}
              onMomentumScrollBegin={() => {
                flag = true;
                onMomentumScroll = true;
              }}
              onScrollEndDrag={() => {
                this.timeHandle = setTimeout(() => {
                  if (!flag) {
                    this.startScroll = false;
                    this.scrollToIndex(`scrollView`, this.stateIndex);
                    this._setStyle(this.stateIndex);
                    this._onValueChange();
                  }
                }, 0);
              }}
              onMomentumScrollEnd={() => {
                if (flag && !this.dataHasChange && onMomentumScroll) {
                  this.startScroll = false;
                  this.scrollToIndex(`scrollView`, this.stateIndex);
                  this._setStyle(this.stateIndex);
                  this._onValueChange();
                  onMomentumScroll = false;
                  flag = false;
                }
              }}
              getItemLayout={(__, index) => ({
                length: pickerItemWidth,
                offset: pickerItemWidth * index,
                index,
              })}
              keyExtractor={(__, index) => `${index}`}
              scrollEventThrottle={16}
              data={FlatListData}
              ref={ref => (this.scrollView = ref)}
              renderItem={({ item, index }) => {
                return this._renderPickerItem(item, index);
              }}
            />
          </View>
        </StyledPickerContainer>
      </View>
    );
  };

  _renderPickerItem = (item, index) => {
    const pickerItemWidth = winWidth / this.props.number;
    return (
      <StyledPickerItemView activeOpacity={1}>
        <Animated.View
          ref={ref => (this[`scrollView${index - this.initScreenNumber}`] = ref)}
          style={[
            this.props.pickItemStyle,
            {
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: pickerItemWidth,
              transform: [
                {
                  scale:
                    _.get(this[`scrollView${index - this.initScreenNumber}data`], 'scale') ||
                    new Animated.Value(1),
                },
              ],
              opacity:
                _.get(this[`scrollView${index - this.initScreenNumber}data`], 'opacity') ||
                new Animated.Value(1),
            },
          ]}
          activeOpacity={1}
        >
          {item === '' ? null : this.props.renderContent[index - this.initScreenNumber]}
        </Animated.View>
      </StyledPickerItemView>
    );
  };

  render() {
    return this._renderContent();
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    position: 'absolute',
    fontSize: cx(12),
    alignSelf: 'center',
  },
});
