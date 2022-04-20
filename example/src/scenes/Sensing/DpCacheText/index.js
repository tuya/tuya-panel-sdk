import React from 'react';
import { View } from 'react-native';
import { DpCacheText, WhiteSpace } from '@tuya/tuya-panel-sensing-sdk';

const DpCacheTextCom = () => {
  return (
    <View>
      <DpCacheText title="缓存" showIcon />
      <WhiteSpace size="sm" />
      <DpCacheText title="正常信息" showIcon={false} />
    </View>
  );
};

export default DpCacheTextCom;
