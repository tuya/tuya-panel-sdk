import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SceneAnimationList } from '@tuya/tuya-panel-lamp-sdk';
import { Utils } from 'tuya-panel-kit';
import Res from './Res';
import Strings from '../../../i18n';

const { convertX: cx } = Utils.RatioUtils;
const SceneAnimationListScene = () => {
  const data = [{ key: 0 }, { key: 1 }, { key: 2 }, { key: 3 }];
  const newData = [
    { key: 0, itemView: <View style={styles.itemView} /> },
    { key: 1, img: Res.imgTest0 },
    { key: 2, img: Res.imgTest1, text: Strings.getLang('TYLamp_test') },
    {
      key: '3',
      itemView: (
        <View style={{ width: '100%', height: '100%' }}>
          <Image source={Res.imgTest0} />
        </View>
      ),
    },
  ];
  return (
    <View style={styles.main}>
      <SceneAnimationList
        scenesList={data}
        borderWidth={cx(2)}
        borderColor="red"
        itemStartColor="#779d2a"
        itemAnimatedColor="#66d9ef"
        animatedTime={500}
      />
      <SceneAnimationList
        scenesList={newData}
        textColor="#fff"
        textSize={cx(20)}
        borderWidth={cx(2)}
        borderColor="red"
        activeKey={1}
        animatedTime={1000}
        animatingClick
      />
    </View>
  );
};
const styles = StyleSheet.create({
  itemView: {
    backgroundColor: 'pink',
    height: cx(20),
    width: cx(20),
  },

  main: {
    backgroundColor: 'rgba(0,0,0,.1)',
    flex: 1,
  },
});
export default SceneAnimationListScene;
