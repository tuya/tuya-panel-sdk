/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, Platform } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import _ from 'lodash';
import getPositionInfo from './position.config';
import { MainProps, PositionName, PositionItem } from './interface';
import {
  StyledMain,
  StyledOut,
  StyledIn,
  StyledOutPosition,
  StyledInPosition,
  StyledSectorTouchableHighlight,
  StyledCenterView,
  StyledCenterTouchableHighlight,
  StyledPoint,
} from './styled';

const { convertX: cx } = Utils.RatioUtils;
const DEGREEN = 360;

const CircleHandle: React.FC<MainProps> = ({
  radius,
  bgColor,
  activeBgColor,
  disabledBgColor,
  padding,
  keyContent,
  offset,
  pointRadius,
  contentHeight,
  contentWidth,
  outBgColor,
  style,
  centerStyle,
  centerRadius,
  centerText,
  centerTextStyle,
  status,
  repeat,
  repeatIntervalTime,
  tip,
  tipStyle,
  onPress,
  onLongPress,
  pointColor,
  loading,
  loadingContent,
}) => {
  const [keyPoint, setKeyPoint] = useState([]);
  const [keyPosition, setKeyPosition] = useState([]);
  const [content, setContent] = useState([]);
  const [rotate] = useState(new Animated.Value(1));
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [loadingHeight, setLoadingHeight] = useState(0);

  useEffect(() => {
    const {
      keyPoint: keyPointArr,
      keyPosition: keyPositionArr,
      content: contentArr,
    } = getPositionInfo({
      radius,
      bgColor,
      activeBgColor,
      disabledBgColor,
      padding,
      keyContent,
      offset,
      pointRadius,
      contentHeight,
      contentWidth,
    });
    setKeyPoint(keyPointArr);
    setKeyPosition(keyPositionArr);
    setContent(contentArr);
  }, []);

  useEffect(() => {
    if (loading.top || loading.bottom || loading.left || loading.right || loading.center) {
      begin();
    } else if (
      !loading.top ||
      !loading.bottom ||
      !loading.left ||
      !loading.right ||
      !loading.center
    ) {
      end();
    }
    return () => {
      end();
      stopRepeat();
    };
  }, [loading]);

  let animateTimer: any = null;
  let repeatTimer: any = null;

  const rotateStart = Animated.timing(rotate, {
    toValue: DEGREEN,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: false,
  });

  const begin = () => {
    rotateStart.start();
    animateTimer = setInterval(() => {
      rotate.setValue(0);
      rotateStart.start();
    }, 1000);
  };

  const end = () => {
    if (animateTimer !== null) {
      clearInterval(animateTimer);
      animateTimer = null;
      rotate.setValue(0);
    }
  };

  const longPress = (key: PositionName) => {
    if (onLongPress && onLongPress[key]) {
      if (!repeat[key]) {
        onLongPress[key]();
      } else {
        repeatTimer = setInterval(() => {
          onLongPress[key]();
        }, repeatIntervalTime);
      }
    }
  };

  const stopRepeat = () => {
    if (repeatTimer !== null) {
      clearInterval(repeatTimer);
      repeatTimer = null;
    }
  };

  const _renderLoading = (key: string, item?: any, c?: any) => {
    const position = item
      ? {
          top: item.top - loadingHeight / 2 + pointRadius,
          left: item.left - loadingWidth / 2 + pointRadius,
        }
      : {};
    return (
      <Animated.View
        key={key}
        style={{
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, DEGREEN],
                outputRange: ['0deg', `${DEGREEN}deg`],
              }),
            },
          ],
          position: 'absolute',
          ...position,
        }}
      >
        {loadingContent || c}
      </Animated.View>
    );
  };

  const _renderCenter = () => {
    if (keyContent && keyContent.center) {
      return keyContent.center;
    }
    return (
      <TYText
        style={[
          {
            color: `rgba(39,197,153,${status.center ? 1 : 0.7})`,
            fontSize: cx(25),
            fontWeight: '400',
          },
          centerTextStyle,
        ]}
      >
        {centerText}
      </TYText>
    );
  };

  const _renderTip = (tipText: string) => (
    <TYText
      style={[
        {
          color: 'rgb(104,104,104)',
          fontSize: cx(15),
          backgroundColor: 'transparent',
        },
        tipStyle,
      ]}
    >
      {tipText}
    </TYText>
  );

  const { top: topTip, right: rightTip, bottom: bottomTip, left: leftTip } = tip || {};
  return (
    <StyledMain>
      <View
        onLayout={({ nativeEvent }: any) => {
          const { width, height } = nativeEvent.layout;
          setLoadingWidth(width);
          setLoadingHeight(height);
        }}
        style={{ position: 'absolute', opacity: 0 }}
      >
        {loadingContent}
      </View>
      {leftTip !== '' && _renderTip(leftTip)}
      <View style={{ alignItems: 'center' }}>
        {topTip !== '' && _renderTip(topTip)}
        <StyledOut radius={radius} outBgColor={outBgColor} padding={padding}>
          <StyledIn radius={radius} padding={padding} style={style}>
            <StyledIn
              radius={radius}
              padding={padding}
              style={[
                style,
                {
                  transform: [{ rotate: '45deg' }],
                  overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
                },
              ]}
            >
              <StyledInPosition radius={radius} padding={padding}>
                {keyPosition.map((item: PositionItem) => (
                  <StyledSectorTouchableHighlight
                    key={item.key}
                    underlayColor={status[item.key] ? item.activeBgColor : item.disabledBgColor}
                    item={item}
                    status={status[item.key]}
                    padding={padding}
                    radius={radius}
                    onPress={status[item.key] && onPress ? onPress[item.key] : null}
                    onLongPress={() => longPress(item.key)}
                    onPressOut={stopRepeat}
                  >
                    <View />
                  </StyledSectorTouchableHighlight>
                ))}
              </StyledInPosition>
            </StyledIn>
          </StyledIn>
          <StyledOutPosition radius={radius} padding={padding}>
            {_.isEmpty(keyContent) &&
              keyPoint.map((item: PositionItem) =>
                !loading[item.key] ? (
                  <StyledPoint
                    key={item.key}
                    pointRadius={pointRadius}
                    item={item}
                    pointColor={pointColor}
                    status={status[item.key]}
                    pointerEvents="none"
                  />
                ) : (
                  _renderLoading(item.key, item as any)
                )
              )}
          </StyledOutPosition>
          {!_.isEmpty(keyContent) &&
            content.map((item: PositionItem) => (
              <View
                key={item.key}
                style={{
                  position: 'absolute',
                  ...item.origin,
                }}
              >
                {item.content && (
                  <View
                    style={{
                      position: 'absolute',
                      width: contentWidth,
                      height: contentHeight,
                      opacity: status[item.key] ? 1 : 0.5,
                      ...item.position,
                    }}
                    pointerEvents="none"
                  >
                    {!loading[item.key]
                      ? item.content
                      : _renderLoading(item.key, null, item.content)}
                  </View>
                )}
              </View>
            ))}
          <StyledCenterView centerRadius={centerRadius} centerBgColor={bgColor.center} />
          <StyledCenterTouchableHighlight
            underlayColor={status.center ? activeBgColor.center : disabledBgColor.center}
            centerRadius={centerRadius}
            centerStatus={status.center}
            radius={radius}
            onPress={status.center && onPress ? onPress.center : null}
            onLongPress={() => longPress('center')}
            onPressOut={stopRepeat}
            centerBgColor={bgColor.center}
            centerDisabledBgColor={disabledBgColor.center}
            style={centerStyle}
          >
            {loading.center ? _renderLoading('center', null, _renderCenter()) : <View />}
          </StyledCenterTouchableHighlight>
          {!loading.center && (
            <View style={{ position: 'absolute' }} pointerEvents="none">
              {_renderCenter()}
            </View>
          )}
        </StyledOut>
        {bottomTip !== '' && _renderTip(bottomTip)}
      </View>
      {rightTip !== '' && _renderTip(rightTip)}
    </StyledMain>
  );
};

CircleHandle.defaultProps = {
  radius: cx(100),
  bgColor: {
    top: '#FFFFFF',
    bottom: '#FFFFFF',
    left: '#FFFFFF',
    right: '#FFFFFF',
    center: '#FFFFFF',
  },
  activeBgColor: {
    top: '#FAFAFA',
    bottom: '#FAFAFA',
    left: '#FAFAFA',
    right: '#FAFAFA',
    center: '#FAFAFA',
  },
  disabledBgColor: {
    top: '#FAFAFA',
    bottom: '#FAFAFA',
    left: '#FAFAFA',
    right: '#FAFAFA',
    center: '#FAFAFA',
  },
  padding: cx(4),
  keyContent: null,
  offset: cx(18),
  pointRadius: cx(2),
  contentHeight: cx(20),
  contentWidth: cx(50),
  outBgColor: '#F6F6F6',
  style: null,
  centerStyle: null,
  centerRadius: cx(40),
  centerText: 'OK',
  centerTextStyle: null,
  status: {
    top: false,
    bottom: false,
    left: false,
    right: false,
    center: false,
  },
  repeat: {
    top: false,
    bottom: false,
    left: false,
    right: false,
    center: false,
  },
  repeatIntervalTime: 300,
  tip: null,
  tipStyle: null,
  onPress: null,
  onLongPress: null,
  pointColor: '#7A7B88',
  loading: {
    top: false,
    bottom: false,
    left: false,
    right: false,
    center: false,
  },
  loadingContent: null,
};

export default CircleHandle;
