import React, { useMemo, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { useControllableValue } from 'ahooks';
import moment from 'moment';
import _ from 'lodash';
import Strings from './i18n';
import { formatTime } from '../../../utils';
import LabelPicker from './LabelPicker';
import { CountdownPickerProps } from './interface';

const Hours = _.times(24 + 1, (v: number) => formatTime(v));
const Minutes = _.times(60, (v: number) => formatTime(v));
const Seconds = _.times(60, (v: number) => formatTime(v));

const CountdownPicker: React.FC<CountdownPickerProps> = props => {
  const {
    style,
    innerRef,
    hourLabel = Strings.getLang('CountdownPicker_hour'),
    minuteLabel = Strings.getLang('CountdownPicker_minute'),
    secondLabel = Strings.getLang('CountdownPicker_second'),
    defaultValue,
  } = props;

  const [value, setValue] = useControllableValue(props, { defaultValue });

  const [hour, minute, second] = useMemo(() => {
    const time = moment.duration(value, 'seconds');
    return [
      formatTime(Math.floor(time.asHours())),
      formatTime(time.minutes()),
      formatTime(time.seconds()),
    ];
  }, [value]);

  const hoursList = Hours;
  const minutesList = useMemo(() => (hour === '24' ? Minutes.slice(0, 1) : Minutes), [hour]);
  const secondsList = useMemo(() => (hour === '24' ? Seconds.slice(0, 1) : Seconds), [hour]);

  const handleHourChange = (v: string) => {
    setValue(
      moment.duration(`${v}:${v === '24' ? 0 : minute}:${v === '24' ? 0 : second}`).as('seconds')
    );
  };

  const handleMinuteChange = (v: string) => {
    setValue(moment.duration(`${hour}:${v}:${second}`).as('seconds'));
  };

  const handleSecondChange = (v: string) => {
    setValue(moment.duration(`${hour}:${minute}:${v}`).as('seconds'));
  };

  useImperativeHandle(innerRef, () => ({ value }));

  return (
    <View
      style={[styles.container, style]}
      // Prevents gestures in android from colliding with the parent node
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
    >
      <LabelPicker label={hourLabel} list={hoursList} value={hour} onChange={handleHourChange} />
      <LabelPicker
        label={minuteLabel}
        list={minutesList}
        value={minute}
        onChange={handleMinuteChange}
      />
      <LabelPicker
        label={secondLabel}
        list={secondsList}
        value={second}
        onChange={handleSecondChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CountdownPicker;
