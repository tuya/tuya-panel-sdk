/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ScrollView,
  View,
  PanResponder,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

const defaultSelect = {
  dragSortItem: null,
  selectedOriginLayout: null,
  selectedPosition: null,
  scrollEnabled: true,
};

interface IDragSortReview {
  dragSortList: any;
  renderItem: (data: any, isSelect?: boolean) => React.ReactNode;
  [props: string]: any;
}

const ReviewDragSort: React.FC<IDragSortReview> = props => {
  const { onDataChange, dragSortList, renderItem } = props;
  const scrollRef = useRef(null); // 滚动的Ref
  const [isLongPress, setIsLongPress] = useState(false); // 长按的标记
  const LayoutElement = useRef(new Map()); // Layout元素重排的集合
  const isMoving = useRef(false); // 是否开始移动，防止在移动的时候调用onPressout
  const currentScrollAttr = useRef(null); // 长按时的一些数据快照
  const keyReflectIndexMap = useRef(new Map()); // key 与 index的映射
  const isTransform = useRef(false); // 正在交换
  const dragSortListRef = useRef(null); // dragSortList的最新值
  const [selectedAttr, setSelectedAttr] = useState(defaultSelect); // 选择的对象以及状态属性

  useEffect(() => {
    dragSortListRef.current = dragSortList; // 手势移动时相应数据不是最新的，需要用ref进行保存
  }, [dragSortList]);

  /**
   * @param nativeEvent 事件
   * @param gestureAttr 手势属性
   * @desc 手势开始移动时调用的方法，当遇到符合条件的数据的时候 进行交换transform
   */
  const movingGestureEvent = (nativeEvent, gestureAttr) => {
    isMoving.current = true;
    const { selectedOriginLayout, selectedPosition } = selectedAttr;
    const { dx, dy, moveY, y0 } = gestureAttr;
    if (!selectedOriginLayout) return;
    if (!isTransform.current) {
      /**
       * 对象的移动的四点坐标
       */
      const moveX1 = selectedOriginLayout.x + dx;
      const moveX2 = moveX1 + selectedOriginLayout.width;
      const moveY1 = selectedOriginLayout.y + dy;
      const moveY2 = moveY1 + selectedOriginLayout.height;

      const moveArea = selectedOriginLayout.width * selectedOriginLayout.height; // 移动对象的面积
      // const layouts = LayoutElement.current.values();
      LayoutElement.current.forEach(layout => {
        if (layout.key !== selectedOriginLayout.key) {
          const tempX1 = layout.x;
          const tempX2 = tempX1 + layout.width;
          const tempY1 = layout.y;
          const tempY2 = tempY1 + layout.height;
          const w = Math.min(moveX2, tempX2) - Math.max(moveX1, tempX1);
          const h = Math.min(moveY2, tempY2) - Math.max(moveY1, tempY1);
          if (w > 0 && h > 0) {
            const overlapArea = w * h;
            const minArea = Math.min(layout.width * layout.height, moveArea);
            if (overlapArea > minArea * 0.55) {
              transformElement(selectedOriginLayout.key, layout.key);
            }
          }
        }
      });
      // for (const layout of layouts) {
      //   /**
      //    * 每个元素的四点坐标固定位置
      //    */
      //   const tempX1 = layout.x;
      //   const tempX2 = tempX1 + layout.width;
      //   const tempY1 = layout.y;
      //   const tempY2 = tempY1 + layout.height;

      //   /**
      //    * 比较面积
      //    */
      //   if (layout.key === selectedOriginLayout.key) continue;
      //   const w = Math.min(moveX2, tempX2) - Math.max(moveX1, tempX1);
      //   const h = Math.min(moveY2, tempY2) - Math.max(moveY1, tempY1);
      //   if (w <= 0 || h <= 0) continue;
      //   const overlapArea = w * h;
      //   const minArea = Math.min(layout.width * layout.height, moveArea);
      //   if (overlapArea < minArea * 0.55 || !overlapArea) continue;
      //   transformElement(selectedOriginLayout.key, layout.key);
      //   break;
      // }
    }
    const preLeft = selectedPosition.left;
    const preTop = selectedPosition.top;
    const nextLeft = selectedOriginLayout.x + dx + 0.5;
    const nextTop = selectedPosition.initTop + (moveY - y0) + 0.5;

    if (preLeft !== nextLeft || preTop !== nextTop) {
      setSelectedAttr({
        ...selectedAttr,
        selectedPosition: {
          ...selectedAttr.selectedPosition,
          left: nextLeft,
          top: nextTop,
        },
      });
    }
  };

  const transformElement = (fromKey, toKey) => {
    isTransform.current = true;
    const { length } = dragSortListRef.current;
    const fromIndex = keyReflectIndexMap.current.get(fromKey);
    const toIndex = keyReflectIndexMap.current.get(toKey);
    if (fromIndex < 0 || fromIndex >= length || toIndex < 0 || toIndex >= length) {
      isTransform.current = false;
      return;
    }
    const newDataSource = [...dragSortListRef.current];
    const deleteItem = newDataSource.splice(fromIndex, 1);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity)
    );
    newDataSource.splice(toIndex, 0, deleteItem[0]);
    onDataChange(newDataSource, () => {
      setTimeout(() => {
        isTransform.current = false;
      }, 320);
    });
  };

  /**
   * 手指头松开的事件
   */
  const releaseGestureEvent = () => {
    initStatus();
  };

  /**
   * @param dragSortItem 当前选择的拖拽对象
   * @desc 设置当前的状态值给selectedAttr，并将长按状态打开
   */
  const onLongPress = dragSortItem => {
    const { key } = dragSortItem;
    const currentLayout = LayoutElement.current.get(key);
    const scrollOffsetY = currentScrollAttr?.current?.scrollOffsetY || 0;
    const initTop = currentLayout.y - scrollOffsetY + 0.5;
    setSelectedAttr({
      dragSortItem,
      scrollEnabled: false,
      selectedOriginLayout: { ...currentLayout },
      selectedPosition: {
        left: currentLayout.x + 0.5,
        top: initTop,
        initTop,
      },
    });
    setIsLongPress(true);
  };

  /**
   * @desc onPressOut会在移动前执行,所以要注意他执行的时间点
   */
  const onPressOut = () => {
    setTimeout(() => {
      if (!isMoving.current) {
        initStatus();
      }
    }, 220);
    // releasePanResponderEvent();
  };

  /**
   * @desc 设置默认状态
   */
  const initStatus = () => {
    setSelectedAttr({
      ...selectedAttr,
      scrollEnabled: true,
    });
    setIsLongPress(false);
    isMoving.current = false;
  };

  /**
   * @param event 浏览器屏幕滚动事件
   * @desc 保存总高度，浏览器高度，当前偏移的Y
   */
  const onScrollListener = ({ nativeEvent }) => {
    currentScrollAttr.current = {
      hasScroll: true,
      scrollOffsetY: nativeEvent.contentOffset.y,
      totalHeight: nativeEvent.contentSize.height,
      windowHeight: nativeEvent.layoutMeasurement.height,
    };
  };

  /**
   * @desc 手势捕获事件 useMemo(isLongPress)
   */
  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: () => isLongPress,
        onMoveShouldSetPanResponderCapture: () => isLongPress,
        onPanResponderMove: movingGestureEvent,
        onPanResponderRelease: releaseGestureEvent,
        onPanResponderTerminationRequest: () => false, // 其他视图响应，本手势是否释放响应
        onShouldBlockNativeResponder: () => false, // 是否阻隔原生事件
      }),
    [isLongPress]
  );

  return (
    <View style={styles.wrap}>
      {isLongPress && (
        <Animated.View
          style={{
            left: selectedAttr.selectedPosition.left,
            top: selectedAttr.selectedPosition.top,
            position: 'absolute',
            zIndex: 999,
          }}
        >
          {renderItem(selectedAttr.dragSortItem, true)}
        </Animated.View>
      )}
      <ScrollView
        bounces={false}
        scrollEventThrottle={1}
        ref={scrollRef}
        style={styles.scroll}
        onScroll={onScrollListener}
        scrollEnabled={selectedAttr.scrollEnabled}
      >
        <View style={styles.container}>
          {dragSortList.map((dragSortItem, index) => {
            const { key } = dragSortItem;
            keyReflectIndexMap.current.set(key, index);
            return (
              <Animated.View
                key={key}
                {..._panResponder.panHandlers}
                onLayout={event => {
                  LayoutElement.current.set(key, { ...event.nativeEvent.layout, key });
                }}
              >
                <TouchableOpacity
                  onLongPress={() => onLongPress(dragSortItem)}
                  onPressOut={onPressOut}
                >
                  {renderItem(dragSortItem)}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewDragSort;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scroll: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    position: 'relative',
  },
});
