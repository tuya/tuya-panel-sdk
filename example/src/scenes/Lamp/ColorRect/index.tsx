import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorRect } from '@tuya/tuya-panel-lamp-sdk';
import { TYText } from 'tuya-panel-kit';

const lang = {
  en: {
    average: 'Equally Calculate',
    percent: 'Calculate by percentage',
    customizeStyle: 'Customize',
  },
  zh: {
    average: '平均分配',
    percent: '按百分比分配',
    customizeStyle: '自定义样式',
  },
};
const getLang = (key: string) => {
  return lang.en[key];
};

const ColorRects: React.FC = () => (
  <View style={styles.container}>
    <TYText style={styles.title}>{getLang('percent')}</TYText>
    <View style={{ alignItems: 'center' }}>
      <ColorRect
        style={{ width: 80, height: 100 }}
        colors={[
          { color: 'green', percent: 0.14 },
          { color: 'yellow', percent: 0.26 },
          { color: 'red', percent: 0.6 },
        ]}
        onPress={() => {
          console.log('press');
        }}
      />
    </View>
    <TYText style={styles.title}>{getLang('average')}</TYText>
    <View style={{ alignItems: 'center' }}>
      <ColorRect
        style={{ width: 80, height: 100 }}
        colors={['#E292FE', '#FFF76B']}
        onPress={() => {
          console.log('press');
        }}
      />
    </View>
    <TYText style={styles.title}>{getLang('customizeStyle')}</TYText>
    <View style={{ alignItems: 'center' }}>
      <ColorRect
        style={{
          borderRadius: 8,
          width: 120,
          height: 120,
          overflow: 'hidden',
          borderColor: 'rgba(100,100,105,0.4)',
          borderWidth: 5,
        }}
        colors={['grey', 'brown', 'black']}
        activeOpacity={0.4}
        onPress={() => {
          console.log('press');
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 15,
  },
});

export default ColorRects;
