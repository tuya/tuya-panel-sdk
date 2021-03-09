import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Utils, TYText, Strings } from 'tuya-panel-kit';
import { formatTimeValue } from './utils';

const { convertX: cx } = Utils.RatioUtils;
const { parseSecond } = Utils.TimeUtils;

class CountdownProps {
  value: number;
  counting: boolean;
  timeUnit = 's';
  formatString = `{0}:{1}:{2}`;
  countdownTextStyle: any;
}

type IState = Readonly<{
  countdownValue: number;
}>;

export default class CountdownView extends PureComponent<CountdownProps, IState> {
  static defaultProps = new CountdownProps();

  constructor(props: CountdownProps) {
    super(props);
    this.state = {
      countdownValue: formatTimeValue(props.timeUnit, props.value),
    };
    this._timer = null;
  }

  componentDidMount() {
    const { counting } = this.props;
    counting && this.startCounting();
  }

  componentWillReceiveProps(nextProps) {
    const currentValue = formatTimeValue(nextProps.timeUnit, this.props.value);
    const nextValue = formatTimeValue(nextProps.timeUnit, nextProps.value);
    if (currentValue !== nextValue) {
      this.setState({ countdownValue: nextValue }, () => {
        nextValue === 0 && this.stopCounting();
        nextValue > 0 && !this._timer && nextProps.counting && this.startCounting();
      });
    }

    if (this.props.counting !== nextProps.counting) {
      nextProps.counting && !this._timer && this.startCounting();
      !nextProps.counting && this.clearCountdownInterval();
    }
  }

  componentWillUnmount() {
    this.clearCountdownInterval();
  }

  _timer;

  clearCountdownInterval = () => {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  };

  startCounting = () => {
    this.clearCountdownInterval();
    this._timer = setInterval(() => {
      this.setState(
        ({ countdownValue }) => ({
          countdownValue: countdownValue > 0 ? countdownValue - 1 : countdownValue,
        }),
        () => {
          this.state.countdownValue === 0 && this.clearCountdownInterval();
        }
      );
    }, 1000);
  };

  stopCounting = () => {
    const { counting } = this.props;
    counting && this.clearCountdownInterval();
  };

  renderCountdownView = () => {
    const { formatString, countdownTextStyle } = this.props;
    const { countdownValue } = this.state;
    const timeFormat = parseSecond(countdownValue, 2);
    return (
      <TYText
        type="paragraph"
        numberOfLines={1}
        size="large"
        ellipsizeMode="tail"
        style={[styles.text, countdownTextStyle]}
      >
        {Strings.formatString(formatString, ...timeFormat)}
      </TYText>
    );
  };

  render() {
    const { countdownValue } = this.state;
    return countdownValue > 0 ? this.renderCountdownView() : null;
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'stretch',
    color: '#333',
    fontSize: cx(12),
  },
});
