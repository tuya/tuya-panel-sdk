/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 10:11:31
 * @LastEditTime: 2021-11-16 10:15:58
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 水平留白
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/WhiteSpace/index.tsx
 */
import React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { WhiteSpace } from '@tuya/tuya-panel-szos-sdk/src/components';

const Demo = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <Text>默认高度</Text>
        <View style={{ height: 50, backgroundColor: 'red' }} />
        <WhiteSpace />
        <View style={{ height: 50, backgroundColor: 'gold' }} />
        <Text>自定义高度</Text>
        <WhiteSpace height={20} />
        <View style={{ height: 50, backgroundColor: 'green' }} />
        <Text>自定义背景色</Text>
        <WhiteSpace height={20} backgroundColor="black" />
        <View style={{ height: 50, backgroundColor: 'green' }} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default Demo;
