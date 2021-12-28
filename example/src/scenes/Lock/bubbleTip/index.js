import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { BubbleTip } from '@tuya/tuya-panel-lock-sdk';

const { convertX: cx } = Utils.RatioUtils;

const BubbleExample = () => {
  const [datalist, setDatalist] = useState([
    {
      title: '今天天气真不错呀',
      key: 1,
      backgroundColor: '#5a7fff',
    },
    {
      title: '冲冲冲',
      key: 2,
      backgroundColor: '#5a7fff',
    },
  ]);
  const [configList, setConfigList] = useState([
    {
      text: '理性，悦纳，进取',
      key: 1,
      type: 'safe',
      wrapStyle: {
        backgroundColor: 'skyblue',
      },
      textStyle: {
        color: 'red',
      },
    },
    {
      text: '多读书多运动',
      key: 2,
    },
  ]);
  const changeData = () => {
    setConfigList([
      ...configList,
      {
        text: `滴滴滴${configList.length}`,
        key: configList.length + 1,
      },
    ]);
    setDatalist([
      ...datalist,
      {
        title: `滴滴滴${datalist.length}`,
        key: datalist.length + 1,
        backgroundColor: '#5a7fff',
      },
    ]);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={changeData}>
        <Text>改变数组</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={Style.wrap}>
          <BubbleTip>
            {datalist.map(({ title, key }) => {
              return (
                <View key={key} style={Style.itemWrap}>
                  <Text style={{ color: 'red' }}>{title}</Text>
                </View>
              );
            })}
          </BubbleTip>
          <BubbleTip.Base configList={configList} waitingTime={1000} />
          {/* <BubbleTip.Line configList={configList} waitingTime={1000} /> */}
        </View>
      </ScrollView>
      <Animated.FlatList />
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  itemWrap: {
    alignItems: 'center',
    borderRadius: cx(10),
    height: cx(30),
    justifyContent: 'center',
    width: cx(150),
  },
  wrap: {
    height: cx(500),
    justifyContent: 'space-around',
    padding: cx(20),
  },
});

export default BubbleExample;
