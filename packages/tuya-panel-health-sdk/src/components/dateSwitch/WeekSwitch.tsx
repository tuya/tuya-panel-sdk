import React, { useState } from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { Dayjs, OpUnitType } from 'dayjs';
import { WeekSwitchProps } from './interface';
import useMergeProps from '../../hooks/useMergeProps';
import { getDayjsValue, methods, getNowWeeks, getNow, getFormat } from './utils';

import Header from './Header';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps: WeekSwitchProps = {};

function WeekSwitch(baseProps) {
  const props = useMergeProps<WeekSwitchProps>(baseProps, defaultProps);

  const { style } = props;

  const realFormat = getFormat(props.format, 'week');

  function getDefaultValue() {
    let value;

    if (props.value) {
      value = getDayjsValue(props.value, realFormat);
    } else {
      value = getDayjsValue(props.defaultValue, realFormat);
    }
    return value;
  }

  const [value, setValue] = useState<Dayjs[]>(getDefaultValue() || getNowWeeks());

  function getRangeValue(v = getNow(), type: 'prev' | 'next') {
    const newValue =
      type === 'prev' ? [v, methods.add(v, 1, 'week')] : [methods.subtract(v, 1, 'week'), v];

    return newValue;
  }

  function changeDate(type: 'prev' | 'next', unit: OpUnitType, num = 1) {
    const index = type === 'prev' ? 0 : 1;
    const newDate = [...value];
    if (type === 'prev') {
      newDate[index] = methods.subtract(value[index], num, unit);
    }
    if (type === 'next') {
      newDate[index] = methods.add(value[index], num, unit);
    }

    // 处理list
    const rangeValue = getRangeValue(newDate[index], type);
    setValue(rangeValue);
    if (props.onChange) {
      props.onChange(
        rangeValue.map((v: Dayjs) => v.format(realFormat)),
        rangeValue
      );
    }
  }

  function onNext() {
    changeDate('next', 'week');
  }
  function onPrev() {
    changeDate('prev', 'week');
  }
  const formatValue = `${value[0].format(realFormat)}-${value[1].format(realFormat)}`;
  return (
    <View style={style}>
      <Header onNext={onNext} onPrev={onPrev} timeText={formatValue} />
    </View>
  );
}

export default WeekSwitch;
