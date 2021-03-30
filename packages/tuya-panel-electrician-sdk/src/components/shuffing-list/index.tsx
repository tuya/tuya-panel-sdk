/* eslint-disable react/no-string-refs */
import _delay from 'lodash/delay';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  PanResponder,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

const Item = datas => {
  const {
    item,
    idx,
    selectIndex,
    themeColor,
    itemWidth,
    marginRight,
    switchChange,
    numberOfLines,
    itemStyles,
  } = datas;
  const style = [itemsStyle.container, itemStyles];
  const isSelected = selectIndex === idx;
  const { key, title } = item;
  return (
    <TouchableOpacity
      key={key}
      style={[
        style,
        {
          height: cy(22),
          width: itemWidth,
        },
      ]}
      onPress={() => switchChange(idx)}
    >
      <TYText
        style={[
          itemsStyle.title,
          {
            width: itemWidth - marginRight,
            color: isSelected ? themeColor : 'rgba(0,0,0,.5)',
          },
          isSelected && {
            fontWeight: 'bold',
          },
        ]}
        numberOfLines={numberOfLines}
      >
        {title}
      </TYText>
    </TouchableOpacity>
  );
};

Item.defaultProps = { onPress: null };

const itemsStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,.5)',
    fontSize: cx(16),
    textAlign: 'center',
  },
});

interface ShufflingListProps {
  data: any;
  themeColor?: string;
  contentWidth: number;
  marginRight: number;
  itemWidth: number;
  numberOfLines?: number;
  itemStyle?: StyleProp<ViewStyle>;
  onIndexChange?: (selectIdx: number) => void;
}

interface ShufflingListState {
  selectIndex: number;
  canTouch: boolean;
  canSet: boolean;
  move: boolean;
}

export default class ShufflingList extends Component<ShufflingListProps, ShufflingListState> {
  static defaultProps = {
    data: [],
    themeColor: '#00CC99',
    contentWidth: cx(290),
    itemWidth: cx(90),
    marginRight: cx(10),
    numberOfLines: 1,
    itemStyle: {},
  };

  constructor(props: ShufflingListProps) {
    super(props);
    this.state = {
      selectIndex: 0,
      canTouch: true,
      canSet: true,
      move: false,
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: (e, gestureState) => this._handleResponderGrant(e, gestureState),
      onPanResponderRelease: (e, gestureState) => this._handleResponderRelease(e, gestureState),
    });
    this.beforeX = 0;
    this.after = 0;
  }

  componentDidMount() {
    setTimeout(() => {
      this._scrollToItem(this.state.selectIndex);
    }, 1);
  }

  _panResponder: any;
  beforeX: number;
  after: number;
  refs: any;

  _handleResponderGrant = (e: any, gestureState: any) => {
    const { moveX } = gestureState;
    this.beforeX = moveX;
  };

  _handleResponderRelease = (e: any, gestureState: any) => {
    const { moveX } = gestureState;
    const { canTouch } = this.state;
    if (!canTouch) return;
    this.after = moveX;
    this._startScroll();
  };

  _startScroll = () => {
    const { selectIndex } = this.state;
    const { data } = this.props;
    const num = data.length;
    if (this.after - this.beforeX > 0) {
      if (selectIndex === 0) return;
      this.setState(
        {
          selectIndex: selectIndex - 1,
        },
        () => this._scrollToItem(selectIndex - 1)
      );
    } else if (this.beforeX - this.after > 0) {
      if (selectIndex === num - 1) return;
      this.setState(
        {
          selectIndex: selectIndex + 1,
        },
        () => this._scrollToItem(selectIndex + 1)
      );
    }
  };

  switchChange = (i: number) => {
    this.setState(
      {
        selectIndex: i,
        canTouch: false,
      },
      () => this.setState({ canTouch: true })
    );
    this._scrollToItem(i);
  };

  _scrollToItem = (i: number) => {
    const { data, itemWidth } = this.props;
    if (data.length < 2) return;
    this.refs.list.scrollTo({
      animated: true,
      x: i === 0 ? 0 : itemWidth * i,
      y: 0,
    });
    Platform.OS === 'android' &&
      _delay(
        () =>
          this.refs.list.scrollTo({
            animated: true,
            x: i === 0 ? 0 : itemWidth * i,
            y: 0,
          }),
        1
      );
    this.props.onIndexChange(i);
  };

  _renderRow = (item: any, index: number) => {
    const { themeColor, itemWidth, marginRight, itemStyle, numberOfLines } = this.props;
    return (
      <Item
        key={item.key}
        idx={index}
        item={item}
        selectIndex={this.state.selectIndex}
        themeColor={themeColor}
        switchChange={(i: number) => {
          this.setState({ selectIndex: i });
          this._scrollToItem(i);
        }}
        marginRight={marginRight}
        itemWidth={itemWidth}
        itemStyles={itemStyle}
        numberOfLines={numberOfLines}
      />
    );
  };

  _onMomentumScrollEnd = (e: any) => {
    const { canSet, move } = this.state;
    const { data, itemWidth } = this.props;
    const offsetX = e.nativeEvent.contentOffset.x; // 滑动距离
    if (offsetX <= itemWidth / 2) {
      move &&
        this.setState({ selectIndex: 0 }, () => {
          this._scrollToItem(0);
        });
    } else {
      const idx = Math.ceil((offsetX - itemWidth / 2) / itemWidth);
      const index = idx >= data.length - 1 ? data.length - 1 : idx;
      move &&
        this.setState({ selectIndex: index }, () => {
          this._scrollToItem(index);
        });
    }
    this.setState({ move: false, canSet: !canSet });
  };

  renderList = () => {
    const { data, itemWidth } = this.props;
    return (
      <ScrollView
        ref="list"
        contentContainerStyle={{
          alignItems: 'center',
          paddingRight: itemWidth * 2 + itemWidth / 2,
        }}
        {...this._panResponder.panHandlers}
        snapToAlignment="center"
        snapToInterval={itemWidth}
        showsHorizontalScrollIndicator={false}
        horizontal
        decelerationRate="fast"
        onScrollBeginDrag={() => {
          this.setState({ move: true });
        }}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      >
        {data.map((item: any, idx: number) => this._renderRow(item, idx))}
      </ScrollView>
    );
  };

  render() {
    return <View style={{ width: this.props.contentWidth }}>{this.renderList()}</View>;
  }
}
