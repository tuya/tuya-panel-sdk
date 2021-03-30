import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcCrossDevice } from '@tuya/tuya-panel-ipc-sdk';

const SelfBtn = (newProps: { onPress?: () => void; btnTxt?: string }) => {
  const { onPress, btnTxt } = newProps;
  return (
    <TouchableOpacity onPress={onPress} style={styles.selfBtnBox}>
      <TYText style={styles.selfBtnTxt}>{btnTxt}</TYText>
    </TouchableOpacity>
  );
};

const IpcCrossDevice: React.FC = () => {
  const [homeDevInfo, setHomeDevInfo] = useState('');
  const devList = ['63443247324', '62327394723'];

  useEffect(() => {
    registerDevice();
    return () => {
      unRegisterDevice();
    };
  }, []);

  const getCurrentHomeDevlist = () => {
    TYIpcCrossDevice.getCurrentHomeDevList().then(result => {
      setHomeDevInfo(JSON.stringify(result));
    });
  };

  const clearHomeDevList = () => {
    setHomeDevInfo('');
  };

  const registerDevice = () => {
    TYIpcCrossDevice.initAddListenCrossDeviceList(devList);
  };

  const unRegisterDevice = () => {
    TYIpcCrossDevice.removeListenCrossDeviceList(devList);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.IpcCrossDevice}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text="描述: 获取当前家庭下设备列表(SDK版本需在3.24.5及以上)" />
      <SelfBtn btnTxt="获取当前家庭下设信息" onPress={getCurrentHomeDevlist} />
      <SelfBtn btnTxt="清空" onPress={clearHomeDevList} />
      <View style={styles.infoBox}>
        <TYText style={styles.infoTxt}>{homeDevInfo}</TYText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IpcCrossDevice: {
    justifyContent: 'center',
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  infoBox: {
    backgroundColor: '#83b329',
    minHeight: 300,
  },
  infoTxt: {
    color: '#ffffff',
  },
  selfBtnBox: {
    backgroundColor: '#ea5849',
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    minHeight: 35,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  selfBtnTxt: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default IpcCrossDevice;
