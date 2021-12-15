import React, { useState } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { ColorSelectorAnimation } from '@tuya/tuya-panel-lamp-sdk';

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
  const [selectIndex, setSelectIndex] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>ColorSelectorAnimation</Text>
      <ColorSelectorAnimation
        style={{ marginTop: 20 }}
        data={data}
        selectIndex={selectIndex}
        onAdd={() => {
          const newData = _.cloneDeep(data);
          newData.push({ isColour: false, brightness: 1000, temperature: 1000 });
          setData(newData);
        }}
        onSelect={(index: number) => {
          setSelectIndex(index);
        }}
        onDel={(index: number) => {
          const newData = _.cloneDeep(data);
          newData.splice(selectIndex, 1);
          setData(newData);
        }}
      />
    </View>
  );
};

export default ColorSelectorAnimationScene;
