import React, { useMemo, useCallback } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Picker, Utils } from 'tuya-panel-kit';
// eslint-disable-next-line import/named
import { SingleTimePickerProps } from './interface';

const {
  RatioUtils: { convertX: cx },
} = Utils;

const updateData = (hour: number, is24Hour: boolean, AM: string, PM: string) => {
  let hourStr = '00';
  if (is24Hour) {
    hourStr = _.padStart(`${hour}`, 2, '0');
  } else if (hour > 12) {
    hourStr = _.padStart(`${hour - 12}`, 2, '0');
  } else if (hour === 0) {
    hourStr = '12';
  } else {
    hourStr = _.padStart(`${hour}`, 2, '0');
  }
  return {
    amPmStr: !is24Hour && hour >= 12 ? PM : AM,
    hour: hourStr,
  };
};

const minutesList = _.times(60, n => _.padStart(`${n}`, 2, '0'));

const SingleTimePicker: React.FC<SingleTimePickerProps> = props => {
  const { hour, minute, amText, pmText, is24Hour } = props;
  const hourList = useMemo(() => {
    return is24Hour
      ? _.times(24, (n: number) => _.padStart(`${n}`, 2, '0'))
      : _.times(12, n => _.padStart(`${n === 0 ? 12 : n}`, 2, '0'));
  }, [is24Hour]);

  const pickerKey = useMemo(() => {
    return [
      {
        value: 'AM',
        label: amText,
      },
      {
        value: 'PM',
        label: pmText,
      },
    ];
  }, []);

  const handleChangeTime = useCallback(
    (h: number, m: number, amPm: string) => {
      let newHour = h;
      if (!is24Hour) {
        if (amPm === 'PM') {
          newHour = h < 12 ? h + 12 : h;
        } else {
          newHour = h >= 12 ? h - 12 : h;
        }
      }
      props.onChange(newHour, m);
    },
    [props.onChange]
  );

  const handleAmPm = (value: string) => {
    handleChangeTime(hour, minute, value);
  };

  const handleHour = (value: string) => {
    handleChangeTime(+value, minute, updateData(hour, is24Hour, 'AM', 'PM').amPmStr);
  };

  const handleMinute = (value: string) => {
    handleChangeTime(
      hour,
      +_.padStart(value, 2, '0'),
      updateData(hour, is24Hour, 'AM', 'PM').amPmStr
    );
  };

  const renderAmPmPosition = () => {
    return (
      <Picker
        style={[styles.picker, styles.pickerLeft, pickerStyle, amPmPickerStyle]}
        itemStyle={[styles.pickerItem, itemStyle]}
        selectedValue={updateData(hour, is24Hour, 'AM', 'PM').amPmStr}
        itemTextColor={itemTextColor}
        visibleItemCount={visibleItemCount}
        selectedItemTextColor={selectedItemTextColor}
        onValueChange={handleAmPm}
        itemAlign={itemAlign}
        dividerColor={dividerColor}
        textSize={textSize}
      >
        {pickerKey.map(item => (
          <Picker.Item key={item.value} value={item.value} label={item.label} />
        ))}
      </Picker>
    );
  };

  const {
    prefixPosition,
    itemTextColor,
    selectedItemTextColor,
    visibleItemCount,
    loop,
    containerStyle,
    itemStyle,
    pickerStyle,
    amPmPickerStyle,
    hourPickerStyle,
    minutePickerStyle,
    dividerColor,
    itemAlign,
    textSize,
  } = props;
  return (
    <View style={[styles.pickerContainer, containerStyle]}>
      {!is24Hour && prefixPosition === 'left' && renderAmPmPosition()}
      <Picker
        style={[styles.picker, styles.pickerMiddle, pickerStyle, hourPickerStyle]}
        itemStyle={[styles.pickerItem, itemStyle]}
        selectedValue={updateData(hour, is24Hour, 'AM', 'PM').hour}
        itemTextColor={itemTextColor}
        visibleItemCount={visibleItemCount}
        onValueChange={handleHour}
        selectedItemTextColor={selectedItemTextColor}
        loop={loop}
        dividerColor={dividerColor}
        itemAlign={itemAlign}
        textSize={textSize}
      >
        {hourList.map(value => (
          <Picker.Item key={value} value={value} label={value} />
        ))}
      </Picker>
      <Picker
        style={[styles.picker, styles.pickerRight, pickerStyle, minutePickerStyle]}
        itemStyle={[styles.pickerItem, itemStyle]}
        itemTextColor={itemTextColor}
        selectedItemTextColor={selectedItemTextColor}
        selectedValue={_.padStart(`${minute}`, 2, '0')}
        visibleItemCount={7}
        onValueChange={handleMinute}
        loop={loop}
        dividerColor={dividerColor}
        itemAlign={itemAlign}
        textSize={textSize}
      >
        {minutesList.map(value => (
          <Picker.Item key={value} value={value} label={value} />
        ))}
      </Picker>
      {!is24Hour && prefixPosition === 'right' && renderAmPmPosition()}
    </View>
  );
};

SingleTimePicker.defaultProps = {
  is24Hour: false,
  hour: 0,
  minute: 0,
  onChange() {},
  dividerColor: '#ccc', // 只对安卓生效
  itemTextColor: '#ccc', // 只对安卓生效,当前的value
  selectedItemTextColor: '#000', // 只对安卓生效
  textSize: 20, // 只对安卓生效
  itemStyle: {}, // 只对ios生效，这里写字体大小跟颜色
  visibleItemCount: 7,
  itemAlign: 'center',
  loop: false,
  containerStyle: {},
  pickerStyle: {},
  hourPickerStyle: {},
  minutePickerStyle: {},
  amPmPickerStyle: {},
  amText: 'AM',
  pmText: 'PM',
  prefixPosition: 'left',
};
export default SingleTimePicker;

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'transparent',
    height: cx(200),
  },
  pickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  pickerItem: {
    // height: cx(80),
  },
  pickerLeft: {
    width: cx(80),
  },
  pickerMiddle: {
    width: cx(80),
  },
  pickerRight: {
    width: cx(80),
  },
});
