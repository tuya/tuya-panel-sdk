import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Config from '../../config';

const { cx, cy } = Config;

let recordTime = 0;

interface TimerIntervalProps {
  isFullScreen: boolean;
  timerInterValStyle: {
    timerPageFull: any;
    timerPageNormal: any;
    timerContain: any;
    dotStyle: any;
    timeStyle: any;
  };
}
interface TimerIntervalState {
  number: string;
}

/*
 *录像时间状态组件
 */
class TimerInterval extends React.Component<TimerIntervalProps, TimerIntervalState> {
  constructor(props: TimerIntervalProps) {
    super(props);
    this.state = {
      number: '00:00',
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      recordTime++;
      this.setState({ number: this.getTime() });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    recordTime = 0;
  }

  getTime = () => {
    let recordNumber = '';
    const hour = Math.floor(Number(recordTime / 3600));
    const min = Math.floor(Number((recordTime % 3600) / 60));
    const sec = Math.floor(Number((recordTime % 3600) % 60));
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
  };

  timer: any;

  render() {
    const { isFullScreen, timerInterValStyle } = this.props;

    const {
      timerPageFull,
      timerPageNormal,
      timerContain,
      dotStyle,
      timeStyle,
    } = timerInterValStyle;

    const { number } = this.state;
    return (
      <View
        style={
          isFullScreen
            ? [styles.timerPageFull, timerPageFull]
            : [styles.timerPageNormal, timerPageNormal]
        }
      >
        <View style={[styles.timerContain, timerContain]}>
          <View style={[styles.dot, dotStyle]} />
          <TYText style={[styles.text, timeStyle]}>{number}</TYText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#F42E1B',
    borderRadius: Math.ceil(cx(3)),
    height: cy(6),
    marginLeft: cx(10),
    marginRight: cx(5),
    width: cx(6),
  },
  text: {
    color: 'rgb(255,255,255)',
    fontSize: Math.ceil(cx(16)),
  },
  timerContain: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: Math.ceil(cx(20)),
    flexDirection: 'row',
    height: cy(24),
    justifyContent: 'center',
    minWidth: Math.ceil(80),
    paddingRight: cx(10),
  },
  timerPageFull: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cy(40),
    justifyContent: 'center',
    left: 150,
    position: 'absolute',
    right: 150,
    top: 0,
  },
  timerPageNormal: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cy(55),
    justifyContent: 'center',
    left: 100,
    position: 'absolute',
    right: 100,
    top: 0,
  },
});

export default TimerInterval;
