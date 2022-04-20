import React from 'react';
import { View, Text } from 'react-native';
import { Theme, TYSdk } from 'tuya-panel-kit';
import { WhiteSpace, TemperatureScaleSwitching } from '@tuya/tuya-panel-sensing-sdk';

const Demo = () => {
  // eslint-disable-next-line camelcase
  const { temp_unit_convert = 'c' } = TYSdk.devInfo.state;

  const schema = TYSdk.devInfo.schema.temp_unit_convert;

  const putDpData = info => {
    TYSdk.device.putDeviceData(info);
  };

  return (
    <Theme theme={{}}>
      <View style={{ flex: 1 }}>
        <Text>温标设置</Text>
        <WhiteSpace size="sm" />
        <TemperatureScaleSwitching
          style={{
            container: {
              width: 300,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          }}
          type="list"
          // eslint-disable-next-line camelcase
          title={temp_unit_convert === undefined ? '温标' : '温标切换'}
          dpCode="temp_unit_convert"
          // eslint-disable-next-line camelcase
          value={temp_unit_convert}
          showIcon={false}
          schema={schema}
          putDp={putDpData}
          tempUnit="c"
        />
      </View>
    </Theme>
  );
};

export default Demo;
