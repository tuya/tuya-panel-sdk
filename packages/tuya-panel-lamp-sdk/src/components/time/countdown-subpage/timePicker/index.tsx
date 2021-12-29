import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Picker, TYText, Utils } from 'tuya-panel-kit';
import { PickerProps } from '../interface';

const { RatioUtils } = Utils;
const { convertX } = RatioUtils;
const cx = (value: number) => {
  return Math.floor(convertX(value));
};
const formatValue = (value: number) => _.padStart(value.toString(), 2, '0');
const minutes = new Array(60).fill(1).map((v: number, index: number) => formatValue(index));

const TimePicker = (props: PickerProps) => {
  const { time, isShowSecond, onChange } = props;
  const { hourLabel, minuteLabel, secondLabel, timeTextColor, timeTextSize } = props;
  const minuteData = minutes;
  const currentTime = time; // 单位： 秒
  const _hour = formatValue(Math.floor(currentTime / 3600));
  const _minute = formatValue(
    Math.floor((currentTime - (parseInt(_hour, 10) > 0 ? parseInt(_hour, 10) * 3600 : 0)) / 60)
  );
  const _second = formatValue(Math.floor(currentTime % 60));
  const [hour, setHour] = useState(_hour);
  const [minute, setMinute] = useState(_minute);
  const [second, setSecond] = useState(_second);
  const [maxHour] = useState(24);
  const [minHour] = useState(0);
  const [maxMinute] = useState(0);
  const [minMinute] = useState(0);
  const [hours] = useState(
    new Array(maxHour + 1).fill(1).map((v: number, index: number) => formatValue(index))
  );

  const timeRef = useRef(time);
  useEffect(() => {
    if (timeRef.current !== time) {
      const hour_ = formatValue(Math.floor(time / 3600));
      const minute_ = formatValue(Math.floor(time / 60 - Number(hour) * 60));
      const second_ = formatValue(Math.floor(time % 60));
      setHour(hour_);
      setMinute(minute_);
      setSecond(second_);
    }
  }, [time]);

  const handleChange = () => {
    onChange(Number(hour) * 3600 + Number(minute) * 60 + Number(second));
  };

  const handleHour = (value: number) => {
    if (Number(value) === maxHour) {
      if (Number(minute) > maxMinute) {
        setMinute(formatValue(maxMinute));
      }
    } else if (Number(value) === minHour) {
      if (Number(minute) < minMinute) {
        setMinute(formatValue(minMinute));
      }
    }
    setHour(formatValue(value));
  };

  useEffect(() => {
    handleChange();
  }, [hour, minute, second]);

  const handleMinute = (value: number) => {
    setMinute(formatValue(value));
  };
  const handleSecond = (value: number) => {
    setSecond(formatValue(value));
  };
  return (
    <View
      style={styles.pickerContainer}
      // 防止安卓下手势与父节点冲突
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
    >
      <Picker
        style={[styles.picker, styles.pickerMiddle]}
        itemStyle={[styles.pickerItem]}
        selectedValue={hour}
        itemTextColor={timeTextColor}
        visibleItemCount={5}
        onValueChange={handleHour}
        selectedItemTextColor={timeTextColor}
        theme={{ fontSize: timeTextSize }}
      >
        {hours.map(value => (
          <Picker.Item key={value} value={value} label={value} />
        ))}
      </Picker>
      <TYText style={{ marginLeft: cx(-15), marginTop: cx(15) }}>{hourLabel}</TYText>
      {!isShowSecond && <View style={{ width: cx(50) }} />}
      <Picker
        style={[styles.picker, styles.pickerRight]}
        itemStyle={[styles.pickerItem]}
        itemTextColor={timeTextColor}
        selectedItemTextColor={timeTextColor}
        selectedValue={minute}
        visibleItemCount={5}
        onValueChange={handleMinute}
        theme={{ fontSize: timeTextSize }}
      >
        {minuteData.map(value => (
          <Picker.Item key={value} value={value} label={value} />
        ))}
      </Picker>
      <TYText style={{ marginLeft: cx(-15), marginTop: cx(15) }}>{minuteLabel}</TYText>

      {isShowSecond && (
        <Picker
          style={[styles.picker, styles.pickerRight]}
          itemStyle={[styles.pickerItem]}
          itemTextColor={timeTextColor}
          selectedItemTextColor={timeTextColor}
          selectedValue={second}
          visibleItemCount={5}
          onValueChange={handleSecond}
          theme={{ fontSize: timeTextSize }}
        >
          {minuteData.map(value => (
            <Picker.Item key={value} value={value} label={value} />
          ))}
        </Picker>
      )}
      {isShowSecond && (
        <TYText style={{ marginLeft: cx(-15), marginTop: cx(15) }}>{secondLabel}</TYText>
      )}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'transparent',
    height: 324,
  },
  pickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  pickerItem: { height: 324 },
  pickerMiddle: {
    width: 80,
  },
  pickerRight: {
    width: 80,
  },
});
