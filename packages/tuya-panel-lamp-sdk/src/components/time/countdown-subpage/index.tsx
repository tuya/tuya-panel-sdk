import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import TimePicker from './timePicker/index';
import Clock from './clock/index';
import { CountdownProps } from './interface';

const { convertX, width: winWidth } = Utils.RatioUtils;
const cx = (value: number) => {
  return Math.floor(convertX(value));
};
const Countdown = (props: CountdownProps) => {
  // timer: number;
  const { navigation } = props;
  const {
    params: {
      onSave,
      background,
      picker,
      clock,
      minuteLabel,
      secondLabel,
      hourLabel,
      countdown,
      confirmText,
      confirmTextStyle,
      confirmButtonStyle,
      cancelButtonStyle,
      cancelText,
      cancelTextStyle,
      onCountdownText,
      offCountdownText,
      renderHeader,
    },
  } = props.route;

  const { isShowSecond, onChange, timeTextColor, timeTextSize } = picker;
  const {
    innerBackgroundColor,
    totalCountDown,
    isShowHour,
    lineColor,
    activeColor,
    lineHeight,
    lineWidth,
    lineNum,
    resetStyle,
    resetText,
    resetTextStyle,
    onReset,
    onCancel,
    size,
  } = clock;

  const [isInCountDown, setIsInCountDown] = useState(countdown > 0);
  const [time, setTime] = useState(countdown > 0 ? countdown : 60);
  const [countdown_, setCountdown_] = useState(countdown);
  const countdownRef = useRef(countdown);

  useEffect(() => {
    if (countdownRef.current !== countdown_ && countdown_ === 0) {
      setIsInCountDown(false);
    }
    countdownRef.current = countdown_;
  }, [countdown, countdown_]);

  const timeIdRef = useRef(undefined);

  useEffect(() => {
    timeIdRef.current = setInterval(() => {
      setCountdown_((preCountdown: number) => {
        return preCountdown > 0 ? preCountdown - 1 : 0;
      });
    }, 1000);
    return () => {
      clearTimeout(timeIdRef.current);
    };
  }, []);
  useEffect(() => {
    if (!isInCountDown) {
      clearTimeout(timeIdRef.current);
    }
  }, [isInCountDown]);

  const handleReset = () => {
    !!onReset && onReset();
    setIsInCountDown(false);
  };

  const handleChange = (value: number) => {
    !!onChange && onChange(value);
    setTime(value);
  };

  const handleSave = () => {
    !!onSave && onSave(time);
    !!navigation && navigation.goBack();
  };

  const handleCancel = () => {
    !!onCancel && onCancel();
    setIsInCountDown(false);
  };

  return (
    <View style={[{ backgroundColor: background }, { flex: 1 }]}>
      {!!renderHeader && renderHeader()}
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
        <TYText style={styles.subTitle}>
          {countdown > 0 ? onCountdownText : offCountdownText}
        </TYText>
        {isInCountDown && (
          <View style={styles.container}>
            <Clock
              countdown={countdown_ > 0 ? countdown_ : 1}
              totalCountDown={totalCountDown!}
              onReset={handleReset}
              onCancel={handleCancel}
              hourLabel={hourLabel}
              minuteLabel={minuteLabel}
              secondLabel={secondLabel}
              innerBackgroundColor={innerBackgroundColor}
              isShowHour={isShowHour}
              lineColor={lineColor}
              activeColor={activeColor}
              timeTextStyle={clock.timeTextStyle}
              unitTextStyle={clock.unitTextStyle}
              lineHeight={lineHeight}
              lineWidth={lineWidth}
              lineNum={lineNum}
              resetText={resetText}
              size={size}
              resetStyle={resetStyle}
              resetTextStyle={resetTextStyle}
            />
            <TouchableOpacity style={cancelButtonStyle} onPress={handleCancel} activeOpacity={0.7}>
              <TYText style={cancelTextStyle}>{cancelText}</TYText>
            </TouchableOpacity>
          </View>
        )}
        {!isInCountDown && (
          <View style={styles.container}>
            <TimePicker
              time={countdown_ > 0 ? countdown_ : 1}
              isShowSecond={isShowSecond}
              onChange={handleChange}
              hourLabel={hourLabel}
              minuteLabel={minuteLabel}
              secondLabel={secondLabel}
              // timeTextStyle={picker.timeTextStyle}
              timeTextSize={timeTextSize}
              timeTextColor={timeTextColor}
              disabledUpdate={false}
            />
            <TouchableOpacity style={confirmButtonStyle} onPress={handleSave} activeOpacity={0.7}>
              <TYText style={confirmTextStyle}>{confirmText}</TYText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

Countdown.defaultProps = {};
export default Countdown;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  subTitle: {
    fontSize: cx(10),
    opacity: 0.5,
    textAlign: 'center',
    width: winWidth - cx(68) * 2,
  },
});
