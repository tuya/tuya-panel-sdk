import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TYListItem, Popup, GlobalToast } from 'tuya-panel-kit';
import { TimePickerRangeProps, timeItem, ruleProps } from './interface';
import TimePicker from './timePicker';
import {
  timeToApi,
  apiToTime,
  scheduleDetailItemFn,
  error,
  getTimeHour,
  getTimeMin,
  scheduleDetailItemFnWithSecond,
  timeToApiWithSecond,
  getTimeSecond,
  apiToTimeWithSecond,
} from './utils';

// 输出的日期格式可以是对象{h,m,s}
const TimePickerRange: React.FC<TimePickerRangeProps> = (props: TimePickerRangeProps) => {
  const {
    defaultBeginTime = 480,
    defaultEndTime = 1200,
    beginTime: _beginTime,
    endTime: _endTime,
    endTimeLabel,
    beginTimeLabel,
    hourLabel = '',
    minutesLabel = '',
    secondLabel = '',
    placeholder = 'select time',
    disable = false,
    toastText = 'The start time must be earlier than the end time',
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    customOnClick,
  } = props;
  const [beginTime, setBeginTime] = useState<number>(480);
  const [endTime, setEndTime] = useState<number>(1200);
  React.useEffect(() => {
    setBeginTime(_beginTime || defaultBeginTime);
    setEndTime(_endTime || defaultEndTime);
  }, [_beginTime, _endTime]);
  // 时间弹框
  const timePicker = (key: string) => {
    const currentTime = key === 'beginTime' ? beginTime : endTime;
    const hour = getTimeHour(currentTime);
    const min = getTimeMin(currentTime);
    const second = getTimeSecond(currentTime);
    let currentSelectTime: number;
    const onTimeChange = (params: timeItem) => {
      currentSelectTime = props.isShowSecond ? apiToTimeWithSecond(params) : apiToTime(params);
    };
    Popup.custom({
      content: (
        <TimePicker
          {...props}
          hour={hour}
          minutes={min}
          second={second}
          hourLabel={hourLabel}
          minutesLabel={minutesLabel}
          secondLabel={secondLabel}
          isShowSecond={props.isShowSecond}
          onTimeChange={onTimeChange}
        />
      ),
      title: key === 'beginTime' ? beginTimeLabel : endTimeLabel,
      titleTextStyle: props.titleTextStyle,
      titleWrapperStyle: props.titleWrapperStyle,
      cancelText,
      confirmText,
      onMaskPress: ({ close }) => close(),
      onCancel: () => {
        Popup.close();
      },
      onConfirm: () => {
        if (customOnClick) {
          customOnClickRule[key](currentSelectTime);
        } else {
          rule[key](currentSelectTime);
        }
        Popup.close();
      },
    });
  };
  const customOnClickRule: ruleProps = {
    beginTime: (time: number) => {
      customOnClick({ beginTime: time, endTime });
    },
    endTime: (time: number) => {
      customOnClick({ beginTime, endTime: time });
    },
  };
  const rule: ruleProps = {
    beginTime: (time: number) => {
      if (compareFun(time, endTime)) {
        showToast();
      } else {
        setBeginTime(time);
        props.onTimeChange({ beginTime: time, endTime });
      }
    },
    endTime: (time: number) => {
      if (compareFun(beginTime, time)) {
        showToast();
      } else {
        setEndTime(time);
        props.onTimeChange({ beginTime, endTime: time });
      }
    },
  };
  const showToast = () => {
    GlobalToast.show({
      d: error,
      text: toastText,
    });
  };
  const compareFun = (begin: number, end: number): boolean => begin >= end;
  const time = [
    {
      key: 'beginTime',
      title: beginTimeLabel,
      value: beginTime,
      placeholder,
      arrow: true,
      onPress: () => {
        timePicker('beginTime');
      },
    },
    {
      key: 'endTime',
      title: endTimeLabel,
      value: endTime,
      placeholder,
      arrow: true,
      onPress: () => {
        timePicker('endTime');
      },
    },
  ];

  return (
    <View>
      {time.map(item => {
        const value = !props.isShowSecond
          ? // eslint-disable-next-line no-bitwise
            scheduleDetailItemFn(timeToApi(~~+item.value))
          : scheduleDetailItemFnWithSecond(timeToApiWithSecond(item.value));
        return (
          <TYListItem
            title={item.title}
            Action={value}
            key={item.key}
            arrow={item.arrow}
            onPress={item.onPress}
            style={styles.list}
            disabled={disable}
            actionDisabled={disable}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
});
TimePickerRange.defaultProps = {
  beginTimeLabel: 'Begin time',
  endTimeLabel: 'End time',
  isShowSecond: true,
  hourLabel: '',
  minutesLabel: '',
  secondLabel: '',
  timePickerStyle: null,
  disable: false,
};
export default TimePickerRange;
