/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-12-15 11:20:01
 * @LastEditTime: 2021-12-15 11:27:28
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: DpCacheText demo
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/DpCacheText/index.tsx
 */
import React from 'react';
import { WhiteSpace, DpCacheText } from '@tuya/tuya-panel-szos-sdk/src/components';
import { View } from 'react-native';

const Demo = () => {
  return (
    <View>
      <DpCacheText title="豆芽" />
      <WhiteSpace height={30} />
      <DpCacheText title="豆芽" textColor="green" showIcon />
    </View>
  );
};

export default Demo;
