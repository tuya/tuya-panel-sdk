import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import { TYIpcLayoutAuto } from '@tuya/tuya-panel-ipc-sdk';
import Res from './res';

const { convertX: cx } = Utils.RatioUtils;

const Example: React.FC = () => {
  return (
    <View style={styles.exampleBox}>
      <Image source={Res.noListBgc} style={styles.noListBgc} />
      <TYText
        style={styles.listTip}
        // text="According to device, time and other conditions, automatic execution"
        text="根据设备、时间等条件，自动执行"
      />
      <TouchableOpacity onPress={() => {}} activeOpacity={0.9} style={styles.smartEntryBox}>
        {/* <TYText numberOfLines={1} style={styles.smartEntryTxt} text="Manage Smart" /> */}
        <TYText numberOfLines={1} style={styles.smartEntryTxt} text="管理智能" />
      </TouchableOpacity>
    </View>
  );
};

const IpcLayoutAuto: React.FC = () => {
  const containerLargeHeight = 300;
  const containerSmallHeight = 150;
  return (
    <ScrollView
      contentContainerStyle={styles.TYIpcLayoutAuto}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText
        style={styles.descTxt}
        // text="Description: The content height is less than or equal to the container height"
        text="描述: 内容高度小于等于容器高度"
      />
      <View
        style={{
          height: containerLargeHeight,
        }}
      >
        <TYIpcLayoutAuto containerHeight={containerLargeHeight}>
          <Example />
        </TYIpcLayoutAuto>
      </View>

      <TYText
        style={styles.descTxt}
        // text="Description: The content height is greater than the container height"
        text="描述: 内容高度大于容器高度"
      />

      <View
        style={{
          height: containerSmallHeight,
        }}
      >
        <TYIpcLayoutAuto containerHeight={containerSmallHeight}>
          <Example />
        </TYIpcLayoutAuto>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcLayoutAuto: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  exampleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTip: {
    color: '#c0c0c0',
    fontSize: cx(16),
    marginVertical: cx(15),
    textAlign: 'center',
  },
  noListBgc: {
    resizeMode: 'contain',
    width: cx(122),
  },
  smartEntryBox: {
    alignItems: 'center',
    backgroundColor: '#fc2f07',
    borderRadius: 44,
    height: 44,
    justifyContent: 'center',
    minWidth: 100,
    paddingHorizontal: cx(30),
  },
  smartEntryTxt: {
    color: '#fff',
    fontSize: cx(16),
  },
});

export default IpcLayoutAuto;
