/* eslint-disable import/extensions */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { EleSetting } from '@tuya/tuya-panel-electrician-sdk';
// import { subRouters } from '../../../config/routers';
// import { produceRouterDatas } from '../../../utils';

export default class Setting extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
        <EleSetting.Setting
          settingDps={[
            {
              code: 'mode',
              dptype: 'obj',
              id: '102',
              mode: 'rw',
              name: '灯光模式',
              range: ['colour', 'white', 'gradient'],
              type: 'enum',
            },
            {
              code: 'switch_1',
              dptype: 'obj',
              id: '101',
              mode: 'rw',
              name: '开关',
              type: 'bool',
            },
          ]}
          showSwitchLog={false}
          isStatusMultichannel={false}
          themeColor="#338CE5"
        />
      </View>
    );
  }
}
