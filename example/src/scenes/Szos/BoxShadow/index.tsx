/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 09:44:54
 * @LastEditTime: 2021-12-15 11:28:06
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 阴影组件demo
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/BoxShadow/index.tsx
 */

import React from 'react';
import { BoxShadow, WhiteSpace } from '@tuya/tuya-panel-szos-sdk/src/components';
import { View, ScrollView, SafeAreaView } from 'react-native';

const shadowOpt = {
  width: 300,
  height: 40,
  opacity: 0.16,
  border: 12,
  radius: 20,
  color: '#0189fb',
};

const Box = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <BoxShadow setting={shadowOpt}>
            <View style={{ width: 100, height: 100, borderRadius: 20 }} />
          </BoxShadow>
          <WhiteSpace height={100} />
          <BoxShadow setting={{ ...shadowOpt, color: 'green' }}>
            <View style={{ width: 100, height: 100, borderRadius: 20 }} />
          </BoxShadow>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Box;
