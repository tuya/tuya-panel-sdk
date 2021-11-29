/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 10:06:26
 * @LastEditTime: 2021-11-16 10:09:35
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 水平留白
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/white-space/index.tsx
 */

import React, { FC } from 'react';
import { View, ColorValue } from 'react-native';

export interface WhiteSpaceProps {
  height?: string | number;
  backgroundColor?: ColorValue;
}

const WhiteSpace: FC<WhiteSpaceProps> = props => {
  // eslint-disable-next-line react/prop-types
  const { height = 4, backgroundColor = 'transparent' } = props;
  return <View style={{ height, backgroundColor }} />;
};

export default WhiteSpace;
