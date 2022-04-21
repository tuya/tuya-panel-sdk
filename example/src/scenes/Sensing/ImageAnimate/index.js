import React from 'react';
import { View, Text } from 'react-native';
import { ImageAnimate } from '@tuya/tuya-panel-sensing-sdk';

const ImageAnimateCom = () => {
  return (
    <View>
      <ImageAnimate>
        <Text style={{ color: 'green' }}>{10}%</Text>
      </ImageAnimate>
    </View>
  );
};

export default ImageAnimateCom;
