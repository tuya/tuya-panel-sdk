import React from 'react';
import { View } from 'react-native';
import { SportNoTarget, SportTargetContent } from '@tuya/tuya-panel-outdoor-sdk';
import icons from './res/icons';
import images from './res/index';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const Component = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <View style={{ height: cx(400) }}>
        <SportNoTarget
          style={{ backgroundColor: '#0376FF' }}
          bgImage={images.sport_border_circle1}
          centerImage={images.sport_target_content}
          spotImage={images.step_spot1}
          centerView={
            <SportTargetContent
              step={100}
              targetIcon={icons.target}
              targetIconColor="blue"
              stepColor="blue"
              stepValue="米"
              stepOpacity={0.5}
            />
          }
        />
      </View>
    </View>
  );
};
export default Component;
