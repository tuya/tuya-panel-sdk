import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { laserDataApi } from '@tuya-smart/tuya-panel-robot-sdk';

export default class LaserDataApi extends PureComponent {
  componentDidMount() {
    laserDataApi.getLaserMapHistoryList().then(result => {
      console.log(result);
    });
    laserDataApi.getLaserMultiFloorMapList().then(result => {
      console.log(result);
    });
  }

  render() {
    return <View><Text>输出效果请参考开发者文档</Text></View>;
  }
}
