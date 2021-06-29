/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Animated, Easing } from 'react-native';
import { Utils, TYText, IconFont } from 'tuya-panel-kit';
import { StyledOut, StyledIn, StyledTip } from './styled';
import { MainProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const DEGREEN = 360;
const defaultactiveBgColor = 'rgb(250,250,250)';
const defaultBgColor = 'rgb(255,255,255)';
const defaultDisabledBgColor = 'rgb(250,250,250)';
const defaultContentColor = 'rgba(122,123,136,1)';
const defaultDisabledContentColor = 'rgba(122,123,136,0.5)';
const defaultOutBgColor = 'rgb(246, 246, 246)';

const DoubleKey: React.FC<MainProps> = props => {
  const {
    radius,
    padding,
    height,
    width,
    bgColor,
    activeBgColor,
    disabledBgColor,
    contentColor,
    disabledContentColor,
    onPress,
    onLongPress,
    outStyle,
    outBgColor,
    tipStyle,
    tip,
    status,
    repeat,
    repeatIntervalTime,
    icon,
    img,
    imgStyle,
    iconSize,
    type,
    text,
    textStyle,
    useART,
    loading,
    loadingContent,
  } = props;
  const [rotate] = useState(new Animated.Value(1));

  useEffect(() => {
    if (Array.isArray(loading)) {
      if (loading[0] || loading[1]) {
        begin();
      } else if (!loading[0] || !loading[1]) {
        end();
      }
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

  const longPress = (index: 0 | 1) => {
    const currentOnLongPress = Array.isArray(onLongPress) ? onLongPress[index] : null;
    const currentRepeat =
      typeof repeat === 'boolean' ? repeat : Array.isArray(repeat) ? repeat[index] : false;
    if (currentOnLongPress) {
      if (!currentRepeat) {
        currentOnLongPress();
      } else {
        repeatTimer = setInterval(() => {
          currentOnLongPress();
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

  const _renderLoading = (index: 0 | 1) => (
    <Animated.View
      style={{
        transform: [
          {
            rotate: rotate.interpolate({
              inputRange: [0, DEGREEN],
              outputRange: ['0deg', `${DEGREEN}deg`],
            }),
          },
        ],
      }}
    >
      {loadingContent || _renderContent(index)}
    </Animated.View>
  );
  const _renderContent = (index: 0 | 1) => {
    const currentContentColor =
      typeof contentColor === 'string'
        ? contentColor
        : Array.isArray(contentColor)
        ? contentColor[index]
        : defaultContentColor;
    const currentDisabledContentColor =
      typeof disabledContentColor === 'string'
        ? disabledContentColor
        : Array.isArray(disabledContentColor)
        ? disabledContentColor[index]
        : defaultDisabledContentColor;
    const currentIcon = Array.isArray(icon) ? icon[index] : null;
    const currentImg = Array.isArray(img) ? img[index] : null;
    const currentText = Array.isArray(text) ? text[index] : null;
    const currentStatus =
      typeof status === 'boolean' ? status : Array.isArray(status) ? status[index] : false;
    const currentUseART =
      typeof status === 'boolean' ? useART : Array.isArray(useART) ? useART[index] : false;
    if (currentIcon) {
      return (
        <IconFont
          color={currentStatus ? currentContentColor : currentDisabledContentColor}
          size={iconSize}
          d={currentIcon}
          useART={currentUseART as boolean}
        />
      );
    }
    if (Boolean(currentImg) && currentImg !== null) {
      return (
        <Image
          source={currentImg}
          style={[
            {
              tintColor: currentStatus ? currentContentColor : currentDisabledContentColor,
            },
            imgStyle,
          ]}
        />
      );
    }
    if (Boolean(currentText) && typeof currentText === 'string') {
      return (
        <TYText
          style={[
            {
              color: currentStatus ? currentContentColor : currentDisabledContentColor,
              fontSize: cx(14),
              backgroundColor: 'transparent',
              textAlign: 'center',
            },
            textStyle,
          ]}
        >
          {currentText}
        </TYText>
      );
    }
    return null;
  };
  const _renderItem = (index: 0 | 1) => {
    const currentBgColor =
      typeof bgColor === 'string'
        ? bgColor
        : Array.isArray(bgColor)
        ? bgColor[index]
        : defaultBgColor;
    const currentActiveBgColor =
      typeof activeBgColor === 'string'
        ? activeBgColor
        : Array.isArray(activeBgColor)
        ? activeBgColor[index]
        : defaultactiveBgColor;
    const currentDisabledBgColor =
      typeof disabledBgColor === 'string'
        ? disabledBgColor
        : Array.isArray(disabledBgColor)
        ? disabledBgColor[index]
        : defaultDisabledBgColor;
    const currentOnPress = Array.isArray(onPress) ? onPress[index] : null;
    const currentOnLongPress = Array.isArray(onLongPress) ? onLongPress[index] : null;
    const currentStatus =
      typeof status === 'boolean' ? status : Array.isArray(status) ? status[index] : false;
    return (
      <TouchableHighlight
        underlayColor={currentStatus ? currentActiveBgColor : currentDisabledBgColor}
        onPress={
          currentStatus && Boolean(currentOnPress) && currentOnPress !== null
            ? currentOnPress
            : undefined
        }
        onLongPress={
          Boolean(currentOnLongPress) && currentOnLongPress !== null
            ? () => longPress(index)
            : undefined
        }
        onPressOut={stopRepeat}
        style={[
          styles.customItem,
          {
            backgroundColor: currentStatus ? currentBgColor : currentDisabledBgColor,
          },
        ]}
      >
        <View style={styles.touchItem}>
          {!loading[index] && _renderContent(index)}
          {loading[index] && _renderLoading(index)}
        </View>
      </TouchableHighlight>
    );
  };
  const boxHeight = height || (type === 'vertical' ? cx(150) : cx(68));
  const boxWidth = width || (type === 'horizontal' ? cx(150) : cx(68));
  const boxRadius = typeof radius === 'number' ? radius : Math.min(height, width) / 2;
  return (
    <StyledOut
      style={outStyle}
      outBgColor={outBgColor}
      width={boxWidth}
      height={boxHeight}
      radius={boxRadius}
    >
      <StyledIn
        width={boxWidth}
        height={boxHeight}
        padding={padding}
        radius={boxRadius}
        type={type}
      >
        {_renderItem(0)}
        {_renderItem(1)}
        <StyledTip style={tipStyle}>{tip}</StyledTip>
      </StyledIn>
    </StyledOut>
  );
};

DoubleKey.defaultProps = {
  radius: cx(34),
  padding: cx(4),
  height: 0,
  width: 0,
  bgColor: defaultBgColor,
  activeBgColor: defaultactiveBgColor,
  disabledBgColor: defaultDisabledBgColor,
  contentColor: defaultContentColor,
  disabledContentColor: defaultDisabledContentColor,
  onPress: null,
  onLongPress: null,
  outStyle: null,
  outBgColor: defaultOutBgColor,
  tipStyle: null,
  tip: '',
  status: false,
  repeat: false,
  repeatIntervalTime: 300,
  icon: null,
  img: null,
  imgStyle: null,
  iconSize: cx(20),
  type: 'vertical',
  text: ['', ''],
  textStyle: null,
  useART: false,
  loading: [false, false],
  loadingContent: null,
};

const styles = StyleSheet.create({
  customItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  touchItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DoubleKey;
