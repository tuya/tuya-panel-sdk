/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  PanResponder,
  findNodeHandle,
  UIManager,
  View,
  Image,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Res from './res';
import styles from './style';
import { TYIpcDragSortProps, orderItemInterface } from './interface';

const DragSort: React.FunctionComponent<TYIpcDragSortProps> = props => {
  const { data: dataSource, touchPosition, itemHeight } = props;

  const [onPanResponderMoveTime, setOnPanResponderMoveTime] = useState(0);
  // 准备排序
  const [isReadyOrder, setIsReadyOrder] = useState(false);
  const [_listRef, setListRef] = useState(null);

  // 排序
  const [isOrder, setIsOrder] = useState(false);
  const [contentOffsetY, setContentOffsetY] = useState(0);
  const [orderItem, setOrderItem] = useState({ item: {}, index: 0 });
  const [moveItem, setMoveItem] = useState({ item: {}, index: 0 });
  const [moveItemMarginTop, setMoveItemMarginTop] = useState(0);
  const [evtPageY, setEvtPageY] = useState(0);

  /**
   * 获取移动项上边距
   * @param moveY 移动Y坐标
   * @param listHeight 列表高度
   * @private
   */
  const _getMoveItemMarginTop = (moveY: number, listHeight: number) => {
    const marginTop = moveY - itemHeight / 2;
    const maxMarginTop = listHeight - itemHeight;
    return marginTop < 0 ? 0 : marginTop > maxMarginTop ? maxMarginTop : marginTop;
  };

  useEffect(() => {
    touchStart();
    _onOrder();
  }, [isReadyOrder]);

  useEffect(() => {
    touchMove();
  }, [evtPageY]);

  const touchStart = () => {
    if (isReadyOrder) {
      UIManager.measure(
        findNodeHandle(_listRef),
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          const index = Math.ceil((evtPageY - pageY + contentOffsetY) / itemHeight) - 1;
          if (index < dataSource.length && isReadyOrder) {
            setIsOrder(true);
            setOrderItem({ item: dataSource[index], index });
            setMoveItem({ item: dataSource[index], index });
            setMoveItemMarginTop(_getMoveItemMarginTop(evtPageY - pageY, height));
          }
        }
      );
    }
  };

  const touchMove = () => {
    const now = Date.now();
    if (!isOrder || now - onPanResponderMoveTime <= props.renderFrameTime) return;
    setOnPanResponderMoveTime(now);

    // 获取当前移动子项
    UIManager.measure(
      findNodeHandle(_listRef),
      (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        if (!isReadyOrder) return;
        let index = Math.ceil((evtPageY - pageY + contentOffsetY) / itemHeight) - 1;
        index = index >= dataSource.length ? dataSource.length - 1 : index < 0 ? 0 : index;
        setMoveItem({ item: dataSource[index], index });
        setMoveItemMarginTop(_getMoveItemMarginTop(evtPageY - pageY, height));
      }
    );
  };

  // 排序
  const _onOrder = () => {
    if (isReadyOrder) return;
    const { index: orderIndex } = orderItem;
    const { index: moveIndex } = moveItem;

    if (orderIndex !== moveIndex) {
      const list = [];
      const item = dataSource[orderIndex];
      dataSource.forEach((v, k) => {
        if (k !== orderIndex) {
          if (k === moveIndex) {
            if (orderIndex < moveIndex) {
              list.push(v);
              list.push(item);
            } else {
              list.push(item);
              list.push(v);
            }
          } else {
            list.push(v);
          }
        }
      });

      const orderObj = {
        list,
        orderItemIndex: orderIndex,
        moveItemIndex: moveIndex,
      };

      props.onOrder(orderObj);
    }

    // 重置
    setIsOrder(false);
    setOrderItem({ item: {}, index: 0 });
    setMoveItem({ item: {}, index: 0 });
    setMoveItemMarginTop(0);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onStartShouldSetPanResponderCapture: () => false,

      onPanResponderStart: (evt: GestureResponderEvent) => {
        setIsReadyOrder(true);
        setEvtPageY(evt.nativeEvent.pageY);
      },

      onPanResponderMove: (evt: GestureResponderEvent) => {
        setEvtPageY(evt.nativeEvent.pageY);
      },

      onPanResponderTerminationRequest: () => false,

      onPanResponderRelease: () => {
        setIsReadyOrder(false);
      },
    })
  ).current;

  // 渲染子项
  const _renderItem = (data: orderItemInterface) => {
    const { index, item } = data;
    const { orderContain, orderWidth, icon, renderItem } = props;

    const touchView = <View style={[styles.orderButton, { width: orderWidth }]}>{icon}</View>;
    return (
      <View style={[styles.itemBorder, orderContain]}>
        {touchPosition === 'left' && touchView}
        <View style={styles.item}>{renderItem(item, index)}</View>
        {touchPosition === 'right' && touchView}
      </View>
    );
  };

  const renderItem = (data: orderItemInterface) => {
    const { item, index } = data;

    const showItem = <View key="show" style={{ height: itemHeight }} />;
    const needItem = <View key="item">{_renderItem({ item, index })}</View>;

    let items = [];
    if (isOrder && index === moveItem.index) {
      if (index < orderItem.index) {
        items = [showItem, needItem];
      } else if (index === orderItem.index) {
        items = [showItem];
      } else {
        items = [needItem, showItem];
      }
    } else if (!isOrder || (isOrder && index !== orderItem.index)) {
      items = [needItem];
    }

    return <View>{items}</View>;
  };

  const handleRef = (ref: HTMLDivElement) => {
    ref && setListRef(ref);
    props.getListRef(ref);
  };

  const handleScroll = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentOffsetY(evt.nativeEvent.contentOffset.y);
    props.onScroll(evt);
  };

  // 移动控制
  const move = (
    <View
      style={[styles.move, { width: props.orderWidth, [touchPosition]: 0 }]}
      {...panResponder.panHandlers}
    />
  );
  // 排序子项指示
  let order = null;
  if (isOrder) {
    order = (
      <View style={[styles.order, { marginTop: moveItemMarginTop }]}>{_renderItem(orderItem)}</View>
    );
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {/* 移动控制 */}
      {move}
      {/* 排序子项指示 */}
      {order}
      {/* 子项列表 */}
      <FlatList
        {...props}
        alwaysBounceVertical={false}
        style={{}}
        ref={handleRef}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isOrder}
        onScroll={handleScroll}
        renderItem={renderItem}
      />
    </View>
  );
};

DragSort.defaultProps = {
  containerStyle: null,
  orderContain: {},
  orderWidth: 44,
  icon: <Image style={styles.orderIcon} source={Res.button} />,
  getListRef: () => {},
  onScroll: () => {},
  renderFrameTime: 20,
  touchPosition: 'right',
  itemHeight: 60,
  onOrder: () => {},
};

export default DragSort;
