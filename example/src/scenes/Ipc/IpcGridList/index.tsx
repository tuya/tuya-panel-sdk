import { TYIpcGridList } from '@tuya/tuya-panel-ipc-sdk';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Res from './res';

interface itemInterface {
  item: any;
  index: number;
  buttonWidth: number;
}

const IpcGridList: React.FunctionComponent = () => {
  const [button1] = useState([
    { icon: Res.feedList, name: 'List' },
    { icon: Res.feedTime, name: 'Time' },
    { icon: Res.feedList, name: 'List' },
    { icon: Res.feedTime, name: 'Time' },
    { icon: Res.feedList, name: 'List' },
  ]);
  const renderButton1 = () => {
    const renderItem = (itemObj: itemInterface) => {
      const { item } = itemObj;
      return (
        <View style={styles.button1}>
          <View style={styles.wrap}>
            <Image source={item.icon} style={styles.image1} />
            <Text style={styles.text1}>{item.name}</Text>
          </View>
          <Image source={Res.feedArrow} style={styles.arrow} />
        </View>
      );
    };

    return (
      <TYIpcGridList containerVerticalWidth={10} data={button1} renderItem={renderItem} isCover />
    );
  };

  const handlePress = (item: { name: string }) => {
    console.log('click', item.name);
  };

  const renderButton2 = () => {
    const renderItem = (itemObj: itemInterface) => {
      const { item } = itemObj;
      return (
        <View style={styles.button2}>
          <Text style={styles.text1}>{item.name}</Text>
          <Image source={Res.feedArrow} style={styles.arrow} />
        </View>
      );
    };
    const data = [
      { name: 'Button1' },
      { name: 'Button2' },
      { name: 'Button3' },
      { name: 'Button4', prop: { disabled: true } },
      { name: 'Button5' },
    ];

    return (
      <TYIpcGridList
        keyExtractor={(item: { name: string }) => item.name}
        onPress={handlePress}
        containerVerticalWidth={10}
        data={data}
        renderItem={renderItem}
        rowNumber={2}
      />
    );
  };

  const list = [
    {
      name: 'example 01',
      view: renderButton1,
    },
    {
      name: 'example 02',
      view: renderButton2,
    },
  ];

  return (
    <View style={styles.container}>
      {list.map((item: { name: string; view: any }) => {
        return (
          <View key={item.name} style={styles.buttonWrap}>
            <View style={styles.title}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            {item.view()}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: { resizeMode: 'contain', width: 30 },
  button1: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonWrap: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  image1: { resizeMode: 'contain', tintColor: '#333', width: 20 },
  name: {
    fontSize: 18,
  },
  text1: {
    color: '#333',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  wrap: {
    flexDirection: 'row',
  },
});

export default IpcGridList;
