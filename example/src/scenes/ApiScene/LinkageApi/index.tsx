import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { commonApi } from '@tuya/tuya-panel-api';

const { linkageApi } = commonApi;
const DEVID = 'vdevo161527932465103';
const RULEID = 'y2zAjojrpeZx9Dtu';
const BIZDOMIAN = 'wirelessSwitchBindScene';

export default class LaserDataApi extends PureComponent {
  componentDidMount() {
    Promise.all([
      linkageApi.getLinkageDeviceList({ gid: 11740421, sourceType: 'wirelessSwitch' }),
      linkageApi.getSceneList({ devId: DEVID }),
      linkageApi.getBindRuleList({
        bizDomain: BIZDOMIAN,
        sourceEntityId: DEVID,
        entityType: 2,
      }),
      linkageApi.bindRule({
        associativeEntityId: '#single_click',
        ruleId: RULEID,
        entitySubIds: '1',
        expr: [['$dp1', '==', '单击']],
        bizDomain: BIZDOMIAN,
      }),
      linkageApi.removeRule({
        bizDomain: BIZDOMIAN,
        sourceEntityId: DEVID,
        associativeEntityId: '1#scene_1',
        associativeEntityValue: RULEID,
      }),
      linkageApi.triggerRule({ ruleId: RULEID }),
      linkageApi.enableRule({ ruleId: RULEID }),
      linkageApi.disableRule({ ruleId: RULEID }),
    ]).then((result: any) => {
      console.log({ result });
    });
  }

  render() {
    return (
      <View>
        <Text>输出效果请参考console 或 开发者文档</Text>
      </View>
    );
  }
}
