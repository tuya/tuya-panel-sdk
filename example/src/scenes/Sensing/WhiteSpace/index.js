import React from 'react';
import { View, Text } from 'react-native';
import { WhiteSpace } from '@tuya/tuya-panel-sensing-sdk';

const WhiteSpaceComp = () => {
  return (
    <View>
      <View>
        <Text>间距xs</Text>
        <WhiteSpace size="xs" />
        <Text>间距sm</Text>
        <WhiteSpace size="sm" />
        <Text>间距mg</Text>
        <WhiteSpace size="md" />
        <Text>间距lg</Text>
        <WhiteSpace size="lg" />
        <Text>间距xl</Text>
        <WhiteSpace size="xl" />
        <Text size={30}>自定义间距</Text>
      </View>
    </View>
  );
};

export default WhiteSpaceComp;
