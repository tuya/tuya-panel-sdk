import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcGrid } from '@tuya/tuya-panel-ipc-sdk';
import Res from './res';

const IpcGrid: React.FC = () => {
  const gridData = [
    {
      key: 'menu1',
      imgSource: Res.dpAntiFlicker,
      imgTitle: 'menu1',
      disabled: true,
      hidden: false,
      active: false,
    },
    {
      key: 'menu2',
      imgSource: Res.dpCruise,
      imgTitle: 'menu2',
      disabled: false,
      hidden: false,
      active: false,
    },
    {
      key: 'menu3',
      imgSource: Res.dpDecibel,
      imgTitle: 'menu3',
      disabled: false,
      hidden: false,
      active: true,
    },
    {
      key: 'menu4',
      imgSource: Res.dpFeedNum,
      imgTitle: 'menu4',
      disabled: false,
      hidden: false,
      active: false,
    },
    {
      key: 'menu5',
      imgSource: Res.dpFlame,
      imgTitle: 'menu5',
      disabled: false,
      hidden: false,
      active: false,
    },
    {
      key: 'menu6',
      imgSource: Res.dpFlip,
      imgTitle: 'menu6',
      disabled: false,
      hidden: false,
      active: false,
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={styles.TYIpcGrid}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text="Desc: Menu grid layout -- 3" />
      <TYIpcGrid data={gridData} rowNumber={3} />
      <TYText style={styles.descTxt} text="Desc: Menu grid layout -- 4" />
      <TYIpcGrid data={gridData} />
      <TYText style={styles.descTxt} text="Desc: Menu grid layout -- 5" />
      <TYIpcGrid data={gridData} rowNumber={5} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcGrid: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcGrid;
