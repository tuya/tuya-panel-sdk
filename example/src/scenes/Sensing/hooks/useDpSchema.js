import { useDpSchema, WhiteSpace } from '@tuya/tuya-panel-sensing-sdk';
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';

export default () => {
  console.log('原始schema', TYSdk.devInfo.schema);
  console.log('转化后scheme', useDpSchema(TYSdk.devInfo.schema, 'scheme'));
  return (
    <ScrollView>
      <Text>
        面板 dp 点展示会根据 schema 的 scale(缩放倍数),step（步长），去动态展示，对应的 max,min
        需要动态调整
      </Text>
      <WhiteSpace size="lg" />
      <Text>{JSON.stringify(useDpSchema(TYSdk.devInfo.schema, 'scheme'))}</Text>
      <Text>打开控制台查看</Text>
    </ScrollView>
  );
};
