import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker, TYText, Utils } from 'tuya-panel-kit';
import { TimePickerProp } from './interface';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const TimePicker: React.FC<TimePickerProp> = (props: TimePickerProp) => {
  const { hour: customeHour, minutes: customeMinutes, second: customeSecond = 0 } = props;
  const [hour, setHour] = useState(customeHour);
  const [min, setMin] = useState(customeMinutes);
  const [second, setSecond] = useState(customeSecond);
  const toFixed = (str: number, count: number) => {
    return `${'0'.repeat(count)}${str}`.slice(-1 * count);
  };
  const getHourSelections = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      let label = '';
      label = toFixed(i, 2);
      hours.push({
        value: i,
        label: label.toString(),
      });
    }
    return hours;
  };
  const getMinsSelections = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push({
        value: i,
        label: toFixed(i, 2),
      });
    }
    return minutes;
  };

  const renderPickView = (values, value, onValueChange, key) => {
    return (
      <View style={styles.pickerView}>
        <Picker
          textSize={props.textSize}
          dividerColor={props.dividerColor}
          visibleItemCount={props.visibleItemCount}
          itemTextColor={props.itemTextColor}
          itemAlign={props.itemAlign}
          selectedItemTextColor={props.selectedItemTextColor}
          selectedValue={value}
          onValueChange={onValueChange}
          style={{
            alignSelf: 'center',
            flex: 1,
          }}
          loop
        >
          {values.map(d => (
            <Picker.Item key={d.value} value={d.value} label={`${d.label}`} />
          ))}
        </Picker>
        {key ? (
          <View style={[styles.pickerLabel, { right: props.isShowSecond ? cx(10) : cx(40) }]}>
            <TYText style={{ lineHeight: cy(200) }} text={key} />
          </View>
        ) : null}
      </View>
    );
  };
  const onEndHourChange = (val: number) => {
    setHour(val);
    props.onTimeChange({ hour: val, min, second });
  };
  const onEndMinChange = (val: number) => {
    setMin(val);
    props.onTimeChange({ hour, min: val, second });
  };
  const onEndSecondChange = (val: number) => {
    setSecond(val);
    props.onTimeChange({ hour, min, second: val });
  };
  return (
    <View style={[styles.container, props.timePickerStyle]}>
      <View style={styles.pickerRow}>
        {renderPickView(getHourSelections(), props.hour, onEndHourChange, props.hourLabel)}
        {renderPickView(getMinsSelections(), props.minutes, onEndMinChange, props.minutesLabel)}
        {props.isShowSecond &&
          renderPickView(getMinsSelections(), props.second, onEndSecondChange, props.secondLabel)}
      </View>
    </View>
  );
};
TimePicker.defaultProps = {
  disabled: false,
  prefixPositionEnd: 'left',
  isShowSecond: false,
  second: 0,
  itemTextColor: undefined,
  selectedItemTextColor: undefined,
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cy(300),
    justifyContent: 'center',
    paddingHorizontal: cx(24),
  },
  pickerLabel: {
    height: cy(200),
    marginBottom: 'auto',
    marginTop: 'auto',
    position: 'absolute',
  },
  pickerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  pickerView: {
    flex: 1,
    flexDirection: 'row',
    height: cy(200),
    position: 'relative',
  },
});
export default TimePicker;
