import React, { useState } from 'react';
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
  const [value, setValue] = useState({});
  const [value2, setValue2] = useState({});
  const handleColorComplete = (d: any) => {
    setValue(d);
  };
  const handleColorMove = (d: any) => {
    setValue(d);
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
  return (
    <View style={styles.container}>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_defaultStyle')}</TYText>
      <ColorCard
        style={styles.picker}
        opacityAnimationValue={1}
        disabled={false}
        brightOption={brightOption}
        value={value}
        onGrant={handleColorComplete}
        onMove={handleColorMove}
        onRelease={handleColorComplete}
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
        onGrant={(v: any) => {
          setValue2(v);
        }}
        onMove={(v: any) => {
          setValue2(v);
        }}
        onRelease={(v: any) => {
          setValue2(v);
        }}
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
