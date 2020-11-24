import { ViewStyle, StyleProp } from 'react-native';
import styled from 'styled-components/native';
import _times from 'lodash/times';
import * as React from 'react';
import { Utils, Picker } from '@tuya-rn/tuya-native-components';
import { timer } from '../theme';

const { toFixed } = Utils.CoreUtils;
const { convertX: cx } = Utils.RatioUtils;

const StyledContainer = styled.View`
  height: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${cx(24)}px;
  padding-right: ${cx(24)}px;
  background-color: ${timer.cellBg};
`;

const StyledContent = styled.View`
  flex: 1;
  flex-direction: row;
`;

interface IPickerValue {
  value: number | string;
  label: string;
}

interface ITimerPickerProps {
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  hour: number;
  minute: number;
  is12Hours?: boolean;
  loop?: boolean;
  isPickerAlignCenter?: boolean;
  pickerFontColor?: string;
  onTimerChange: (value: number) => void;
}

interface ITimerPickerState {
  prefix: 'AM' | 'PM';
  hour: number;
  minute: number;
}

export default class TimerPicker extends React.Component<ITimerPickerProps, ITimerPickerState> {
  static defaultProps = {
    style: {},
    hour: 0,
    minute: 0,
    is12Hours: true,
    loop: false,
    pickerFontColor: '#333',
  };

  hours: IPickerValue[];

  minutes: IPickerValue[] = _times(60, n => ({
    value: n,
    label: toFixed(n, 2),
  }));

  prefixs = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }];

  constructor(props: ITimerPickerProps) {
    super(props);
    const { is12Hours } = props;
    this.hours = is12Hours
      ? _times(12, n => ({
          value: n,
          label: toFixed(n === 0 ? 12 : n, 2),
        }))
      : _times(24, n => ({
          value: n,
          label: toFixed(n, 2),
        }));
    const hour = +props.hour;
    this.state = {
      prefix: hour >= 12 ? 'PM' : 'AM',
      hour: is12Hours && hour >= 12 ? hour - 12 : hour,
      minute: +props.minute,
    };
  }

  _handlePrefixChange = (prefix: 'AM' | 'PM') => {
    const { is12Hours } = this.props;
    this.setState({ prefix });
    const h = is12Hours && prefix === 'PM' ? this.state.hour + 12 : this.state.hour;
    this.props.onTimerChange(h * 60 + this.state.minute);
  };

  _handleHourChange = (hour: string) => {
    const { is12Hours } = this.props;
    this.setState({ hour: parseInt(hour) });
    const h = is12Hours && this.state.prefix === 'PM' ? parseInt(hour) + 12 : parseInt(hour);
    this.props.onTimerChange(h * 60 + this.state.minute);
  };

  _handleMinuteChange = (minute: string) => {
    const { is12Hours } = this.props;
    this.setState({ minute: parseInt(minute) });
    const h = is12Hours && this.state.prefix === 'PM' ? this.state.hour + 12 : this.state.hour;
    this.props.onTimerChange(h * 60 + parseInt(minute));
  };

  renderPickView({
    style,
    values,
    value,
    onValueChange,
    loop,
    accessibilityLabel,
  }: {
    style?: StyleProp<ViewStyle>;
    values: IPickerValue[];
    value: number | 'AM' | 'PM' | '';
    onValueChange?: (value: string | 'AM' | 'PM') => void;
    loop?: boolean;
    accessibilityLabel?: string;
  }) {
    const { isPickerAlignCenter = true } = this.props;
    if (values.length === 0 && !isPickerAlignCenter) {
      return null;
    }
    const { pickerFontColor } = this.props;
    return (
      <Picker
        accessibilityLabel={accessibilityLabel}
        selectedValue={value}
        onValueChange={onValueChange}
        contentContainerStyle={{ flex: 1 }}
        selectedItemTextColor={pickerFontColor}
        itemTextColor={pickerFontColor}
        itemStyle={[{ color: pickerFontColor, backgroundColor: 'transparent' }]}
        style={[
          {
            flex: 1,
            height: 200,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          },
          style,
        ]}
        loop={loop}
      >
        {values.map((d, k) => (
          <Picker.Item key={k} value={d.value} label={d.label} />
        ))}
      </Picker>
    );
  }

  render() {
    const { accessibilityLabel = 'Timer_TimerPicker', is12Hours, loop } = this.props;
    return (
      <StyledContainer>
        <StyledContent>
          {/* 渲染空Picker占位... */}
          {this.renderPickView({
            values: [],
            value: '',
          })}
          {this.renderPickView({
            values: is12Hours ? this.prefixs : [],
            value: is12Hours ? this.state.prefix : '',
            onValueChange: this._handlePrefixChange,
            accessibilityLabel: `${accessibilityLabel}_Ampm`,
            loop: false,
          })}
          {this.renderPickView({
            values: this.hours,
            value: this.state.hour,
            onValueChange: this._handleHourChange,
            accessibilityLabel: `${accessibilityLabel}_Hour`,
            loop,
          })}
          {this.renderPickView({
            values: this.minutes,
            value: this.state.minute,
            onValueChange: this._handleMinuteChange,
            accessibilityLabel: `${accessibilityLabel}_Minute`,
            loop,
          })}
          {/* 渲染空Picker占位... */}
          {this.renderPickView({
            values: [],
            value: '',
          })}
          {/* 渲染空Picker占位... */}
          {this.renderPickView({
            values: [],
            value: '',
          })}
        </StyledContent>
      </StyledContainer>
    );
  }
}
