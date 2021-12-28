import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { ColorSelectorAnimation } from '@tuya/tuya-panel-lamp-sdk';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, winWidth } = Utils.RatioUtils;

const ColorSelectorAnimationScene: React.FC<any> = () => {
  const [data, setData] = useState([
    {
      isColour: true,
      hue: 360,
      saturation: 800,
      value: 1000,
    },
    {
      isColour: false,
      brightness: 1000,
      temperature: 0,
    },
    {
      isColour: true,
      hue: 220,
      saturation: 1000,
      value: 1000,
    },
  ]);
  const [data1, setData1] = useState([
    {
      isColour: true,
      hue: 120,
      saturation: 650,
      value: 200,
    },
    {
      isColour: false,
      brightness: 1000,
      temperature: 1000,
    },
    {
      isColour: true,
      hue: 320,
      saturation: 1000,
      value: 1000,
    },
  ]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectIndex1, setSelectIndex1] = useState(0);

  return (
    <View>
      <>
        <Text style={styles.text}>ColorSelectorAnimation noWrap</Text>
        <ColorSelectorAnimation
          data={data}
          style={{ marginVertical: cx(30) }}
          selectIndex={selectIndex}
          onAdd={() => {
            const newData = _.cloneDeep(data);
            newData.push({ isColour: false, brightness: 1000, temperature: 1000 });
            setData(newData);
          }}
          onSelect={(index: number) => {
            setSelectIndex(index);
          }}
          onDel={() => {
            const newData = _.cloneDeep(data);
            newData.splice(selectIndex, 1);
            setData(newData);
            if (selectIndex === newData.length) {
              setSelectIndex(newData.length - 1);
            }
          }}
        />
      </>
      <>
        <Text style={styles.text1}>ColorSelectorAnimation Wrap</Text>
        <ColorSelectorAnimation
          data={data1}
          style={{ marginVertical: cx(30) }}
          noWrap
          selectIndex={selectIndex1}
          onAdd={() => {
            const newData = _.cloneDeep(data1);
            newData.push({ isColour: false, brightness: 1000, temperature: 1000 });
            setData1(newData);
          }}
          onSelect={(index: number) => {
            setSelectIndex1(index);
          }}
          onDel={() => {
            const newData = _.cloneDeep(data1);
            newData.splice(selectIndex1, 1);
            setData1(newData);
          }}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#DFDFDF',
    paddingVertical: cx(10),
    width: winWidth,
  },
  text1: {
    backgroundColor: '#DFDFDF',
    paddingVertical: cx(10),
    width: winWidth,
  },
});

export default ColorSelectorAnimationScene;
