import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import _ from 'lodash';
import { commonApi } from '@tuya/tuya-panel-api';
import { TYFlatList, TYSdk, Popup } from 'tuya-panel-kit';
import Strings from './i18n';
import { formatTimeValue } from '../countdown-view/utils';

const { getDpsInfos } = commonApi.deviceApi;
const TYDevice = TYSdk.device;
const TYEvent = TYSdk.event;
type TimeUnitType = 's' | 'min' | 'hour';
type CountdownType = 'm' | 'hm';
type IProps = {
  dpCodes: string[];
  timeUnit: Omit<TimeUnitType, 'hour'>;
  countdownType: CountdownType;
};

interface IState {
  names: {
    [dpCode: string]: string;
  };
}

export default class CountdownList extends PureComponent<IProps, IState> {
  static defaultProps = {
    dpCodes: [],
    timeUnit: 's',
    countdownType: 'hm',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      names: {},
    };
  }

  componentDidMount() {
    this.formatNames();
    TYEvent.on('dpNameChanged', this.formatNames);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dpCodes !== nextProps.dpCodes) {
      this.formatNames(nextProps);
    }
  }

  get data() {
    const { countdownType, timeUnit } = this.props;
    const { names } = this.state;
    return _.map(this.props.dpCodes, (dp, key) => {
      const title = names[dp] || Strings.getDpLang(dp);
      const { min, max, step } = TYDevice.getDpSchema(dp) || { min: 0, max: 86400, step: 1 };
      const onlyone = formatTimeValue(timeUnit, max) >= 3600 || countdownType === 'm';
      return {
        key: `${key}`,
        title,
        arrow: true,
        onlyone,
        onPress: () => {
          const value = TYDevice.getState(dp);
          const valueToSecond = formatTimeValue(timeUnit, value);
          Popup.countdown({
            title,
            cancelText: Strings.getLang('cancel'),
            confirmText: Strings.getLang('confirm'),
            min,
            max,
            step,
            value: valueToSecond / 60,
            onConfirm: data => {
              this.handlePress(data, dp);
            },
            onCancel: Popup.close,
          });
        },
      };
    });
  }

  handlePress = ({ value, hour }, dpCode) => {
    let countdown = 0;
    const { timeUnit } = this.props;
    switch (timeUnit) {
      case 's':
        countdown = value * 60;
        break;
      case 'min':
        countdown = value;
        break;
      default:
        countdown = hour;
        break;
    }
    TYDevice.putDeviceData({ [dpCode]: countdown });
    Popup.close();
  };

  formatNames = async (props?: Readonly<IProps> & Readonly<{ children?: React.ReactNode }>) => {
    const { dpCodes } = props || this.props;
    if (Array.isArray(dpCodes)) {
      const { devId } = TYSdk.devInfo;
      const dps: any = Platform.OS === 'web' ? [] : await getDpsInfos({ gwId: devId, devId });
      const names = dps.reduce(
        (prv: any, acc: { code: any; name: any }) => ({
          ...prv,
          ...(dpCodes.includes(acc.code) ? { [acc.code]: acc.name } : {}),
        }),
        {}
      );
      Object.keys(names).length > 0 && this.setState({ names });
    }
  };

  render() {
    return (
      <View style={{ alignSelf: 'stretch' }}>
        <TYFlatList data={this.data} />
      </View>
    );
  }
}
