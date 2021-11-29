/*
 * @Author: your name
 * @Date: 2021-11-04 09:27:02
 * @LastEditTime: 2021-11-05 11:02:03
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: In User Settings Edit
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/MultiSlider/index.tsx
 */
import React, { useState } from 'react';
import { Slider as CommonSlider } from 'tuya-panel-kit';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { MultiSlider } from '@tuya/tuya-panel-szos-sdk/src/components';

const Slider = () => {
  const [value, setValue] = useState(0.2);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text>双向滑动-默认</Text>
            <MultiSlider values={[10, 80]} min={0} max={100} step={1} />
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 18 }}>双向滑动-marker</Text>
            <MultiSlider
              enabledTwo
              enableLabel
              values={[10, 80]}
              selectedStyle={{ backgroundColor: '#FF8E00' }}
              min={0}
              max={100}
              step={1}
            />
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 18 }}>双向滑动-marker带单位</Text>
            <MultiSlider
              enabledTwo
              enableLabel
              values={[10, 80]}
              selectedStyle={{ backgroundColor: 'green' }}
              min={0}
              max={100}
              step={1}
              unit="%"
            />
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 18 }}>双向滑动-step步长</Text>
            <MultiSlider
              enabledTwo
              enableLabel
              values={[0.1, 0.6]}
              selectedStyle={{ backgroundColor: 'green' }}
              min={0}
              max={1.9}
              step={0.1}
              unit="%"
              sliderLabelStyle={{ color: '#000000' }}
            />
            <Text style={{ paddingBottom: 18 }}>基础组件-step步长</Text>
            <CommonSlider maximumValue={1} minimumValue={0} stepValue={0.1} />
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 18 }}>单向滑动</Text>
            <MultiSlider
              allowOverlap
              enableLabel
              values={[value]}
              selectedStyle={{ backgroundColor: 'green' }}
              min={0}
              max={1}
              step={0.1}
              unit="%"
              onValuesChangeFinish={arr => setValue(arr[0])}
              sliderLabelStyle={{ color: '#000000' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginTop: 20,
    padding: 12,
  },
  container: {
    // backgroundColor: '#000001',
    padding: 10,
  },
});

export default Slider;
