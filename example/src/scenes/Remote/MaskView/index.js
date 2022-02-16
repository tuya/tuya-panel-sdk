import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Utils, TYText, BrickButton } from 'tuya-panel-kit';
import { MaskView, PressKey } from '@tuya/tuya-panel-remote-sdk';

import { SectionTitle } from './styled';

import Strings from './i18n';

const imgSend = require('./res/img_send.png');

const { convertX: cx } = Utils.RatioUtils;

const Index = () => {
  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState('left');

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: cx(20) }}>
        <SectionTitle>{Strings.getLang('position')}</SectionTitle>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <PressKey
            text={Strings.getLang('top')}
            status
            onPress={() => {
              setVisible(true);
              setPosition('top');
            }}
          />
          <PressKey
            text={Strings.getLang('bottom')}
            status
            onPress={() => {
              setVisible(true);
              setPosition('bottom');
            }}
          />
          <PressKey
            text={Strings.getLang('left')}
            status
            onPress={() => {
              setVisible(true);
              setPosition('left');
            }}
          />
          <PressKey
            text={Strings.getLang('right')}
            status
            onPress={() => {
              setVisible(true);
              setPosition('right');
            }}
          />
        </View>
      </View>
      <MaskView
        visible={visible}
        maskBgColor="#000"
        maskOpacity={0.5}
        onClose={() => setVisible(false)}
        direction={position}
        offsetY={cx(200)}
        offsetX={cx(50)}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFF',
            borderRadius: cx(16),
            justifyContent: 'space-around',
            padding: cx(20),
          }}
        >
          <Image source={imgSend} />
          <TYText
            style={{
              backgroundColor: 'transparent',
              fontSize: cx(14),
              color: '#495054',
              textAlign: 'center',
            }}
            text="text..."
          />
          <BrickButton
            text={Strings.getLang('iSee')}
            onPress={() => setVisible(false)}
            wrapperStyle={{ width: cx(200) }}
          />
        </View>
      </MaskView>
    </ScrollView>
  );
};

export default Index;
