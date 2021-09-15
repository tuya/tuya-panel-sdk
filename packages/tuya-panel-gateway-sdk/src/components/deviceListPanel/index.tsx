import React, { FC, useState, useRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  PanResponderInstance,
  PanResponder,
} from 'react-native';
import { TYText, Utils, DevInfo, IconFont, TYSdk, TopBar, TabBar } from 'tuya-panel-kit';
import styles from './style';
import { DeviceListPanelProps } from './interface';
import { getOnlineState } from '../../utils';
import Shadow from '../shadowBox';

interface ListRef {
  [key: string]: any;
}

const { convertX: cx } = Utils.RatioUtils;
const { height: screenHeight } = Dimensions.get('window');

// 子设备项的高度
const deviceItemHeight = Math.floor(cx(120));
// const highestPosition = TopBar.height;
// 屏幕中线 下cy(30)处为 默认最大上边距
// 中线为临界点 超过中线 则为上拉触发 否则弹回
// 零点以下 cy(50)范围内为下拉边界区 超过则为下拉触发 否则弹回

const pullDownHeight = TopBar.height; // 顶部下拉view取TopBar高度
const minSpeed = 0.5; // 滑动时自动吸底和吸顶的临界速度
const borderRadius = cx(10);

const DeviceListPanel: FC<DeviceListPanelProps> = ({
  dataSource,
  tabs,
  panelStyle,
  containerStyle,
  tabBarStyle,
  highestPosition,
  initialPosition,
  autoShrinkDistance,
  isShowIconMore,
  initialTab,
  children,
  ListEmptyComponent,
  onIconMorePress,
  onTabChange,
  customRenderItem,
  customRenderTabBar,
  customRenderList,
}) => {
  const [tab, setChosenTab] = useState(initialTab || '0');
  // const [tab, setChosenTab] = useState(initialTab || (tabs && tabs.length) ? tabs[0].key : '0');
  // 滑块的borderRadius值
  const [radius, setRadius] = useState(borderRadius);
  // 滑块当前顶部位置
  const [releaseTop, setReleaseTop] = useState(initialPosition);
  const animatedTop = useRef(new Animated.Value(initialPosition)).current;
  const pullDownTop = useRef(new Animated.Value(-pullDownHeight)).current;
  const releaseTopRef = useRef(initialPosition);
  const flaListRef = useRef({} as ListRef);
  const contentOffset = useRef(0);

  const listPaddingHorizontal = cx(24);
  // 子设备项的宽度
  const deviceItemWidth = cx(375 - listPaddingHorizontal * 2 - 12) / 2;
  const boundaryTop = highestPosition + autoShrinkDistance; // 滑块默认自动吸顶上边界的上边距
  const boundaryBottom = initialPosition - autoShrinkDistance; // 滑块默认自动吸顶下边界的上边距

  let movingTop = initialPosition; // 滑块的顶部位置
  let vy = 0;
  let direction = 'down'; // 手势方向
  let panResponder: PanResponderInstance | any = {};
  // 当前选择tab的下标

  // 设置滑动列表的top值
  const setTop = (top: number) => {
    return Animated.timing(animatedTop, {
      toValue: top,
      duration: movingTop > boundaryBottom && movingTop < initialPosition ? 500 : 200,
    });
  };
  // topMask 显示
  const showPullDown = Animated.timing(pullDownTop, {
    toValue: 0,
    duration: 200,
  });
  // 隐藏topmask
  const hidePullDown = Animated.timing(pullDownTop, {
    toValue: -pullDownHeight,
    duration: 150,
  });
  const enterItem = (item: any) => {
    TYSdk.native.pushToNextPageWithDeviceId(item.devId);
  };
  const onScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    contentOffset.current = y;
  };
  const pullDown = () => {
    animatedToTop(initialPosition);
    setTimeout(() => hidePullDown.start(), 200);
  };
  /**
   * 吸顶和吸底动画
   */
  const animatedToTop = (top: number) => {
    setTop(top).start(() => {
      setRadius(top === highestPosition ? 0 : borderRadius);
      setReleaseTop(top);
      releaseTopRef.current = top;

      // 滑块到底部后，强制列表滚动到顶部
      if (contentOffset.current > 0 && top === initialPosition) {
        flaListRef.current.scrollToOffset(0);
      }
      // 顶部下拉按钮展示逻辑
      if (top === highestPosition) {
        showPullDown.start();
      } else if (top === initialPosition) {
        hidePullDown.start();
      }
      // 每次释放后重置方向
      direction = 'down';
    });
  };

  const renderItem = ({ item }: any) => {
    const { iconUrl, icon, name, isOnline: online, pcc = '' } = item;
    const isOnline = getOnlineState(pcc) || online;
    const itemOpacity = isOnline ? 1 : 0.3;
    return (
      <View style={{ height: deviceItemHeight + 12 }}>
        <Shadow
          shadowStyle={{
            borderRadius: 5,
            shadowRadius: 5,
            shadowColor: '#2B2B2B',
            shadowOpacity: 0.1,
            height: deviceItemHeight,
            width: deviceItemWidth,
            backgroundColor: '#ffffff',
            shadowOffset: {
              width: 0,
              height: 0,
            },
          }}
        >
          <TouchableOpacity style={styles.itemContent} onPress={() => enterItem(item)}>
            <View style={styles.iconContainer}>
              {isShowIconMore && (
                <TouchableOpacity
                  style={[styles.iconMore, { opacity: itemOpacity }]}
                  onPress={() => onIconMorePress(item)}
                >
                  <IconFont size={cx(20)} name="moreH" />
                </TouchableOpacity>
              )}
            </View>
            <Image
              source={{ uri: iconUrl || icon }}
              style={[styles.itemImage, { opacity: itemOpacity }]}
            />
            <TYText
              text={name}
              numberOfLines={1}
              style={[styles.itemText, { opacity: itemOpacity }]}
            />
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  };

  const onPanResponderRelease = () => {
    let finalTop = initialPosition;
    // 滑动速度大于最小速度时
    if (vy >= minSpeed) {
      if (direction === 'up') {
        // 自动吸顶
        finalTop = highestPosition;
      } else {
        // 自动吸底
        finalTop = initialPosition;
      }
      // 滑动前滑块处于自动吸顶下边界以下并且滑动到下边界以上时
    } else if (
      (releaseTopRef.current < boundaryTop && movingTop < boundaryTop) ||
      (releaseTopRef.current > boundaryBottom && movingTop < boundaryBottom)
    ) {
      // 自动吸顶
      finalTop = highestPosition;
    } else {
      // 滑动未超出自动吸顶下边界，自动吸底
      finalTop = initialPosition;
    }

    // 吸顶和吸底动画
    animatedToTop(finalTop);
  };

  panResponder = useRef(
    PanResponder.create({
      // 捕获阶段
      onStartShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,
      // 释放时
      onMoveShouldSetPanResponderCapture: (__, gestureState) => {
        // 未滑到顶部时，响应者为当前组件
        if (releaseTopRef.current > highestPosition) {
          // 滑动距离少于5时，视为点击事件
          if (Math.abs(gestureState.dy) < 5) {
            return false;
          }
          return true;
        }
        // 滚动条和当前组件同时置顶时
        if (contentOffset.current <= 0 && releaseTopRef.current === highestPosition) {
          // 向下滑动时，响应者为当前组件
          if (gestureState.dy > 0) {
            return true;
          }
          // 向上滑动时，响应者为FlatList
          return false;
        }
        return false;
      },
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (__, gestureState) => {
        const { vy: gsVy, dy } = gestureState;
        vy = Math.abs(gsVy);
        // 当前滑动方向
        direction = dy >= 0 ? 'down' : 'up';
        // 当前滑块离顶部上边距
        const finalValue = releaseTopRef.current + dy;

        // finalValue在滑动设定范围内时
        if (finalValue <= initialPosition && finalValue >= highestPosition) {
          animatedTop.setValue(finalValue);
          movingTop = finalValue;
          releaseTopRef.current = finalValue;
          // setRadius(finalValue > highestPosition ? cx(10) : 0);
          // 动态设置滑块上边距动画值
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease,
      onPanResponderTerminate: onPanResponderRelease,
    })
  ).current;
  // 顶部的pull down
  const renderPullDown = () => {
    return (
      <Animated.View style={[styles.pullDown, { top: pullDownTop, height: pullDownHeight }]}>
        <TouchableOpacity onPress={pullDown} style={styles.pullDownButton}>
          <IconFont name="arrow" size={16} style={styles.iconPullDown} />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  // 手势区域
  const renderPanResponder = () => {
    return (
      <Animated.View
        style={[styles.scrollMain, panelStyle, { top: animatedTop, borderRadius: radius }]}
        {...(panResponder && panResponder.panHandlers ? panResponder.panHandlers : {})}
      >
        <View style={[styles.tabMain, { paddingHorizontal: listPaddingHorizontal }]}>
          <TouchableOpacity
            style={[
              styles.tabMainIcon,
              {
                backgroundColor:
                  releaseTop !== highestPosition ? 'rgb(235,235,235)' : 'rgba(0,0,0,0)',
              },
            ]}
          />
          {typeof customRenderTabBar === 'function' ? (
            customRenderTabBar()
          ) : (
            <TabBar
              tabs={tabs}
              activeKey={tab}
              onChange={handleTabChange}
              type="radio"
              style={[styles.tabBar, tabBarStyle]}
            />
          )}
        </View>
        {typeof customRenderList === 'function' ? customRenderList() : renderDeviceList()}
        {React.isValidElement(children) && children}
      </Animated.View>
    );
  };
  const handleTabChange = (value: string) => {
    setChosenTab(value);
    typeof onTabChange === 'function' && onTabChange(value);
  };
  // 设备列表
  const renderDeviceList = () => {
    return (
      <FlatList
        ref={(el: FlatList<DevInfo>) => {
          flaListRef.current = el;
        }}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.listColumnWrapper}
        onScroll={onScroll}
        data={dataSource}
        keyExtractor={item => item.devId}
        renderItem={typeof customRenderItem === 'function' ? customRenderItem : renderItem}
        ListEmptyComponent={ListEmptyComponent}
        scrollEnabled={releaseTop === highestPosition}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderPullDown()}
      {renderPanResponder()}
    </View>
  );
};
DeviceListPanel.defaultProps = {
  dataSource: [],
  highestPosition: 0,
  initialPosition: screenHeight / 2,
  autoShrinkDistance: 50,
  isShowIconMore: true,
};

export default DeviceListPanel;
