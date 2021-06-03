import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcTimeIntervalProps } from './interface';
import Styles from './style';

const TYIpcTimeInterval: React.FC<TYIpcTimeIntervalProps> & {
  defaultProps: Partial<TYIpcTimeIntervalProps>;
} = props => {
  const { startValue } = props;
  let recordTime:number = startValue;
  let timer = null;

  const getTime = (time: number) => {
    let recordNumber = '';
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor((time % 3600) % 60);
    if (hour === 0) {
      recordNumber = '';
    } else if (hour < 10) {
      recordNumber = '0';
      recordNumber += `${hour}:`;
    } else {
      recordNumber += `${hour}:`;
    }
    if (min < 10) {
      recordNumber += '0';
    }
    recordNumber += `${min}:`;
    if (sec < 10) {
      recordNumber += '0';
    }
    recordNumber += sec;
    return recordNumber;
  }

  const [number, setNumber] = useState(getTime(startValue));

  useEffect(() => {
   timer = setInterval(() => {
     recordTime++;
     setNumber(getTime(recordTime))
   }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  const { containerStyle, timerContainStyle, dotStyle, textStyle } = props;

  return (
    <View style={[Styles.timerIntervalPage, containerStyle]}>
      <View style={[Styles.timerContain, timerContainStyle]}>
        <View style={[Styles.dot, dotStyle]} />
        <TYText style={[Styles.text, textStyle]}>{number}</TYText>
      </View>
    </View>
  );
}

TYIpcTimeInterval.defaultProps = {
  startValue: 0,
  containerStyle: {},
  timerContainStyle: {},
  dotStyle: {},
  textStyle: {},
};

export default TYIpcTimeInterval;