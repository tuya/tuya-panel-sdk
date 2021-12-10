import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { DevInfo, TopBar, TYText } from 'tuya-panel-kit';
import { DeviceListPanel, GatewayUtils } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { getAllSubDevList } = GatewayUtils;

const BLEKEY = '0';
const ZIGBEEKEY = '1';

const bleDevice = {
  name: '亮度传感器',
  isOnline: true,
  pcc: '4320',
  devId: '6ca9672bd3717cwany',
  productId: 'kjnnti',
};

const bleDevList = new Array(67)
  .fill(0)
  .map((d, i) => ({ ...bleDevice, name: `亮度传感器${i + 1}`, devId: i }));

const zigbeeDevList = new Array(69)
  .fill(0)
  .map((d, i) => ({ ...bleDevice, name: `人体感应器${i + 1}`, devId: i }));

const DeviceListPanelScene: FC = () => {
  const tabConfig = [
    {
      key: BLEKEY,
      title: Strings.getLang('bleDevices'),
      activeTextStyle: { color: '#00B996' },
      textStyle: { color: '#000' },
    },
    {
      key: ZIGBEEKEY,
      title: Strings.getLang('zigDevices'),
      activeTextStyle: { color: '#00B996' },
      textStyle: { color: '#000' },
    },
  ];
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    getDeviceList(BLEKEY);
  }, []);

  // 模拟数据
  const getDeviceList = async (type: string) => {
    if (type === BLEKEY) {
      setDeviceList(bleDevList);
    } else if (type === ZIGBEEKEY) {
      setDeviceList(zigbeeDevList);
    }
  };
  const renderCustomItem = () => {
    return (
      <View style={{ width: 100, height: 100, backgroundColor: 'pink' }}>
        <TYText text="Custom item" />
      </View>
    );
  };

  const handleTabChange = (key: string) => {
    // console.log(key);

    getDeviceList(key);
  };
  return (
    <View style={{ flex: 1 }}>
      <DeviceListPanel
        swipeable
        containerStyle={{ backgroundColor: 'lightblue' }}
        tabs={tabConfig}
        dataSource={deviceList}
        onTabChange={handleTabChange}
        highestPosition={TopBar.height}
      >
        {renderCustomItem()}
      </DeviceListPanel>
    </View>
  );
};

export default DeviceListPanelScene;
