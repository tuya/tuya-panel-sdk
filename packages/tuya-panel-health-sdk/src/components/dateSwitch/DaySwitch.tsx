import React, { useState } from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { Dayjs, UnitType } from 'dayjs';
import { BaseDateSwitchProps } from './interface';
import useMergeProps from '../../hooks/useMergeProps';
import { getDayjsValue, methods, getNow, getFormat } from './utils';

import Header from './Header';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps: BaseDateSwitchProps = {};

function DaySwitch(baseProps) {
  const props = useMergeProps<BaseDateSwitchProps>(baseProps, defaultProps);

  const { style } = props;

  const realFormat = getFormat(props.format, 'date');

  function getDefaultValue() {
    let value;

    if (props.value) {
      value = getDayjsValue(props.value, realFormat);
    } else {
      value = getDayjsValue(props.defaultValue, realFormat);
    }
    return value;
  }

  const [value, setValue] = useState<Dayjs>(getDefaultValue() || getNow());

  function changeDate(type: 'prev' | 'next', unit: UnitType, num = 1) {
    let newDate;
    if (type === 'prev') {
      newDate = methods.subtract(value, num, unit);
    }
    if (type === 'next') {
      newDate = methods.add(value, num, unit);
    }

    setValue(newDate);
    if (props.onChange) {
      props.onChange(newDate.format(realFormat), newDate);
    }
  }

  function onNext() {
    // Can't switch in future time yxl,
    // if (value.isAfter(getNow())) {
    //   return;
    // }
    changeDate('next', 'day');
  }
  function onPrev() {
    changeDate('prev', 'day');
  }
  return (
    <View style={style}>
      <Header onNext={onNext} onPrev={onPrev} timeText={value.format(realFormat)} />
    </View>
  );
}

export default DaySwitch;
