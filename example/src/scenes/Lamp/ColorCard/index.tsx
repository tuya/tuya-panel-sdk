import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorCard } from '@tuya/tuya-panel-lamp-sdk';
import { TYText } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const ColorCards: React.FC = () => {
  const brightOption = {
    trackColor: '#383838',
    activeColor: '#fff',
    fontColor: '#000',
  };
  const colors = [
    {
      hue: 0,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 166,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 333,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 500,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 666,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 833,
      saturation: 400,
      value: 1000,
    },
    {
      hue: 0,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 166,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 333,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 500,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 666,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 833,
      saturation: 552,
      value: 1000,
    },
    {
      hue: 0,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 166,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 333,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 500,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 666,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 833,
      saturation: 702,
      value: 1000,
    },
    {
      hue: 0,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 166,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 333,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 500,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 666,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 833,
      saturation: 900,
      value: 1000,
    },
    {
      hue: 0,
      saturation: 1000,
      value: 1000,
    },
    {
      hue: 166,
      saturation: 1000,
      value: 1000,
    },
    {
      hue: 333,
      saturation: 1000,
      value: 1000,
    },
    {
      hue: 500,
      saturation: 1000,
      value: 1000,
    },
    {
      hue: 666,
      saturation: 1000,
      value: 1000,
    },
    {
      hue: 833,
      saturation: 1000,
      value: 1000,
    },
  ];
  const whiteColors = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0].map(item => {
    return {
      brightness: 1000,
      temperature: item,
      hue: 0,
      saturation: 0,
      value: 0,
    };
  });
  const [value, setValue] = useState(colors[0]);
  const [value2, setValue2] = useState(colors[0]);
  const [value3, setValue3] = useState(whiteColors[0]);
  return (
    <View style={styles.container}>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_defaultStyle')}</TYText>
      <ColorCard
        style={styles.picker}
        opacityAnimationValue={1}
        disabled={false}
        brightOption={brightOption}
        value={value}
        onGrant={setValue}
        onMove={setValue}
        onRelease={setValue}
      />
      <TYText style={styles.title}>{Strings.getLang('TYLamp_hideBright')}</TYText>
      <ColorCard
        innerStyle={{
          borderColor: 'pink',
        }}
        innerRadius={12}
        colors={colors}
        xNum={6}
        yNum={5}
        width={400}
        height={200}
        style={styles.picker}
        opacityAnimationValue={1}
        disabled={false}
        brightOption={brightOption}
        hideBright
        value={value2}
        onGrant={setValue2}
        onMove={setValue2}
        onRelease={setValue2}
      />
      <TYText style={styles.title}>{Strings.getLang('TYLamp_white')}</TYText>
      <ColorCard
        style={styles.picker}
        innerRadius={12}
        isColour={false}
        colors={whiteColors}
        xNum={11}
        yNum={1}
        width={400}
        height={200}
        opacityAnimationValue={1}
        disabled={false}
        brightOption={brightOption}
        value={value3}
        onGrant={setValue3}
        onMove={setValue3}
        onRelease={setValue3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  picker: {
    overflow: 'hidden',
  },
  title: {
    marginLeft: 24,
    marginVertical: 24,
    width: '100%',
  },
});

export default ColorCards;
