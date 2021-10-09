import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { DevInfo, TopBar, TYText } from 'tuya-panel-kit';
import { DeviceListPanel, GatewayUtils } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { getAllSubDevList } = GatewayUtils;
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
    const list = await getAllSubDevList();
    setDeviceList(list);
  };
  const renderCustomItem = () => {
    return (
      <View style={{ width: 100, height: 100, backgroundColor: 'pink' }}>
        <TYText text="Custom item" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DeviceListPanel tabs={tabConfig} dataSource={deviceList} highestPosition={TopBar.height}>
        {renderCustomItem()}
      </DeviceListPanel>
    </View>
  );
};

export default DeviceListPanelScene;
