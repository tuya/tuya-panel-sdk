/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Utils, TYText, IconFont } from 'tuya-panel-kit';
import { StyledMain, StyledOut, StyledIn, StyledContent } from './styled';
import { MainProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const DEGREEN = 360;
const defaultactiveBgColor = 'rgb(250,250,250)';
const defaultBgColor = 'rgb(255,255,255)';
const defaultDisabledBgColor = 'rgb(250,250,250)';
const defaultContentColor = 'rgba(122,123,136,1)';
const defaultDisabledContentColor = 'rgba(122,123,136,0.5)';
const defaultOutBgColor = 'rgb(246, 246, 246)';

const PressKey: React.FC<MainProps> = ({
  radius: r,
  padding,
  height,
  width,
  bgColor,
  activeBgColor,
  disabledBgColor,
  contentColor,
  disabledContentColor,
  content,
  contentStyle,
  onPress,
  onLongPress,
  style,
  outBgColor,
  outStyle,
  tip,
  tipStyle,
  status,
  repeat,
  repeatIntervalTime,
  icon,
  img,
  imgStyle,
  iconSize,
  text,
  textStyle,
  useART,
  alwaysPress,
  loading,
  loadingContent,
}) => {
  const [rotate] = useState(new Animated.Value(1));

  useEffect(() => {
    if (loading) {
      begin();
    } else {
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

  const longPress = () => {
    if (onLongPress) {
      if (!repeat) {
        onLongPress();
      } else {
        repeatTimer = setInterval(() => {
          onLongPress();
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

  const _renderLoading = () => (
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
      {loadingContent || _renderContent()}
    </Animated.View>
  );

  const _renderContent = () => {
    if (Boolean(img) && img !== null) {
      return (
        <Image
          source={img}
          style={[{ tintColor: status ? contentColor : disabledContentColor }, imgStyle]}
          resizeMode="contain"
        />
      );
    }
    if (icon) {
      return (
        <IconFont
          color={status ? contentColor : disabledContentColor}
          size={iconSize}
          d={icon}
          useART={useART}
        />
      );
    }
    if (Boolean(text) && typeof text === 'string') {
      return (
        <TYText
          style={[
            {
              color: status ? contentColor : disabledContentColor,
              fontSize: cx(14),
              backgroundColor: 'transparent',
              textAlign: 'center',
            },
            textStyle,
          ]}
        >
          {text}
        </TYText>
      );
    }
    return content;
  };
  const radius = r || width / 2 || height / 2;
  return (
    <StyledMain>
      <StyledOut
        style={outStyle}
        outBgColor={outBgColor}
        width={width}
        height={height}
        radius={radius}
      >
        <StyledIn
          style={style}
          underlayColor={status ? activeBgColor : disabledBgColor}
          disabledBgColor={disabledBgColor}
          status={status}
          bgColor={bgColor}
          width={width}
          height={height}
          padding={padding}
          radius={radius}
          onPress={alwaysPress ? onPress : status ? onPress : null}
          onLongPress={longPress}
          onPressOut={stopRepeat}
        >
          <StyledContent style={contentStyle} status={status}>
            {!loading && _renderContent()}
            {loading && _renderLoading()}
          </StyledContent>
        </StyledIn>
      </StyledOut>
      {!!tip && (
        <View style={[styles.tip, { height: cx(30) }]}>
          <TYText style={[styles.tipText, tipStyle]}>{tip}</TYText>
        </View>
      )}
    </StyledMain>
  );
};

PressKey.defaultProps = {
  radius: cx(34),
  padding: cx(4),
  height: cx(68),
  width: cx(68),
  bgColor: defaultBgColor,
  activeBgColor: defaultactiveBgColor,
  disabledBgColor: defaultDisabledBgColor,
  contentColor: defaultContentColor,
  disabledContentColor: defaultDisabledContentColor,
  content: null,
  contentStyle: null,
  onPress: null,
  onLongPress: null,
  style: null,
  outBgColor: defaultOutBgColor,
  outStyle: null,
  tip: '',
  tipStyle: null,
  status: false,
  repeat: false,
  repeatIntervalTime: 300,
  icon: null,
  img: null,
  imgStyle: null,
  iconSize: cx(20),
  text: '',
  textStyle: null,
  useART: false,
  alwaysPress: false,
  loading: false,
  loadingContent: null,
};

const styles = StyleSheet.create({
  tip: {
    alignItems: 'center',
    paddingTop: cx(10),
  },
  tipText: {
    backgroundColor: 'transparent',
    color: '#81828B',
    fontSize: cx(12),
  },
});

export default PressKey;
