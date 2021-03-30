/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import _ from 'lodash';
import { TYFlatList, TYSdk, Strings } from 'tuya-panel-kit';
import { commonApi } from '@tuya/tuya-panel-api';

const { getDpsInfos, getGroupDpsInfos } = commonApi.deviceApi;

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;
const TYNative = TYSdk.native;

interface IProps {
  dpCodes: string[];
}

interface IState {
  names: {
    [dpCode: string]: string;
  };
}

export default class ScheduleList extends PureComponent<IProps, IState> {
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

  componentWillReceiveProps(nextProps: { dpCodes: string[] }) {
    if (this.props.dpCodes !== nextProps.dpCodes) {
      this.formatNames(nextProps);
    }
  }

  get data() {
    const { names } = this.state;
    return _.map(this.props.dpCodes, (dp, key) => {
      const title = names[dp] || Strings.getDpLang(dp);
      return {
        key: `${key}`,
        title,
        arrow: true,
        arrowUseIcon: true,
        onPress: () => {
          TYNative.gotoDpAlarm({
            category: `category_${dp}`,
            repeat: 0,
            data: [
              {
                dpId: TYDevice.getDpIdByCode(dp),
                dpName: title,
                selected: 0,
                rangeKeys: [true, false],
                rangeValues: [true, false].map(v => Strings.getDpLang(dp, v)),
              },
            ],
          });
        },
      };
    });
  }

  formatNames = async (props?: Readonly<IProps> & Readonly<{ children?: React.ReactNode }>) => {
    const { dpCodes } = props || this.props;
    if (Array.isArray(dpCodes)) {
      const { devId } = TYSdk.devInfo;
      // @ts-ignore
      const isGroup = !!TYSdk.devInfo.groupId;
      // @ts-ignore
      const postData = isGroup ? TYSdk.devInfo.groupId : { gwId: devId, devId };
      const func = isGroup ? getGroupDpsInfos : getDpsInfos;
      const dps: any = Platform.OS === 'web' ? [] : await func(postData);
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
