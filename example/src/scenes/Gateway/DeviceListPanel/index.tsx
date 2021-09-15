import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { DevInfo, TopBar } from 'tuya-panel-kit';
import { DeviceListPanel, GatewayUtils } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { getAllDevice } = GatewayUtils;
const DeviceListPanelScene: FC = () => {
  const tabConfig = [
    {
      key: '0',
      title: Strings.getLang('bleDevices'),
      activeTextStyle: { color: '#00B996' },
      textStyle: { color: '#000' },
    },
    {
      key: '1',
      title: Strings.getLang('zigDevices'),
      activeTextStyle: { color: '#00B996' },
      textStyle: { color: '#000' },
    },
  ];
  const [deviceList, setDeviceList] = useState<Array<DevInfo>>([]);

  useEffect(() => {
    getDeviceList();
  }, []);

  const getDeviceList = async () => {
    const list = await getAllDevice();
    setDeviceList(list);
  };

  return (
    <View style={{ flex: 1 }}>
      <DeviceListPanel
        tabs={tabConfig}
        dataSource={deviceList}
        highestPosition={TopBar.height}
        // customRenderList={() => <Text>zzq</Text>}
      />
    </View>
  );
};

export default DeviceListPanelScene;
