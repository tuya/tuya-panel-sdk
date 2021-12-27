import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path, G, Circle } from 'react-native-svg';
import { Utils, TYText } from 'tuya-panel-kit';
import _padStart from 'lodash/padStart';
import { ClockProps } from '../interface';

const { convertX } = Utils.RatioUtils;
const cx = (value: number) => {
  return Math.floor(convertX(value));
};
const Clock = (props: ClockProps) => {
  const {
    minuteLabel,
    secondLabel,
    hourLabel,
    size,
    lineNum,
    totalCountDown,
    countdown,
    lineWidth,
    lineHeight,
    activeColor,
    lineColor,
    innerBackgroundColor,
    isShowHour,
    onReset,
    timeTextStyle,
    resetText,
    resetTextStyle,
    resetStyle,
  } = props;
  const radius = size / 2;
  const percent = countdown / totalCountDown;
  const showDot = false;
  let angle = useRef(0).current;
  let lines = useRef([]).current;
  const hours = parseInt(`${countdown / 3600}`, 10);
  const minutes = parseInt(`${countdown / 60 - hours * 60}`, 10);
  const seconds = parseInt(`${countdown - hours * 3600 - minutes * 60}`, 10);
  const formatHour = _padStart(`${hours}`, 2, '0');
  const formatMinute = _padStart(`${minutes}`, 2, '0');
  const formatSecond = _padStart(`${seconds}`, 2, '0');
  const innerRadius = radius - lineHeight - (showDot ? 5 : 3);
  const dashWidth = (innerRadius * 2 * Math.PI) / lineNum - lineWidth;
  let dashProps = {};
  if (showDot) {
    dashProps = {
      strokeDashoffset: 0,
      strokeDasharray: [lineWidth, dashWidth],
    };
  }

  angle = (Math.PI * 2) / lineNum;
  lines = new Array(lineNum).fill(1);

  const getPoint = (angle_: number, radius_: number) => {
    const x = radius_ * Math.sin(angle_);
    const y = -radius_ * Math.cos(angle_);
    return { x, y };
  };

  const getPath = (angle_: number) => {
    const p1 = getPoint(angle_, radius);
    const p2 = getPoint(angle_, radius - lineHeight);

    return `M${p1.x} ${p1.y} L${p2.x} ${p2.y}`;
  };

  return (
    <View
      style={{ width: size, height: size, flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      {/* clock */}
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ backgroundColor: 'transparent' }}
      >
        <G x={radius} y={radius}>
          {/* 时间轮盘外圈线条 */}
          {lines.map((x, i) => {
            const color = (i + 1) / lineNum <= percent ? activeColor : lineColor;
            return (
              <Path
                key={String(i)}
                d={getPath(angle * i)}
                fill="transparent"
                stroke={color}
                strokeWidth={lineWidth}
              />
            );
          })}
          {/* 时间轮盘中心区域 */}
          <Circle
            cx={0}
            cy={0}
            r={innerRadius}
            fill={innerBackgroundColor}
            stroke={showDot ? lineColor : 'transparent'}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            {...dashProps}
          />
        </G>
      </Svg>
      {/* 倒计时时间文字 */}
      <View style={[styles.textBox, { width: size, height: size }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
          {!isShowHour && formatHour !== '00' && (
            <>
              <TYText style={[styles.time, timeTextStyle]}>{formatHour}</TYText>
              <TYText style={styles.timeLabel}>{hourLabel}</TYText>
            </>
          )}
          <TYText style={[styles.time, timeTextStyle]}>{formatMinute}</TYText>
          <TYText style={styles.timeLabel}>{minuteLabel}</TYText>
          <TYText style={[styles.time, timeTextStyle]}>{formatSecond}</TYText>
          <TYText style={styles.timeLabel}>{secondLabel}</TYText>
        </View>
        {/* 重置按钮 */}
        <TouchableOpacity style={[styles.reset, resetStyle]} onPress={onReset} activeOpacity={0.7}>
          <TYText style={[styles.resetText, resetTextStyle]}>{resetText}</TYText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  reset: {
    marginTop: 4,
    width: '100%',
  },
  resetText: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
  textBox: {
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  time: {
    fontSize: cx(42),
    textAlign: 'right',
    width: cx(56),
  },
  timeLabel: {
    paddingBottom: 10,
  },
});
