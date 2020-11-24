import React, { PureComponent } from 'react';
import { TYSdk } from '@tuya-rn/tuya-native-components';

interface IProps {}
interface IState {
  fullMapErrTimes: number;
}

const maxTimes = 3;
export default class tipBus extends PureComponent<IProps, IState> {
  state = {
    fullMapErrTimes: 0, // 累计地图错误次数
  };

  constructor(props) {
    super(props);
    this.createListener();
  }
  createListener = () => {
    TYSdk.event.on('MapServiceChannelUtils_OSSFullMapFileErr', this.checkFullMapErr);
    TYSdk.event.on('MapServiceChannelUtils_OSSFullMapFileSuccess', () => this.checkFullMapErr(false));
  };

  checkFullMapErr = (isErr = true) => {
    this.setState(({ fullMapErrTimes }) => {
      if (isErr) {
        if (fullMapErrTimes > maxTimes) return { fullMapErrTimes: 0 };
        return { fullMapErrTimes: fullMapErrTimes + 1 };
      }
      return { fullMapErrTimes: 0 };
    });
  };
  renderTips = () => {
    const { fullMapErrTimes } = this.state;
    if (fullMapErrTimes === maxTimes) {
      // Toast.debounceInfo('networkTimeout');
    }
  };
  render() {
    this.renderTips();
    return null;
  }
}
